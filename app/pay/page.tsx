"use client";

import { useState } from "react";
import Link from "next/link";
import { org } from "@/lib/content";
import { DEMO_ACCOUNT_NUMBER, DEMO_LAST_NAME } from "@/lib/mockAccounts";
import { usePortalFlow, formatCurrency } from "@/lib/usePortalFlow";
import { DropletIcon, CheckIcon, CardIcon, ArrowRightIcon, ShieldIcon } from "@/components/icons";

// Light editorial payment portal — off-white, near-black, cyan accent, sharp corners.
export default function ModernLightPortal() {
  const flow = usePortalFlow();
  const steps = ["Look up", "Balance", "Payment", "Done"];
  const stepIndex = flow.step === "lookup" ? 0 : flow.step === "balance" ? 1 : flow.step === "pay" ? 2 : 3;

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-700">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-neutral-900 text-white">
              <DropletIcon className="h-5 w-5" />
            </span>
            <span className="font-serif text-sm font-semibold text-neutral-900">{org.name}</span>
          </Link>
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back to site</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          <CardIcon className="h-4 w-4" /> Pay My Bill
        </div>
        <h1 className="font-serif text-4xl font-semibold text-neutral-900">Online payment portal</h1>

        <ol className="mt-7 flex items-center gap-2 text-xs font-medium">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs ${
                  i < stepIndex
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : i === stepIndex
                    ? "border-neutral-900 text-neutral-900"
                    : "border-neutral-300 text-neutral-400"
                }`}
              >
                {i < stepIndex ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden sm:block ${i <= stepIndex ? "text-neutral-700" : "text-neutral-400"}`}>{label}</span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-neutral-200" />}
            </li>
          ))}
        </ol>

        <div className="mt-7 border border-neutral-200 bg-white p-6 md:p-8">
          {flow.step === "lookup" && <LookupStep flow={flow} />}
          {flow.step === "balance" && flow.account && <BalanceStep flow={flow} />}
          {flow.step === "pay" && flow.account && <PayStep flow={flow} />}
          {flow.step === "confirmation" && flow.result && <ConfirmationStep flow={flow} />}
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <ShieldIcon className="h-4 w-4" /> Demo only — no real payment is processed and no card data is stored.
        </p>
      </main>
    </div>
  );
}

type Flow = ReturnType<typeof usePortalFlow>;

function fieldClass() {
  return "w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-900 outline-none transition focus:border-neutral-900 placeholder:text-neutral-400";
}

function LookupStep({ flow }: { flow: Flow }) {
  const [acct, setAcct] = useState("");
  const [last, setLast] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); flow.lookup(acct, last); }}>
      <h2 className="font-serif text-xl font-semibold text-neutral-900">Find your account</h2>
      <p className="mt-1 text-sm text-neutral-500">Enter the account number from your bill and the account holder&apos;s last name.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-neutral-700">Account number</span>
          <input className={`mt-1.5 ${fieldClass()}`} value={acct} onChange={(e) => setAcct(e.target.value)} placeholder="e.g. 104872" inputMode="numeric" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-neutral-700">Last name</span>
          <input className={`mt-1.5 ${fieldClass()}`} value={last} onChange={(e) => setLast(e.target.value)} placeholder="e.g. Mason" />
        </label>
      </div>
      {flow.lookupError && <p className="mt-3 border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{flow.lookupError}</p>}
      <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-neutral-900 px-5 py-3 font-semibold text-white transition hover:bg-neutral-700 sm:w-auto">
        Look up account <ArrowRightIcon className="h-5 w-5" />
      </button>
      <p className="mt-4 border border-neutral-200 bg-stone-50 px-3 py-2 text-xs text-neutral-500">
        Demo account — number <strong className="text-cyan-700">{DEMO_ACCOUNT_NUMBER}</strong>, last name <strong className="text-cyan-700">{DEMO_LAST_NAME}</strong>.
      </p>
    </form>
  );
}

function BalanceStep({ flow }: { flow: Flow }) {
  const a = flow.account!;
  const maxUsage = Math.max(...a.usage.map((u) => u.gallons));
  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-neutral-900">Account summary</h2>
      <div className="mt-4 border border-neutral-200 bg-stone-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500">Account holder</p>
            <p className="font-semibold text-neutral-900">{a.holderName}</p>
            <p className="mt-2 text-sm text-neutral-500">Service address</p>
            <p className="text-sm text-neutral-700">{a.serviceAddress}</p>
            <p className="mt-2 text-sm text-neutral-500">Account #{a.accountNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500">Amount due</p>
            <p className="font-serif text-4xl font-semibold text-neutral-900">{formatCurrency(a.amountDue)}</p>
            <p className={`text-sm ${a.pastDue ? "font-semibold text-red-600" : "text-neutral-500"}`}>{a.pastDue ? "Past due" : `Due ${a.dueDate}`}</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-neutral-700">Recent usage (gallons)</p>
        <div className="mt-3 flex items-end gap-3">
          {a.usage.map((u) => (
            <div key={u.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-28 w-full items-end">
                <div className="w-full bg-cyan-600" style={{ height: `${(u.gallons / maxUsage) * 100}%` }} />
              </div>
              <span className="text-xs text-neutral-500">{u.month}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={flow.goToPay} className="inline-flex items-center gap-2 bg-neutral-900 px-5 py-3 font-semibold text-white transition hover:bg-neutral-700">
          Pay {formatCurrency(a.amountDue)} <ArrowRightIcon className="h-5 w-5" />
        </button>
        <button onClick={flow.reset} className="border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 transition hover:border-neutral-500">
          Different account
        </button>
      </div>
    </div>
  );
}

function PayStep({ flow }: { flow: Flow }) {
  const a = flow.account!;
  const [mode, setMode] = useState<"full" | "other">("full");
  const [other, setOther] = useState("");
  const [autopay, setAutopay] = useState(false);
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const amount = mode === "full" ? a.amountDue : Math.max(0, parseFloat(other) || 0);
  const canPay = amount > 0 && card.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvc.length >= 3;

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (canPay) flow.submitPayment(amount, autopay); }}>
      <h2 className="font-serif text-xl font-semibold text-neutral-900">Payment details</h2>
      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-neutral-700">Amount</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className={`flex cursor-pointer items-center gap-3 border px-4 py-3 ${mode === "full" ? "border-neutral-900 bg-stone-100" : "border-neutral-300"}`}>
            <input type="radio" name="amt" checked={mode === "full"} onChange={() => setMode("full")} className="accent-neutral-900" />
            <span>
              <span className="block text-sm font-semibold text-neutral-900">Full balance</span>
              <span className="block text-sm text-neutral-500">{formatCurrency(a.amountDue)}</span>
            </span>
          </label>
          <label className={`flex cursor-pointer items-center gap-3 border px-4 py-3 ${mode === "other" ? "border-neutral-900 bg-stone-100" : "border-neutral-300"}`}>
            <input type="radio" name="amt" checked={mode === "other"} onChange={() => setMode("other")} className="accent-neutral-900" />
            <span className="flex-1">
              <span className="block text-sm font-semibold text-neutral-900">Other amount</span>
              <input value={other} onChange={(e) => { setMode("other"); setOther(e.target.value); }} placeholder="0.00" inputMode="decimal" className="mt-1 w-28 border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900" />
            </span>
          </label>
        </div>
      </fieldset>
      <div className="mt-5 grid gap-4">
        <label className="block">
          <span className="text-sm font-medium text-neutral-700">Card number</span>
          <input className={`mt-1.5 ${fieldClass()}`} value={card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" inputMode="numeric" />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-neutral-700">Expiry</span>
            <input className={`mt-1.5 ${fieldClass()}`} value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM/YY" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-neutral-700">CVC</span>
            <input className={`mt-1.5 ${fieldClass()}`} value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" inputMode="numeric" />
          </label>
        </div>
      </div>
      <label className="mt-4 flex cursor-pointer items-center gap-3 border border-neutral-200 bg-stone-50 px-4 py-3">
        <input type="checkbox" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} className="h-4 w-4 accent-neutral-900" />
        <span className="text-sm text-neutral-700">Enroll in autopay — pay future bills automatically on the due date.</span>
      </label>
      <div className="mt-6 flex items-center justify-between bg-neutral-900 px-5 py-4 text-white">
        <span className="text-sm">Total to pay today</span>
        <span className="font-serif text-2xl font-semibold">{formatCurrency(amount)}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" disabled={!canPay} className="inline-flex items-center gap-2 bg-neutral-900 px-5 py-3 font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-30">
          <CardIcon className="h-5 w-5" /> Submit payment
        </button>
        <button type="button" onClick={flow.backToBalance} className="border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 transition hover:border-neutral-500">Back</button>
      </div>
    </form>
  );
}

function ConfirmationStep({ flow }: { flow: Flow }) {
  const r = flow.result!;
  const a = flow.account!;
  return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center border border-neutral-900 text-neutral-900">
        <CheckIcon className="h-9 w-9" />
      </span>
      <h2 className="mt-4 font-serif text-2xl font-semibold text-neutral-900">Payment received</h2>
      <p className="mt-1 text-neutral-600">Thank you, {a.holderName.split(" ")[0]}. A receipt has been emailed to you.</p>
      <dl className="mx-auto mt-6 max-w-sm space-y-2 border border-neutral-200 bg-stone-50 p-5 text-left text-sm">
        <Row label="Confirmation #" value={r.confirmationNumber} />
        <Row label="Amount paid" value={formatCurrency(r.amountPaid)} />
        <Row label="Account" value={`#${a.accountNumber}`} />
        <Row label="Date" value={r.paidAt} />
        {r.enrolledAutopay && <Row label="Autopay" value="Enrolled" />}
      </dl>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={flow.reset} className="bg-neutral-900 px-5 py-3 font-semibold text-white transition hover:bg-neutral-700">Make another payment</button>
        <Link href="/" className="border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 transition hover:border-neutral-500">Return to site</Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="font-semibold text-neutral-900">{value}</dd>
    </div>
  );
}
