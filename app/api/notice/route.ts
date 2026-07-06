import { NextRequest, NextResponse } from "next/server";
import { getNotice, updateNotice } from "@/lib/staffData";
import { getStaffSession } from "@/lib/requireStaff";
import { DatabaseNotConfiguredError } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET is public (the homepage banner reads it). PUT is staff-only.
export async function GET() {
  try {
    const notice = await getNotice();
    return NextResponse.json({ notice });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ notice: null, error: err.message }, { status: 503 });
    }
    return NextResponse.json({ notice: null, error: "Failed to load notice." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const { active, label, message } = (body ?? {}) as { active?: unknown; label?: unknown; message?: unknown };
  if (typeof active !== "boolean" || typeof label !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "active (bool), label (string), and message (string) are required." }, { status: 400 });
  }

  try {
    const notice = await updateNotice({ active, label, message });
    return NextResponse.json({ notice });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to update notice." }, { status: 500 });
  }
}
