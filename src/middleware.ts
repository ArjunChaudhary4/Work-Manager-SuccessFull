import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.url;
  const pathname = new URL(url).pathname;
  const cookie = request.cookies.get("loginToken");

  // Paths that don't require authentication
  const publicPaths = ["/login", "/sign-up"];
  const protectedPaths = ["/showtask", "/addtask"];

  // Check if the request is for a public path
  if (publicPaths.includes(pathname)) {
    // If the user is authenticated, redirect them away from public paths
    if (cookie) {
      return NextResponse.redirect(new URL("/", url));
    }
    // Continue to public paths
    return NextResponse.next();
  }

  // Check if the request is for a protected path
  if (protectedPaths.includes(pathname)) {
    if (!cookie) {
      // If there's no loginToken cookie, redirect to the /login page
      return NextResponse.redirect(new URL("/login", url));
    }
    // Continue to protected path if the user has a cookie
    return NextResponse.next();
  }

  // For other paths, continue as usual
  return NextResponse.next();
}

// Specify the paths that this middleware should apply to
export const config = {
  matcher: ["/showtask", "/addtask", "/login", "/sign-up"],
};
