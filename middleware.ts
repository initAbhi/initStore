import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { redirect } from "next/dist/server/api-utils";

export async function middleware(req: NextRequest) {
  console.log(
    "middleware req and auth secret - ",
    req,
    process.env.AUTH_SECRET
  );
  // const token = await getToken({
  //   req,
  //   secret: process.env.AUTH_SECRET,
  // });
  // for production
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "next-auth.session-token",
  });

  console.log("middleware token - ", token);
  // If user is not authenticated, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  } //add
  console.log(token, req);

  let isAdminPath = req.nextUrl.pathname.includes("/admin");

  if (isAdminPath && !token.isAdmin) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/cart", "/admin/:path*"], // Protect these routes
};
