import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createSession, setSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const validEmail = process.env.ADMIN_EMAIL;
  const validHash = process.env.ADMIN_PASSWORD_HASH;

  console.log('--- LOGIN DEBUG ---');
  console.log('email received:', JSON.stringify(email));
  console.log('password received length:', password?.length);
  console.log('password received:', JSON.stringify(password));
  console.log('validEmail from env:', JSON.stringify(validEmail));
  console.log('validHash from env length:', validHash?.length);
  console.log('validHash from env starts:', JSON.stringify(validHash?.slice(0, 10)));
  console.log('validHash from env ends:', JSON.stringify(validHash?.slice(-10)));

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }
  if (!validEmail || !validHash) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const emailMatch = email.toLowerCase().trim() === validEmail.toLowerCase().trim();
  console.log('email match:', emailMatch);
  if (!emailMatch) {
    return NextResponse.json({ error: 'Invalid credentials (email)' }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, validHash);
  console.log('bcrypt compare result:', ok);

  if (!ok) {
    return NextResponse.json({ error: 'Invalid credentials (password)' }, { status: 401 });
  }

  const token = await createSession(email);
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}