"use client";

import { useState } from "react";
import Link from "next/link";
import { org } from "@/lib/content";
import { CardIcon, ShieldIcon, ArrowRightIcon } from "@/components/icons";

// Light editorial payment portal — off-white, near-black, cyan accent, sharp corners.
// Payments are handled by Denmark Water's billing provider, BBI EzPay, embedded
// below. The site never sees or stores card data — BBI is the PCI-compliant
// processor of record. Swap org.ezpayUrl (lib/content.ts) for the association's
// entity-specific EzPay link once BBI confirms it.
export default function ModernLightPortal() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-700">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-serif text-sm font-semibold text-neutral-900">{org.name}</Link>
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900">← Back to site</Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          <CardIcon className="h-4 w-4" /> Pay My Bill
        </div>
        <h1 className="font-serif text-4xl font-semibold text-neutral-900">Online payment portal</h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          Pay your water bill securely below — have the account number from your most recent
          bill ready. Payments are processed by <strong className="text-neutral-900">BBI EzPay</strong>,
          our billing provider.
        </p>

        {/* New-tab fallback — always visible so a slow or blocked embed is never a dead end. */}
        <div className="mt-6 flex flex-wrap items-center gap-3 border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700">
          <ShieldIcon className="h-5 w-5 shrink-0 text-cyan-700" />
          <span className="flex-1">
            Trouble seeing the payment form below? Open the secure EzPay portal in a new tab.
          </span>
          <a
            href={org.ezpayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neutral-900 px-4 py-2 font-semibold text-white transition hover:bg-neutral-700"
          >
            Open EzPay <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Embedded BBI EzPay portal */}
        <div className="relative mt-6 overflow-hidden border border-neutral-200 bg-white">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <span className="flex items-center gap-3 text-sm text-neutral-500">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-cyan-700" />
                Loading secure payment portal…
              </span>
            </div>
          )}
          <iframe
            src={org.ezpayUrl}
            title="BBI EzPay — secure bill payment"
            onLoad={() => setLoaded(true)}
            className="h-[820px] w-full"
            allow="payment"
          />
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-neutral-400">
          <ShieldIcon className="h-4 w-4" /> Payments are securely processed by BBI EzPay.{" "}
          {org.shortName} never sees or stores your card or bank details.
        </p>
      </main>
    </div>
  );
}
