import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'spotless_admin';
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-dev-secret-change-in-prod'
);

export async function createSession(user = 'admin'): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifySession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    // Older sessions were issued with an { email } payload.
    return { user: (payload.user as string) || (payload.email as string) || 'admin' };
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return verifySession(store.get(COOKIE_NAME)?.value);
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
