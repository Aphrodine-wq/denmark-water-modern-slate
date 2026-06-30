// Shared, concept-agnostic copy for Denmark Water Association.
// PLACEHOLDER CONTENT — swap real org details before sending to the client.
// (logo, exact service area, board members, rate schedule, CCR report, contact info)

export const org = {
  name: "Denmark Water Association",
  shortName: "Denmark Water",
  established: 1968,
  tagline: "Clean, reliable water for our community.",
  serviceArea: "Denmark and surrounding rural communities",
  phone: "(601) 555-0142",
  emergencyPhone: "(601) 555-0199",
  email: "office@denmarkwater.org",
  address: "112 Main Street, Denmark, MS 39071",
  officeHours: "Mon–Fri, 8:00 AM – 5:00 PM",
  membersServed: "2,400+ households",
  // BBI EzPay hosted bill-pay portal. SWAP for Denmark Water's entity-specific
  // EzPay link once BBI confirms it (ask BBI for the direct billing-entity URL).
  // The Pay My Bill page embeds this URL in an iframe + offers it as a new-tab link.
  ezpayUrl: "https://www.msezpay.com/",
} as const;

export const alertNotice = {
  active: true,
  label: "Service Notice",
  message:
    "Routine hydrant flushing in the North district runs June 30 – July 3. You may notice temporary discoloration; run cold water a few minutes to clear it.",
} as const;

export type QuickAction = {
  key: string;
  title: string;
  desc: string;
  href: string;
  primary?: boolean;
};

export const quickActions: QuickAction[] = [
  {
    key: "pay",
    title: "Pay My Bill",
    desc: "View your balance and pay online in under a minute.",
    href: "pay",
    primary: true,
  },
  {
    key: "leak",
    title: "Report a Leak",
    desc: "Spotted a main break or leak? Let us know right away.",
    href: "#contact",
  },
  {
    key: "service",
    title: "Start / Stop Service",
    desc: "Moving in or out of the service area? Set up your account.",
    href: "#contact",
  },
];

export type Service = { title: string; desc: string };

export const services: Service[] = [
  {
    title: "Residential & Commercial Water",
    desc: "Metered water service to homes and businesses across the district, tested and treated to state and federal standards.",
  },
  {
    title: "New Connections",
    desc: "Tap requests, meter installation, and new-account setup for property owners building or moving into the area.",
  },
  {
    title: "Leak & Emergency Response",
    desc: "Crews on call for main breaks, outages, and water-quality concerns, with after-hours emergency dispatch.",
  },
  {
    title: "Online Account Management",
    desc: "Check your balance, view usage, and pay your bill anytime from your phone or computer.",
  },
];

export type RateRow = { label: string; detail: string; amount: string };

export const rates: RateRow[] = [
  { label: "Base meter charge", detail: "5/8\" residential meter, per month", amount: "$22.00" },
  { label: "Usage — first 2,000 gal", detail: "included in base charge", amount: "Included" },
  { label: "Usage — 2,001–10,000 gal", detail: "per 1,000 gallons", amount: "$4.85" },
  { label: "Usage — over 10,000 gal", detail: "per 1,000 gallons", amount: "$6.10" },
  { label: "New service connection", detail: "one-time tap fee", amount: "$850.00" },
  { label: "Returned payment fee", detail: "per occurrence", amount: "$30.00" },
];

export const waterQuality = {
  headline: "Your water meets every state and federal standard.",
  body:
    "We test continuously for bacteria, lead, nitrates, and disinfection levels, and publish results every year in our Consumer Confidence Report (CCR). The most recent report shows zero violations.",
  reportYear: 2025,
} as const;

export type BoardMember = { name: string; role: string };

export const board: BoardMember[] = [
  { name: "R. Calhoun", role: "President" },
  { name: "M. Whitfield", role: "Vice President" },
  { name: "D. Pearson", role: "Secretary / Treasurer" },
  { name: "J. Ackerman", role: "Board Member" },
  { name: "L. Brantley", role: "Board Member" },
];

export const boardMeetings = {
  cadence: "Second Tuesday of each month, 6:00 PM",
  location: "Denmark Water Association office, 112 Main Street",
  note: "Members are welcome. Agendas are posted at the office one week prior.",
} as const;

export const faqs: { q: string; a: string }[] = [
  {
    q: "When is my bill due?",
    a: "Bills are mailed on the 1st and due by the 20th of each month. A late penalty applies after the due date.",
  },
  {
    q: "How do I find my account number?",
    a: "Your account number is printed at the top of your paper bill, just above your service address.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Online card payments, in-office cash or check, and mailed checks. Autopay enrollment is available online.",
  },
  {
    q: "Who do I call after hours for an emergency?",
    a: `Call our emergency line at ${org.emergencyPhone} for main breaks, outages, or water-quality emergencies.`,
  },
];
