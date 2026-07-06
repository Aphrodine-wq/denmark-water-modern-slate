import { getStaffSession } from "@/lib/requireStaff";
import { getNotice, listRequests, listDocuments } from "@/lib/staffData";
import StaffDashboardClient from "./StaffDashboardClient";

export const dynamic = "force-dynamic";

export default async function StaffDashboard() {
  // Middleware already gates this route; session is guaranteed non-null here.
  const session = await getStaffSession();
  const [notice, requests, documents] = await Promise.all([getNotice(), listRequests(), listDocuments()]);

  return (
    <StaffDashboardClient
      staffName={session?.name ?? "Staff"}
      initialNotice={notice}
      initialRequests={requests}
      initialDocuments={documents}
    />
  );
}
