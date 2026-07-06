import { NextResponse } from "next/server";
import { deleteDocument } from "@/lib/staffData";
import { getStaffSession } from "@/lib/requireStaff";
import { DatabaseNotConfiguredError } from "@/lib/db";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const idNum = parseInt(id, 10);
  if (Number.isNaN(idNum)) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

  try {
    await deleteDocument(idNum);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to delete document." }, { status: 500 });
  }
}
