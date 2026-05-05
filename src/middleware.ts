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

    // Check if the user is forced to change their password
    if (req.auth?.user?.requires_password_change) {
      return NextResponse.redirect(new URL(`/${locale}/auth/change-password`, req.url));
    }

    // Advanced: Role-based route protection
    // Redirect base /privado to the correct role dashboard
    if (pathname === `/${locale}/privado` || pathname === `/${locale}/privado/`) {
      return NextResponse.redirect(new URL(`/${locale}/privado/${getRolePath(role)}`, req.url));
    }

    // Check if the user is trying to access a section they don't have access to
    if (pathname.includes('/privado/empresa') && role !== 'b2b') {
      return NextResponse.redirect(new URL(`/${locale}/privado/${getRolePath(role)}`, req.url));
    }
    if (pathname.includes('/privado/interiorista') && role !== 'interiorista') {
      return NextResponse.redirect(new URL(`/${locale}/privado/${getRolePath(role)}`, req.url));
    }
    if (pathname.includes('/privado/vip') && role !== 'b2c') {
      return NextResponse.redirect(new URL(`/${locale}/privado/${getRolePath(role)}`, req.url));
    }
  }

  // 4. Redirect from login if already logged in
  if (pathname.includes('/auth/login') && isLoggedIn) {
    return NextResponse.redirect(new URL(`/${locale}/privado/${getRolePath(role)}`, req.url));
  }

  return NextResponse.next();
});

function getRolePath(role?: string) {
  switch (role) {
    case 'b2b': return 'empresa';
    case 'interiorista': return 'interiorista';
    case 'b2c': return 'vip';
    default: return '';
  }
}

export const config = {
  // Ignorar todas las rutas que tengan un punto (imágenes, favicons, etc.)
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*|favicon.ico).*)']
};
