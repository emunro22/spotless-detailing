'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Login failed');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 hex-overlay opacity-40 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(56,189,248,0.5), transparent 70%)',
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md glass-strong border-gradient rounded-3xl p-8 md:p-10 relative"
      >
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-3">
          Spotless Detailing
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Admin sign in
        </h1>
        <p className="text-sm text-cream/60 mb-8">
          Manage services, gallery and site content.
        </p>

        <label className="block mb-4">
          <span className="block text-xs uppercase tracking-[0.16em] text-cream/60 mb-1.5">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="w-full bg-midnight-900 border border-cream/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan/40 transition-colors"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-xs uppercase tracking-[0.16em] text-cream/60 mb-1.5">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-midnight-900 border border-cream/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan/40 transition-colors"
          />
        </label>

        {error && (
          <p className="text-sm text-red-400 mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 bg-cyan hover:bg-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed text-midnight-900 font-semibold rounded-full py-3.5 transition-all shadow-glow-cyan"
        >
          {loading ? (
            'Signing in…'
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Sign in
            </>
          )}
        </button>
      </form>
    </main>
  );
}
