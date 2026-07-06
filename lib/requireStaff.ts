import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession, type StaffSession } from "@/lib/auth";

export async function getStaffSession(): Promise<StaffSession | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySession(token);
}
