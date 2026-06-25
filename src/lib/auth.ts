import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SECRET ?? "dev-secret-change-in-production";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "admin";
}

export function createSessionToken() {
  const payload = Date.now().toString();
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  if (signature !== expected) return false;

  const createdAt = Number(payload);
  if (Number.isNaN(createdAt)) return false;

  return Date.now() - createdAt < SESSION_MAX_AGE * 1000;
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function setSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
