# TAKE Y PAY Mobile

Aplicativo Expo/React Native para consumo da API do TAKE Y PAY.

## Requisitos
- Node 18+
- Expo CLI

## Configuração
1. Instale dependências: `npm install`
2. Defina a API em `.env`:
```
EXPO_PUBLIC_API_URL=http://localhost:4000
```
3. Rode: `npm start`

## Funcionalidades
- Lista estabelecimentos próximos
- Tela de estabelecimento com produtos e QR Code
- Scanner de QR Code que resolve produto na API
- Navegação stack com React Navigation
