import { Router } from 'express';
import { prisma } from '../modules/prisma';
import { ensureAuth, requireRole, AuthRequest } from '../auth/middleware';

export const establishmentsRouter = Router();

establishmentsRouter.use(ensureAuth);

establishmentsRouter.get('/', async (_req, res) => {
  const establishments = await prisma.establishment.findMany({ include: { products: true } });
  res.json(establishments);
});

establishmentsRouter.post('/', requireRole('SUPER_ADMIN'), async (req: AuthRequest, res) => {
  const data = req.body;
  const created = await prisma.establishment.create({ data });
  res.json(created);
});

establishmentsRouter.put('/:id', requireRole('SUPER_ADMIN'), async (req, res) => {
  const { id } = req.params;
  const updated = await prisma.establishment.update({ where: { id }, data: req.body });
  res.json(updated);
});

establishmentsRouter.delete('/:id', requireRole('SUPER_ADMIN'), async (req, res) => {
  const { id } = req.params;
  await prisma.establishment.delete({ where: { id } });
  res.status(204).send();
});
