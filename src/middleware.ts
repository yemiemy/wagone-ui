import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("__token")?.value;

    // Capture the original URL before redirecting to login
    const originalUrl = request.url;
    if (
        currentUser &&
        (request.nextUrl.pathname.startsWith("/auth/signup") ||
            request.nextUrl.pathname.startsWith("/auth/login") ||
            request.nextUrl.pathname.startsWith("/auth/verify"))
    ) {
        return Response.redirect(new URL("/", request.url));
    }

    if (
        !currentUser &&
        (request.nextUrl.pathname.startsWith("/auth/login") ||
            request.nextUrl.pathname.startsWith("/auth/signup") ||
            request.nextUrl.pathname.startsWith("/auth/verify"))
    ) {
        return;
    }

    // Check if user is not logged in and redirect to login
    if (
        !currentUser ||
        (!currentUser && !request.nextUrl.pathname.startsWith("/auth/login"))
    ) {
        return Response.redirect(
            new URL("/auth/login?next=" + originalUrl, request.url)
        );
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
