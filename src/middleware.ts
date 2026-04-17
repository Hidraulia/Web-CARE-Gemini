import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple i18n routing middleware and simulated auth protection
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 1. Check if it's an asset or api route, let it pass
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/img') ||
    pathname.startsWith('/images-slider')
  ) {
    return NextResponse.next()
  }

  // 2. Handle simple i18n
  const locales = ['es', 'en']
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // Redirect to default locale if missing
    return NextResponse.redirect(new URL(`/es${pathname === '/' ? '' : pathname}`, request.url))
  }

  // 3. Simulated Auth Protection for Dashboard routes
  if (pathname.includes('/dashboard')) {
    // In a real app we'd check req.auth from next-auth
    const authCookie = request.cookies.get('mock_session')?.value
    if (!authCookie) {
       // redirect to login
       const localePattern = /^\/(es|en)/
       const match = pathname.match(localePattern)
       const locale = match ? match[1] : 'es'
       return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
