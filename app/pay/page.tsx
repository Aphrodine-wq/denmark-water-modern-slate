"use client";

import { useState } from "react";
import Link from "next/link";
import { org } from "@/lib/content";
import { DEMO_ACCOUNT_NUMBER, DEMO_LAST_NAME } from "@/lib/mockAccounts";
import { usePortalFlow, formatCurrency } from "@/lib/usePortalFlow";
import { DropletIcon, CheckIcon, CardIcon, ArrowRightIcon, ShieldIcon } from "@/components/icons";

// CONCEPT 2 — "Modern Slate" payment portal mock.
export default function ModernSlatePortal() {
  const flow = usePortalFlow();
  const steps = ["Look up", "Balance", "Payment", "Done"];
  const stepIndex = flow.step === "lookup" ? 0 : flow.step === "balance" ? 1 : flow.step === "pay" ? 2 : 3;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300">
      <header className="border-b border-neutral-800">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-cyan-400 text-neutral-950">
              <DropletIcon className="h-5 w-5" />
            </span>
            <span className="font-serif text-sm font-semibold text-white">{org.name}</span>
          </Link>
          <Link href="/" className="text-sm text-neutral-500 hover:text-cyan-400">← Back to site</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
          <CardIcon className="h-4 w-4" /> Pay My Bill
        </div>
        <h1 className="font-serif text-4xl font-semibold text-white">Online payment portal</h1>

        <ol className="mt-7 flex items-center gap-2 text-xs font-medium">
          {steps.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs ${
                  i < stepIndex
                    ? "border-cyan-400 bg-cyan-400 text-neutral-950"
                    : i === stepIndex
                    ? "border-cyan-400 text-cyan-400"
                    : "border-neutral-700 text-neutral-600"
                }`}
              >
                {i < stepIndex ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden sm:block ${i <= stepIndex ? "text-neutral-300" : "text-neutral-600"}`}>{label}</span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-neutral-800" />}
            </li>
          ))}
        </ol>

        <div className="mt-7 border border-neutral-800 bg-neutral-900 p-6 md:p-8">
          {flow.step === "lookup" && <LookupStep flow={flow} />}
          {flow.step === "balance" && flow.account && <BalanceStep flow={flow} />}
          {flow.step === "pay" && flow.account && <PayStep flow={flow} />}
          {flow.step === "confirmation" && flow.result && <ConfirmationStep flow={flow} />}
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-600">
          <ShieldIcon className="h-4 w-4" /> Demo only — no real payment is processed and no card data is stored.
        </p>
      </main>
    </div>
  );
}

type Flow = ReturnType<typeof usePortalFlow>;

function fieldClass() {
  return "w-full border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-white outline-none transition focus:border-cyan-400 placeholder:text-neutral-600";
}

function LookupStep({ flow }: { flow: Flow }) {
  const [acct, setAcct] = useState("");
  const [last, setLast] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); flow.lookup(acct, last); }}>
      <h2 className="font-serif text-xl font-semibold text-white">Find your account</h2>
      <p className="mt-1 text-sm text-neutral-400">Enter the account number from your bill and the account holder&apos;s last name.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-neutral-300">Account number</span>
          <input className={`mt-1.5 ${fieldClass()}`} value={acct} onChange={(e) => setAcct(e.target.value)} placeholder="e.g. 104872" inputMode="numeric" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-neutral-300">Last name</span>
          <input className={`mt-1.5 ${fieldClass()}`} value={last} onChange={(e) => setLast(e.target.value)} placeholder="e.g. Mason" />
        </label>
      </div>
      {flow.lookupError && <p className="mt-3 border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">{flow.lookupError}</p>}
      <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-cyan-400 px-5 py-3 font-semibold text-neutral-950 transition hover:bg-cyan-300 sm:w-auto">
        Look up account <ArrowRightIcon className="h-5 w-5" />
      </button>
      <p className="mt-4 border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-400">
        Demo account — number <strong className="text-cyan-400">{DEMO_ACCOUNT_NUMBER}</strong>, last name <strong className="text-cyan-400">{DEMO_LAST_NAME}</strong>.
      </p>
    </form>
  );
}

function BalanceStep({ flow }: { flow: Flow }) {
  const a = flow.account!;
  const maxUsage = Math.max(...a.usage.map((u) => u.gallons));
  return (
    <div>
      <h2 className="font-serif text-xl font-semibold text-white">Account summary</h2>
      <div className="mt-4 border border-neutral-800 bg-neutral-950 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500">Account holder</p>
            <p className="font-semibold text-white">{a.holderName}</p>
            <p className="mt-2 text-sm text-neutral-500">Service address</p>
            <p className="text-sm text-neutral-300">{a.serviceAddress}</p>
            <p className="mt-2 text-sm text-neutral-500">Account #{a.accountNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500">Amount due</p>
            <p className="font-serif text-4xl font-semibold text-white">{formatCurrency(a.amountDue)}</p>
            <p className={`text-sm ${a.pastDue ? "font-semibold text-red-400" : "text-neutral-500"}`}>{a.pastDue ? "Past due" : `Due ${a.dueDate}`}</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-sm font-semibold text-neutral-300">Recent usage (gallons)</p>
        <div className="mt-3 flex items-end gap-3">
          {a.usage.map((u) => (
            <div key={u.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex h-28 w-full items-end">
                <div className="w-full bg-cyan-400" style={{ height: `${(u.gallons / maxUsage) * 100}%` }} />
              </div>
              <span className="text-xs text-neutral-500">{u.month}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={flow.goToPay} className="inline-flex items-center gap-2 bg-cyan-400 px-5 py-3 font-semibold text-neutral-950 transition hover:bg-cyan-300">
          Pay {formatCurrency(a.amountDue)} <ArrowRightIcon className="h-5 w-5" />
        </button>
        <button onClick={flow.reset} className="border border-neutral-700 px-5 py-3 font-semibold text-neutral-300 transition hover:border-neutral-500">
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
      <h2 className="font-serif text-xl font-semibold text-white">Payment details</h2>
      <fieldset className="mt-4">
        <legend className="text-sm font-medium text-neutral-300">Amount</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <label className={`flex cursor-pointer items-center gap-3 border px-4 py-3 ${mode === "full" ? "border-cyan-400 bg-cyan-400/10" : "border-neutral-700"}`}>
            <input type="radio" name="amt" checked={mode === "full"} onChange={() => setMode("full")} className="accent-cyan-400" />
            <span>
              <span className="block text-sm font-semibold text-white">Full balance</span>
              <span className="block text-sm text-neutral-400">{formatCurrency(a.amountDue)}</span>
            </span>
          </label>
          <label className={`flex cursor-pointer items-center gap-3 border px-4 py-3 ${mode === "other" ? "border-cyan-400 bg-cyan-400/10" : "border-neutral-700"}`}>
            <input type="radio" name="amt" checked={mode === "other"} onChange={() => setMode("other")} className="accent-cyan-400" />
            <span className="flex-1">
              <span className="block text-sm font-semibold text-white">Other amount</span>
              <input value={other} onChange={(e) => { setMode("other"); setOther(e.target.value); }} placeholder="0.00" inputMode="decimal" className="mt-1 w-28 border border-neutral-700 bg-neutral-950 px-2 py-1 text-sm text-white" />
            </span>
          </label>
        </div>
      </fieldset>
      <div className="mt-5 grid gap-4">
        <label className="block">
          <span className="text-sm font-medium text-neutral-300">Card number</span>
          <input className={`mt-1.5 ${fieldClass()}`} value={card} onChange={(e) => setCard(e.target.value)} placeholder="4242 4242 4242 4242" inputMode="numeric" />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium text-neutral-300">Expiry</span>
            <input className={`mt-1.5 ${fieldClass()}`} value={exp} onChange={(e) => setExp(e.target.value)} placeholder="MM/YY" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-neutral-300">CVC</span>
            <input className={`mt-1.5 ${fieldClass()}`} value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" inputMode="numeric" />
          </label>
        </div>
      </div>
      <label className="mt-4 flex cursor-pointer items-center gap-3 border border-neutral-800 bg-neutral-950 px-4 py-3">
        <input type="checkbox" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} className="h-4 w-4 accent-cyan-400" />
        <span className="text-sm text-neutral-300">Enroll in autopay — pay future bills automatically on the due date.</span>
      </label>
      <div className="mt-6 flex items-center justify-between bg-cyan-400 px-5 py-4 text-neutral-950">
        <span className="text-sm font-medium">Total to pay today</span>
        <span className="font-serif text-2xl font-semibold">{formatCurrency(amount)}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="submit" disabled={!canPay} className="inline-flex items-center gap-2 bg-cyan-400 px-5 py-3 font-semibold text-neutral-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-30">
          <CardIcon className="h-5 w-5" /> Submit payment
        </button>
        <button type="button" onClick={flow.backToBalance} className="border border-neutral-700 px-5 py-3 font-semibold text-neutral-300 transition hover:border-neutral-500">Back</button>
      </div>
    </form>
  );
}

function ConfirmationStep({ flow }: { flow: Flow }) {
  const r = flow.result!;
  const a = flow.account!;
  return (
    <div className="text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center border border-cyan-400 text-cyan-400">
        <CheckIcon className="h-9 w-9" />
      </span>
      <h2 className="mt-4 font-serif text-2xl font-semibold text-white">Payment received</h2>
      <p className="mt-1 text-neutral-400">Thank you, {a.holderName.split(" ")[0]}. A receipt has been emailed to you.</p>
      <dl className="mx-auto mt-6 max-w-sm space-y-2 border border-neutral-800 bg-neutral-950 p-5 text-left text-sm">
        <Row label="Confirmation #" value={r.confirmationNumber} />
        <Row label="Amount paid" value={formatCurrency(r.amountPaid)} />
        <Row label="Account" value={`#${a.accountNumber}`} />
        <Row label="Date" value={r.paidAt} />
        {r.enrolledAutopay && <Row label="Autopay" value="Enrolled" />}
      </dl>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button onClick={flow.reset} className="bg-cyan-400 px-5 py-3 font-semibold text-neutral-950 transition hover:bg-cyan-300">Make another payment</button>
        <Link href="/" className="border border-neutral-700 px-5 py-3 font-semibold text-neutral-300 transition hover:border-neutral-500">Return to site</Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="font-semibold text-white">{value}</dd>
    </div>
  );
}
