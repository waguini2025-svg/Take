import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">TAKE Y PAY Dashboard</h1>
      <p>Controle de estabelecimentos, produtos, pedidos e pagamentos em tempo real.</p>
      <div className="grid gap-3">
        <Link className="text-blue-600" href="/login">Login</Link>
        <Link className="text-blue-600" href="/dashboard">Dashboard Geral</Link>
        <Link className="text-blue-600" href="/products">Produtos</Link>
        <Link className="text-blue-600" href="/qrcodes">QR Codes</Link>
        <Link className="text-blue-600" href="/sales">Vendas</Link>
        <Link className="text-blue-600" href="/transactions">Transações</Link>
        <Link className="text-blue-600" href="/settings">Configurações financeiras</Link>
      </div>
    </main>
  );
}
