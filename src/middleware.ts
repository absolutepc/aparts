import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SECRET ?? "dev-secret-change-in-production";
}

async function verifySessionToken(token: string | undefined) {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );

  const expected = Array.from(new Uint8Array(signed))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  if (expected !== signature) return false;

  const createdAt = Number(payload);
  if (Number.isNaN(createdAt)) return false;

  return Date.now() - createdAt < SESSION_MAX_AGE * 1000;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const valid = await verifySessionToken(token);

    if (!valid) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
