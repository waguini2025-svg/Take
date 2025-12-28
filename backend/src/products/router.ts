import { Router } from 'express';
import { prisma } from '../modules/prisma';
import { ensureAuth, AuthRequest } from '../auth/middleware';
import QRCode from 'qrcode';

export const productsRouter = Router();
productsRouter.use(ensureAuth);

productsRouter.get('/', async (req: AuthRequest, res) => {
  const establishmentId = req.query.establishmentId as string | undefined;
  const products = await prisma.product.findMany({
    where: establishmentId ? { establishmentId } : undefined,
    include: { qrCode: true }
  });
  res.json(products);
});

productsRouter.post('/', async (req: AuthRequest, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.json(product);
});

productsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.update({ where: { id }, data: req.body });
  res.json(product);
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({ where: { id } });
  res.status(204).send();
});

productsRouter.post('/:id/qrcode', async (req, res) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const payload = `product:${product.id}`;
  const value = await QRCode.toDataURL(payload);
  const qr = await prisma.qrCode.upsert({
    where: { productId: product.id },
    update: { value },
    create: { productId: product.id, value }
  });
  res.json(qr);
});
