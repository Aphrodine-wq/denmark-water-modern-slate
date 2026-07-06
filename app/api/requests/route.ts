import { NextRequest, NextResponse } from "next/server";
import { createRequest, listRequests, type RequestKind } from "@/lib/staffData";
import { getStaffSession } from "@/lib/requireStaff";
import { DatabaseNotConfiguredError } from "@/lib/db";

export const dynamic = "force-dynamic";

const KINDS: RequestKind[] = ["leak", "service"];

// GET is staff-only (the request list). POST is public — it's how the
// Report-a-Leak / Start-Stop-Service forms submit.
export async function GET() {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const requests = await listRequests();
    return NextResponse.json({ requests });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to load requests." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const { kind, name, phone, address, requestType, details } = (body ?? {}) as Record<string, unknown>;

  if (typeof kind !== "string" || !KINDS.includes(kind as RequestKind)) {
    return NextResponse.json({ error: `kind must be one of: ${KINDS.join(", ")}` }, { status: 400 });
  }
  if (typeof name !== "string" || !name.trim() || typeof phone !== "string" || !phone.trim() || typeof address !== "string" || !address.trim()) {
    return NextResponse.json({ error: "name, phone, and address are required." }, { status: 400 });
  }

  try {
    const created = await createRequest({
      kind: kind as RequestKind,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      requestType: typeof requestType === "string" ? requestType : undefined,
      details: typeof details === "string" ? details : undefined,
    });
    return NextResponse.json({ reference: created.reference });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to submit request." }, { status: 500 });
  }
}
