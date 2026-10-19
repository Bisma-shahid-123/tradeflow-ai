import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/setup',
  '/auth/verify',
  '/favicon.ico',
  '/robots.txt',
  '/_next/',
  '/api/',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('Missing Supabase environment variables');
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll() {
        // noop; cookies are read-only here
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const redirectUrl = new URL('/auth/sign-in', req.url);
    redirectUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  const {
    data: { currentLevel },
  } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (currentLevel !== 'aal2' && !pathname.startsWith('/auth/setup')) {
    return NextResponse.redirect(new URL('/auth/setup', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/orders/:path*', '/dispatch', '/khata'],
};
