import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

const publicRoutes = ["/", "/auth/login", "/auth/register"];

const isTokenVerified = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload ? true : false;
  } catch (e) {
    return false;
  }
};

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token");

  if (req.url.startsWith("/static") || req.url.includes(".")) {
    return NextResponse.next();
  }

  if (!publicRoutes.includes(req.nextUrl.pathname)) {
    if (token === undefined) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    const isVerified = await isTokenVerified(token);
    if (isVerified) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
};
