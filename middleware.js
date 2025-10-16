import { withClerkMiddleware } from "@clerk/nextjs/server";

export default withClerkMiddleware();

export const config = {
  matcher: [
    /*
     * Protect all routes except for the ones starting with:
     * - /api
     * - /sign-in
     * - /sign-up
     * - /_next
     * - /favicon.ico
     */
    "/((?!api|sign-in|sign-up|_next|favicon.ico).*)",
  ],
};
