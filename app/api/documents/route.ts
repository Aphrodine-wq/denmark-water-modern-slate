import { NextRequest, NextResponse } from "next/server";
import { addDocument, listDocuments } from "@/lib/staffData";
import { getStaffSession } from "@/lib/requireStaff";
import { DatabaseNotConfiguredError } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET is public (the documents section lists them). POST is staff-only.
export async function GET() {
  try {
    const documents = await listDocuments();
    return NextResponse.json({ documents });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ documents: [], error: err.message }, { status: 503 });
    }
    return NextResponse.json({ documents: [], error: "Failed to load documents." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getStaffSession();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const { title, category, url } = (body ?? {}) as { title?: string; category?: string; url?: string };
  if (!title?.trim() || !url?.trim()) {
    return NextResponse.json({ error: "title and url are required." }, { status: 400 });
  }

  try {
    const doc = await addDocument(title.trim(), category?.trim() || "General", url.trim());
    return NextResponse.json({ document: doc });
  } catch (err) {
    if (err instanceof DatabaseNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Failed to add document." }, { status: 500 });
  }
}
