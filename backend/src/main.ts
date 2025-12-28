import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'express';
import { Server } from 'socket.io';
import { authRouter } from './auth/router';
import { establishmentsRouter } from './establishments/router';
import { productsRouter } from './products/router';
import { ordersRouter } from './orders/router';
import { paymentsRouter } from './payments/router';
import { qrcodeRouter } from './qrcode/router';
import { createContext, socketHandler, registerContext } from './websocket/socket';

const app = express();
app.use(cors({ origin: [process.env.CLIENT_URL || '*', process.env.DASHBOARD_URL || '*'] }));
app.use(json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/auth', authRouter);
app.use('/establishments', establishmentsRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);
app.use('/qrcode', qrcodeRouter);

const port = Number(process.env.PORT || 4000);
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: '*' } });
const socketCtx = createContext(io);
registerContext(socketCtx);
io.on('connection', (socket) => socketHandler(socket, socketCtx));

server.listen(port, () => {
  console.log(`Take Y Pay API running on port ${port}`);
});
