import { query } from "@/lib/db";

export interface StaffUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
}

export async function countStaffUsers(): Promise<number> {
  const rows = await query<{ count: string }>("SELECT count(*)::text FROM staff_users");
  return parseInt(rows[0]?.count ?? "0", 10);
}

export async function findStaffByEmail(email: string): Promise<StaffUser | null> {
  const rows = await query<StaffUser>("SELECT * FROM staff_users WHERE email = $1", [email.toLowerCase().trim()]);
  return rows[0] ?? null;
}

export async function createStaffUser(email: string, passwordHash: string, name: string): Promise<StaffUser> {
  const rows = await query<StaffUser>(
    "INSERT INTO staff_users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING *",
    [email.toLowerCase().trim(), passwordHash, name]
  );
  return rows[0];
}

export interface Notice {
  active: boolean;
  label: string;
  message: string;
}

export async function getNotice(): Promise<Notice> {
  const rows = await query<Notice>("SELECT active, label, message FROM notice WHERE id = 1");
  return rows[0] ?? { active: false, label: "Service Notice", message: "" };
}

export async function updateNotice(notice: Notice): Promise<Notice> {
  const rows = await query<Notice>(
    "UPDATE notice SET active = $1, label = $2, message = $3, updated_at = now() WHERE id = 1 RETURNING active, label, message",
    [notice.active, notice.label, notice.message]
  );
  return rows[0];
}

export type RequestKind = "leak" | "service";
export type RequestStatus = "new" | "in_progress" | "done";

export interface ServiceRequest {
  id: number;
  reference: string;
  kind: RequestKind;
  name: string;
  phone: string;
  address: string;
  request_type: string | null;
  details: string | null;
  status: RequestStatus;
  created_at: string;
}

export async function createRequest(input: {
  kind: RequestKind;
  name: string;
  phone: string;
  address: string;
  requestType?: string;
  details?: string;
}): Promise<ServiceRequest> {
  const reference = "DWA-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  const rows = await query<ServiceRequest>(
    `INSERT INTO requests (reference, kind, name, phone, address, request_type, details)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [reference, input.kind, input.name, input.phone, input.address, input.requestType ?? null, input.details ?? null]
  );
  return rows[0];
}

export async function listRequests(): Promise<ServiceRequest[]> {
  return query<ServiceRequest>("SELECT * FROM requests ORDER BY created_at DESC LIMIT 200");
}

export async function updateRequestStatus(id: number, status: RequestStatus): Promise<ServiceRequest | null> {
  const rows = await query<ServiceRequest>("UPDATE requests SET status = $1 WHERE id = $2 RETURNING *", [status, id]);
  return rows[0] ?? null;
}

export interface DocumentRow {
  id: number;
  title: string;
  category: string;
  url: string;
  created_at: string;
}

export async function listDocuments(): Promise<DocumentRow[]> {
  return query<DocumentRow>("SELECT * FROM documents ORDER BY created_at DESC");
}

export async function addDocument(title: string, category: string, url: string): Promise<DocumentRow> {
  const rows = await query<DocumentRow>(
    "INSERT INTO documents (title, category, url) VALUES ($1, $2, $3) RETURNING *",
    [title, category, url]
  );
  return rows[0];
}

export async function deleteDocument(id: number): Promise<void> {
  await query("DELETE FROM documents WHERE id = $1", [id]);
}
