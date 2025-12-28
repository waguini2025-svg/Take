import { Router } from 'express';
import { prisma } from '../modules/prisma';
import { ensureAuth, AuthRequest } from '../auth/middleware';
import { emitOrderUpdate } from '../websocket/socket';

export const ordersRouter = Router();
ordersRouter.use(ensureAuth);

ordersRouter.get('/', async (req: AuthRequest, res) => {
  const establishmentId = req.query.establishmentId as string | undefined;
  const orders = await prisma.order.findMany({
    where: establishmentId ? { establishmentId } : undefined,
    include: { items: true, payment: true }
  });
  res.json(orders);
});

ordersRouter.post('/', async (req: AuthRequest, res) => {
  const { items, establishmentId } = req.body as { items: { productId: string; quantity: number }[]; establishmentId: string };
  const products = await prisma.product.findMany({ where: { id: { in: items.map((i) => i.productId) } } });
  const total = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const order = await prisma.order.create({
    data: {
      establishmentId,
      userId: req.user?.id,
      total,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: products.find((p) => p.id === item.productId)?.price || 0
        }))
      }
    },
    include: { items: true }
  });

  emitOrderUpdate(order);
  res.json(order);
});

ordersRouter.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await prisma.order.update({ where: { id }, data: { status } });
  emitOrderUpdate(updated);
  res.json(updated);
});
