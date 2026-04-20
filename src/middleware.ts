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

    // Advanced: Role-based route protection
    // Check if the user is trying to access a section they don't have access to
    if (pathname.includes('/privado/empresa') && role !== 'b2b') {
      return NextResponse.redirect(new URL(`/${locale}/privado/${getRolePath(role)}`, req.url));
    }
    if (pathname.includes('/privado/profesional') && role !== 'interiorista') {
      return NextResponse.redirect(new URL(`/${locale}/privado/${getRolePath(role)}`, req.url));
    }
    if (pathname.includes('/privado/residencial') && role !== 'b2c') {
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
    case 'interiorista': return 'profesional';
    case 'b2c': return 'residencial';
    default: return '';
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
