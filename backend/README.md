# TAKE Y PAY Backend

API Express + Prisma + PostgreSQL para o ecossistema TAKE Y PAY.

## Requisitos
- Node 18+
- PostgreSQL
- npm ou pnpm

## Configuração
1. Copie `.env.example` para `.env` e ajuste `DATABASE_URL`, `JWT_SECRET`, `PORT`.
2. Instale dependências: `npm install`
3. Execute migrações e gere client: `npx prisma migrate dev && npx prisma generate`
4. Rode em desenvolvimento: `npm run dev`

## Rotas principais
- `POST /auth/register`, `POST /auth/login`
- CRUD `/establishments`
- CRUD `/products` e `POST /products/:id/qrcode`
- `POST /orders`, `PUT /orders/:id/status`
- `POST /payments/:orderId`
- `GET /qrcode/:productId` e `/qrcode/:productId/resolve`

## WebSocket
- Socket.IO exposto no mesmo host/porta
- Evento `orderUpdated` emitido para atualizações de pedido
