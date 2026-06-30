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
    desc: "View your balance and pay online anytime, day or night.",
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
    a: "Bills are mailed at the start of each month and are due by the 20th. A late penalty is added after the due date.",
  },
  {
    q: "How do I find my account number?",
    a: "It's printed at the top of your paper bill, just above your service address. You'll need it to pay online.",
  },
  {
    q: "What are all the ways I can pay?",
    a: "Online by card or e-check through the BBI EzPay portal, in person with cash or check, by mail, by phone during office hours, or in the after-hours drop box. Autopay and paperless billing can be set up in the portal.",
  },
  {
    q: "My bill is higher than usual — could I have a leak?",
    a: "Very possibly. A silent running toilet can waste hundreds of gallons a day. Turn off every faucet and appliance, then look at your meter — if the dial is still moving, you likely have a leak between the meter and the house.",
  },
  {
    q: "What should I do during a boil-water notice?",
    a: "Bring tap water to a rolling boil for one full minute before drinking, cooking, making ice, brushing teeth, or washing produce. Let it cool before use. We'll post the notice here and let you know the moment it's lifted.",
  },
  {
    q: "Why is my water cloudy or discolored?",
    a: "It's usually temporary after hydrant flushing or a repair. Run a cold tap for a few minutes to clear it. If it doesn't clear, or there's an odor, call the office.",
  },
  {
    q: "How do I start, stop, or transfer service?",
    a: "Use the Start / Stop Service form or call the office. New accounts need a photo ID, the service address, and a refundable deposit.",
  },
  {
    q: "What happens if I pay late?",
    a: "A late penalty is added after the 20th. If the balance stays unpaid, service may be disconnected, and a reconnection fee applies to restore it — so call us before the due date if you're behind.",
  },
  {
    q: "Is help available if I can't afford my bill?",
    a: "You may qualify for the Low Income Household Water Assistance Program (LIHWAP) or local aid. Call the office before your due date and we'll point you to current programs.",
  },
  {
    q: "Is my water safe to drink?",
    a: `Yes. We test continuously for bacteria, lead, nitrates, and disinfection levels and publish the results each year in our Consumer Confidence Report. The most recent ${waterQuality.reportYear} report shows zero violations.`,
  },
  {
    q: "How do I report a leak or main break?",
    a: `Use Report a Leak anytime, or call our emergency line at ${org.emergencyPhone} for a main break, no water, or a water-quality emergency.`,
  },
];

// Evergreen, accurate member-help content. Safe for any rural water system;
// swap specifics (programs, contacts) for the association's own when known.
export const leakCheck = {
  title: "Think you have a leak?",
  intro: "Leaks are the #1 reason for a surprise-high bill. Here's a two-minute check:",
  steps: [
    "Turn off every faucet, appliance, and water-using device in the home.",
    "Find your water meter (usually near the street in a covered box) and note the dial position.",
    "Wait 20–30 minutes without using any water, then check the meter again.",
    "If the dial moved, water is escaping somewhere — most often a running toilet, a dripping faucet, or an underground line.",
  ],
  note: "A toilet flapper that won't seal can waste 200+ gallons a day. Fixing it is usually a few dollars.",
} as const;

export const boilWater = {
  title: "During a boil-water notice",
  steps: [
    "Bring tap water to a rolling boil and keep it boiling for one full minute.",
    "Let it cool before drinking, cooking, making ice, brushing teeth, or washing produce.",
    "Use boiled or bottled water for pets, too.",
    "Throw out ice made during the notice; run your icemaker again only after it's lifted.",
  ],
  note: "We post the notice at the top of this site and let you know as soon as the water is cleared for normal use.",
} as const;

export const conservationTips = [
  "Fix running toilets and dripping faucets quickly — they're the biggest silent water wasters.",
  "Water the lawn early morning or evening so less evaporates.",
  "Run the dishwasher and washing machine only with full loads.",
  "Keep a pitcher of water in the fridge instead of running the tap until it's cold.",
  "Check outdoor spigots and hoses for slow drips, especially after winter.",
] as const;

export const assistance = {
  title: "Need help with your bill?",
  body: "If money is tight, call the office before your due date. You may qualify for the Low Income Household Water Assistance Program (LIHWAP) or other local assistance, and we can often set up a short payment arrangement to keep your water on.",
} as const;

// Card/e-check fee is set by BBI EzPay and shown to the member inside EzPay
// before they confirm — Denmark Water keeps none of it. Copy below is shown on
// the Pay My Bill page so the fee is never a surprise (the #1 utility complaint).
export const payment = {
  feeNote:
    "Paying by card or e-check adds a small processor fee set by our bill-pay provider (BBI EzPay). The exact amount is shown before you confirm, and Denmark Water keeps none of it.",
  otherWays: [
    { method: "In person", detail: "Cash or check at the office during office hours." },
    { method: "By mail", detail: "Mail a check to the office address. Allow 3–5 business days." },
    { method: "After-hours drop box", detail: "Sealed checks only, at the office front door." },
    { method: "By phone", detail: "Call the office during business hours to pay by card." },
  ],
} as const;
