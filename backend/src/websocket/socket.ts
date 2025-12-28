import { Server, Socket } from 'socket.io';

export type SocketContext = {
  io: Server;
};

export const createContext = (io: Server): SocketContext => ({ io });

export const socketHandler = (socket: Socket, ctx: SocketContext) => {
  socket.on('joinEstablishment', (establishmentId: string) => {
    socket.join(`establishment:${establishmentId}`);
  });
};

export const emitOrderUpdate = (payload: any) => {
  globalThis.ioContext?.io.emit('orderUpdated', payload);
};

(globalThis as any).ioContext = null as SocketContext | null;
export function registerContext(ctx: SocketContext) {
  (globalThis as any).ioContext = ctx;
}
