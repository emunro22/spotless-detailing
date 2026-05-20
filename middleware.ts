import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SESSION_COOKIE = 'spotless_admin';
const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-dev-secret-change-in-prod'
);

async function verifySession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { email: payload.email as string };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);

  // Login page is public; if already logged in, bounce to dashboard.
  if (pathname === '/admin/login') {
    if (session) return NextResponse.redirect(new URL('/admin', req.url));
    return NextResponse.next();
  }

  // Public login API endpoint
  if (pathname === '/api/auth/login') return NextResponse.next();

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (!session) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/auth/login'],
};
