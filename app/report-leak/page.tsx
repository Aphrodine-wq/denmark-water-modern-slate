import RequestForm from "@/components/RequestForm";
import { org } from "@/lib/content";

export const metadata = { title: `Report a Leak — ${org.name}` };

export default function ReportLeakPage() {
  return <RequestForm kind="leak" />;
}
