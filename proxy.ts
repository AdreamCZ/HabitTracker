import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get session token from cookies
  const sessionToken = request.cookies.get("better-auth.session_token");

  // Protected routes
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Auth routes (should redirect to dashboard if authenticated)
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isProtectedRoute && !sessionToken) {
    // Redirect to login if trying to access protected route without session
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && sessionToken) {
    // Redirect to dashboard if already authenticated
    const url = new URL("/dashboard", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
