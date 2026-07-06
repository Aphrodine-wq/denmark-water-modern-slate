import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const COOKIE_NAME = "dwa_staff_session";
const ALG = "HS256";

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set — add it in the Vercel dashboard (Environment Variables) and redeploy.");
  return new TextEncoder().encode(secret);
}

export interface StaffSession {
  sub: number;
  email: string;
  name: string;
}

export async function signSession(payload: StaffSession): Promise<string> {
  return new SignJWT({ email: payload.email, name: payload.name })
    .setProtectedHeader({ alg: ALG })
    .setSubject(String(payload.sub))
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey());
}

export async function verifySession(token: string): Promise<StaffSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    const sub = typeof payload.sub === "string" ? parseInt(payload.sub, 10) : NaN;
    if (Number.isNaN(sub) || typeof payload.email !== "string" || typeof payload.name !== "string") return null;
    return { sub, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = COOKIE_NAME;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
