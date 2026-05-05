import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 1. Skip assets and API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/img') ||
    pathname.startsWith('/images-slider')
  ) {
    return NextResponse.next();
  }

  // 2. Handle i18n
  const locales = ['es', 'en'];
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  let updatedPathname = pathname;
  if (pathnameIsMissingLocale) {
    // Redirect to default locale if missing
    return NextResponse.redirect(new URL(`/es${pathname === '/' ? '' : pathname}`, req.url));
  }

  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role as string | undefined;

  const localePattern = /^\/(es|en)/;
  const match = pathname.match(localePattern);
  const locale = match ? match[1] : 'es';

  // 3. Auth Protection for /privado routes
  if (pathname.includes('/privado')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
    }

    // A. Priority: Password Change Check
    if (req.auth?.user?.requires_password_change) {
      return NextResponse.redirect(new URL(`/${locale}/auth/change-password`, req.url));
    }

    // B. Role Detection & Error Control
    const targetRolePath = getRolePath(role);
    if (!targetRolePath) {
      // Role not detected: do not leave them in /privado
      return NextResponse.redirect(new URL(`/${locale}/auth/login`, req.url));
    }

    // C. Default Redirect from base /privado
    if (pathname === `/${locale}/privado` || pathname === `/${locale}/privado/`) {
      return NextResponse.redirect(new URL(`/${locale}/privado/${targetRolePath}`, req.url));
    }

    // D. Removed aggressive role checks. Subfolders rely on their own page-level auth checks.
  }

  // 4. Redirect from login if already logged in
  if (pathname.includes('/auth/login') && isLoggedIn) {
    if (req.auth?.user?.requires_password_change) {
      return NextResponse.redirect(new URL(`/${locale}/auth/change-password`, req.url));
    }
    
    const targetRolePath = getRolePath(role);
    if (targetRolePath) {
      return NextResponse.redirect(new URL(`/${locale}/privado/${targetRolePath}`, req.url));
    }
  }

  return NextResponse.next();
});

function getRolePath(role?: string) {
  switch (role) {
    case 'b2b': return 'empresa';
    case 'interiorista': 
    case 'pro': return 'interiorista';
    case 'b2c': 
    case 'vip': return 'vip';
    default: return '';
  }
}

export const config = {
  // Ignorar todas las rutas que tengan un punto (imágenes, favicons, etc.)
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)']
};
