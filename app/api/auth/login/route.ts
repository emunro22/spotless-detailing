import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createSession, setSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const validEmail = process.env.ADMIN_EMAIL;
  const validHash = process.env.ADMIN_PASSWORD_HASH;

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }
  if (!validEmail || !validHash) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const emailMatch = email.toLowerCase().trim() === validEmail.toLowerCase().trim();
  if (!emailMatch) {
    return NextResponse.json({ error: 'Invalid credentials (email)' }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, validHash);

  if (!ok) {
    return NextResponse.json({ error: 'Invalid credentials (password)' }, { status: 401 });
  }

  const token = await createSession(email);
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}