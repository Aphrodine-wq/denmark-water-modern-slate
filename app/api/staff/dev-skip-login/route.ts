import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signSession, SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Dev-only shortcut so the dashboard can be previewed without creating a
// real staff account. Refuses outside development so it can never work if
// this ever ends up deployed — matches the login page's own NODE_ENV check.
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available." }, { status: 404 });
  }
  const token = await signSession({ sub: 0, email: "dev@local", name: "Dev Preview" });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return NextResponse.json({ ok: true });
}
