import { NextRequest, NextResponse } from "next/server";
import { updateRequestStatus, type RequestStatus } from "@/lib/staffData";
import { getStaffSession } from "@/lib/requireStaff";
import { DatabaseNotConfiguredError } from "@/lib/db";

const STATUSES: RequestStatus[] = ["new", "in_progress", "done"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (Number.isNaN(idNum)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const { status } = (body ?? {}) as { status?: string };
  if (typeof status !== "string" || !STATUSES.includes(status as RequestStatus)) {
    return NextResponse.json({ error: `status must be one of: ${STATUSES.join(", ")}` }, { status: 400 });
  }

  try {
    const updated = await updateRequestStatus(idNum, status as RequestStatus);
    if (!updated) return NextResponse.json({ error: "Not found." }, { status: 404 });
    return NextResponse.json({ request: updated });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to update request." }, { status: 500 });
  }
}
