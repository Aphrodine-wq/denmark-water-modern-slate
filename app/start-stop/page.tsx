import RequestForm from "@/components/RequestForm";
import { org } from "@/lib/content";

export const metadata = { title: `Start / Stop Service — ${org.name}` };

export default function StartStopPage() {
  return <RequestForm kind="service" />;
}
