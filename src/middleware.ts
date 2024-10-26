import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Protecting all admin pages from unauthenticated user
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // In order to test if a user is admin, we have to parse user
    try {
      const user = JSON.parse(request.cookies.get("user")?.value || "");
      if (!user.isAdmin) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Protecting all profile pages from unauthenticated user
  if (request.nextUrl.pathname.startsWith("/profile")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}
