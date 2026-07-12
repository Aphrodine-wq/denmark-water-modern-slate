"use client";

import Link from "next/link";
import { org, payment } from "@/lib/content";
import { CardIcon, ShieldIcon, ArrowRightIcon, PhoneIcon, MapPinIcon, ClockIcon, Logo } from "@/components/icons";

// Light editorial payment portal — off-white, near-black, cyan accent, sharp corners.
// EzPay is a standalone app that can't be deep-linked to a single association or
// cleanly embedded, so we link out to it in a new tab rather than iframe it. Fee
// disclosure + offline payment options are always shown.
export default function ModernLightPortal() {
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-700">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-serif text-sm font-semibold text-neutral-900">
            <Logo accent="#171717" className="h-7 w-7 shrink-0" />
            {org.name}
          </Link>
          <a href={`tel:${org.phone}`} className="flex items-center gap-1.5 text-sm font-semibold text-cyan-700">
            <PhoneIcon className="h-4 w-4" /> {org.phone}
          </a>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-4xl px-5 py-12">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          <CardIcon className="h-4 w-4" /> Pay My Bill
        </div>
        <h1 className="font-serif text-4xl font-semibold text-neutral-900">Online payment portal</h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          Pay securely through <strong className="text-neutral-900">BBI EzPay</strong>. Have your
          account number ready — it&apos;s on your latest bill.
        </p>

        {/* Fee disclosure — shown up front so the processor fee is never a surprise. */}
        <p className="mt-5 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Heads up:</strong> {payment.feeNote}
        </p>

        {/* Primary CTA — open EzPay in a new tab. */}
        <div className="mt-6 bg-white p-6">
          <a
            href={org.ezpayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 bg-neutral-900 px-5 py-4 text-lg font-bold text-white transition hover:bg-neutral-700"
          >
            Pay my bill with EzPay <ArrowRightIcon className="h-5 w-5" />
          </a>
          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-neutral-600">
            <ShieldIcon className="h-4 w-4 text-cyan-700" /> Opens your secure EzPay payment page in a new tab.
          </p>
        </div>

        {/* Other ways to pay — for members who don't pay online. */}
        <section className="mt-10 bg-white p-6">
          <h2 className="font-serif text-2xl font-semibold text-neutral-900">Other ways to pay</h2>
          <p className="mt-1 text-sm text-neutral-600">Don&apos;t want to pay online? You have options.</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {payment.otherWays.map((w) => (
              <li key={w.method} className="bg-stone-50 p-4">
                <p className="font-semibold text-neutral-900">{w.method}</p>
                <p className="mt-0.5 text-sm text-neutral-600">{w.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-2 pt-4 text-sm text-neutral-600 sm:grid-cols-3">
            <a href={`tel:${org.phone}`} className="flex items-center gap-2 font-semibold text-cyan-700">
              <PhoneIcon className="h-4 w-4" /> {org.phone}
            </a>
            <span className="flex items-center gap-2"><MapPinIcon className="h-4 w-4 text-neutral-400" /> {org.address}</span>
            <span className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-neutral-400" /> {org.officeHours}</span>
          </div>
        </section>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-neutral-600">
          <ShieldIcon className="h-4 w-4" /> Payments are securely processed by BBI EzPay.{" "}
          {org.shortName} never sees or stores your card or bank details.
        </p>
      </main>
    </div>
  );
}
