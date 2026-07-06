import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { countStaffUsers, createStaffUser } from "@/lib/staffData";
import { DatabaseNotConfiguredError } from "@/lib/db";

export const dynamic = "force-dynamic";

// Bootstraps the first staff account. Gated by ADMIN_SETUP_TOKEN and refuses
// once any staff_users row exists, so it can't be used to mint extra admins
// later — create additional staff from inside the dashboard instead.
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-setup-token");
  const expected = process.env.ADMIN_SETUP_TOKEN;
  if (!expected || token !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const { email, password, name } = (body ?? {}) as { email?: string; password?: string; name?: string };
  if (!email || !password || !name) {
    return NextResponse.json({ error: "email, password, and name are required." }, { status: 400 });
  }
  if (password.length < 10) {
    return NextResponse.json({ error: "Password must be at least 10 characters." }, { status: 400 });
  }

  try {
    const existing = await countStaffUsers();
    if (existing > 0) {
      return NextResponse.json({ error: "A staff account already exists. Add more from inside the dashboard." }, { status: 409 });
    }
    const hash = await hashPassword(password);
    const user = await createStaffUser(email, hash, name);
    return NextResponse.json({ ok: true, email: user.email });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: err instanceof Error ? err.message : "Setup failed." }, { status: 500 });
  }
}
