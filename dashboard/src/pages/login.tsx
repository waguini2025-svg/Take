import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const submit = async () => {
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', { email, password });
    setToken(res.data.token);
  };

  return (
    <main className="p-8 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Login</h1>
      <input className="border p-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-black text-white px-4 py-2" onClick={submit}>Entrar</button>
      {token && <p className="text-green-600 break-all">Token: {token}</p>}
    </main>
  );
}
