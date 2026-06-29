// Fake demo accounts powering the payment-portal mock.
// No backend, no real processor — the lookup matches against these fixtures.

export type UsagePoint = { month: string; gallons: number };

export type Account = {
  accountNumber: string;
  lastName: string;
  holderName: string;
  serviceAddress: string;
  amountDue: number;
  dueDate: string;
  pastDue: boolean;
  usage: UsagePoint[]; // last 6 months
};

// DEMO ACCOUNT — shown on screen so the lookup "works" in a live demo.
export const DEMO_ACCOUNT_NUMBER = "104872";
export const DEMO_LAST_NAME = "Mason";

export const accounts: Account[] = [
  {
    accountNumber: "104872",
    lastName: "Mason",
    holderName: "Robert Mason",
    serviceAddress: "418 Oakridge Lane, Denmark, SC 29042",
    amountDue: 64.35,
    dueDate: "July 20, 2026",
    pastDue: false,
    usage: [
      { month: "Jan", gallons: 4200 },
      { month: "Feb", gallons: 3850 },
      { month: "Mar", gallons: 4100 },
      { month: "Apr", gallons: 5300 },
      { month: "May", gallons: 6800 },
      { month: "Jun", gallons: 7450 },
    ],
  },
  {
    accountNumber: "118930",
    lastName: "Whitfield",
    holderName: "Carla Whitfield",
    serviceAddress: "27 County Road 14, Denmark, SC 29042",
    amountDue: 142.9,
    dueDate: "July 20, 2026",
    pastDue: true,
    usage: [
      { month: "Jan", gallons: 9100 },
      { month: "Feb", gallons: 8700 },
      { month: "Mar", gallons: 9400 },
      { month: "Apr", gallons: 10200 },
      { month: "May", gallons: 11050 },
      { month: "Jun", gallons: 12600 },
    ],
  },
];

/** Case-insensitive lookup by account number + last name. */
export function findAccount(accountNumber: string, lastName: string): Account | null {
  const acct = accountNumber.trim();
  const name = lastName.trim().toLowerCase();
  return (
    accounts.find(
      (a) => a.accountNumber === acct && a.lastName.toLowerCase() === name
    ) ?? null
  );
}
