import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authPublicPaths = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("is_auth")?.value;
  console.log("Middleware is running", isAuthenticated);
  if (isAuthenticated) {
    if (
      authPublicPaths.some((path) => request.nextUrl.pathname.startsWith(path))
    ) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
  if (
    !isAuthenticated &&
    !authPublicPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/payments", "/auth/:path*"],
};
