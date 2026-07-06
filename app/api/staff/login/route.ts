import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyPassword, signSession, SESSION_COOKIE } from "@/lib/auth";
import { findStaffByEmail } from "@/lib/staffData";
import { DatabaseNotConfiguredError } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const { email, password } = (body ?? {}) as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    const user = await findStaffByEmail(email);
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    }
    const token = await signSession({ sub: user.id, email: user.email, name: user.name });
    const jar = await cookies();
    jar.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return NextResponse.json({ ok: true, name: user.name });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
