/**
 * Next.js Edge Middleware — Auth Session Refresh + Route Protection
 *
 * Runs on EVERY request before it hits the page.
 * 1. Refreshes the Supabase session token (keeps users logged in)
 * 2. Protects /dashboard, /visitors, /settings, /team, /reports, /help
 *    — redirects unauthenticated users to /login
 * 3. Redirects already-authenticated users away from /login and /signup
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED = [
  "/dashboard",
  "/visitors",
  "/settings",
  "/team",
  "/reports",
  "/help",
];

// Auth routes — authenticated users should not see these
const AUTH_ROUTES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // Build Supabase server client wired to Next.js cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write cookies to the request for downstream middleware
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options })
          );
          // Re-create the response so cookies are propagated to the browser
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Always use getUser() on the server — never getSession().
  // getUser() re-validates the JWT against Supabase on every request.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // No session → send to login
  if (!user && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in → send away from auth pages
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Run on every path EXCEPT Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
