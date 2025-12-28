import { Router } from 'express';
import { prisma } from '../modules/prisma';
import { ensureAuth } from '../auth/middleware';
import { emitOrderUpdate } from '../websocket/socket';

export const paymentsRouter = Router();
paymentsRouter.use(ensureAuth);

paymentsRouter.post('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { method } = req.body as { method: 'PIX' | 'CARD' };
  const payment = await prisma.payment.upsert({
    where: { orderId },
    update: { method, status: 'APPROVED', transactionRef: `TX-${Date.now()}` },
    create: { orderId, method, status: 'APPROVED', transactionRef: `TX-${Date.now()}` }
  });
  await prisma.order.update({ where: { id: orderId }, data: { status: 'PAID' } });
  emitOrderUpdate({ id: orderId, status: 'PAID' } as any);
  res.json(payment);
});
