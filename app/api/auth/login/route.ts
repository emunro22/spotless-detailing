import { NextResponse } from 'next/server';
import { createSession, setSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

// Single access code, no email. Override with ADMIN_CODE in the environment
// if it ever needs changing without a deploy.
const ADMIN_CODE = process.env.ADMIN_CODE || '2003';

export async function POST(req: Request) {
  const { code } = await req.json().catch(() => ({ code: '' }));

  if (typeof code !== 'string' || !code.trim()) {
    return NextResponse.json({ error: 'Enter your code' }, { status: 400 });
  }

  if (code.trim() !== ADMIN_CODE) {
    return NextResponse.json({ error: 'Wrong code' }, { status: 401 });
  }

  const token = await createSession('admin');
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
