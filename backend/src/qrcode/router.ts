import { Router } from 'express';
import { prisma } from '../modules/prisma';

export const qrcodeRouter = Router();

qrcodeRouter.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const qr = await prisma.qrCode.findUnique({ where: { productId } });
  if (!qr) return res.status(404).json({ message: 'QR not found' });
  res.json(qr);
});

qrcodeRouter.get('/:productId/resolve', async (req, res) => {
  const { productId } = req.params;
  const product = await prisma.product.findUnique({ where: { id: productId }, include: { establishment: true } });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});
