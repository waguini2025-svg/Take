# TAKE Y PAY Dashboard

Painel Next.js para administração do sistema TAKE Y PAY.

## Requisitos
- Node 18+
- pnpm, npm ou yarn

## Configuração
1. Copie `.env.example` para `.env.local` e ajuste:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```
2. Instale dependências: `npm install`
3. Rode o servidor de desenvolvimento: `npm run dev`

## Estrutura
- `src/pages` – rotas básicas (login, dashboards)
- `src/components` – componentes reutilizáveis
- `src/services/api.ts` – cliente Axios para API
- `src/context/socket.tsx` – contexto Socket.IO

## Integração
- Conecta à API do backend via `NEXT_PUBLIC_API_URL`
- Recebe eventos em tempo real via Socket.IO
