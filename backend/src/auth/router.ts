import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../modules/prisma';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const { email, password, name, role, establishmentId } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, role, establishmentId }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Could not register user', error });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ sub: user.id, role: user.role, establishmentId: user.establishmentId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d'
  });
  res.json({ token, user });
});
