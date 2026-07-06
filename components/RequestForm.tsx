"use client";

import { useState } from "react";
import Link from "next/link";
import { org } from "@/lib/content";
import { CheckIcon, ArrowRightIcon, ShieldIcon, Logo } from "@/components/icons";

type Kind = "leak" | "service";

const copy = {
  leak: {
    eyebrow: "Report a Leak",
    title: "Report a leak or water emergency",
    intro: "Tell us what you're seeing and where. For a main break or no-water emergency, please also call us right away.",
    submit: "Submit leak report",
    done: "Leak report received",
  },
  service: {
    eyebrow: "Start / Stop Service",
    title: "Start, stop, or transfer service",
    intro: "Moving in or out of the service area? Send us the details and the office will set up your account.",
    submit: "Submit request",
    done: "Request received",
  },
} as const;

function field() {
  return "w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-neutral-900 outline-none transition focus:border-neutral-900 placeholder:text-neutral-400";
}

export default function RequestForm({ kind }: { kind: Kind }) {
  const c = copy[kind];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("Start service");
  const [ref, setRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim() && phone.trim() && address.trim();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          name,
          phone,
          address,
          requestType: kind === "service" ? type : undefined,
          details,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't submit your request — please call the office instead.");
        return;
      }
      setRef(data.reference);
    } catch {
      setError("Couldn't reach the server — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-700">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-serif text-base font-semibold text-neutral-900">
            <Logo accent="#171717" className="h-7 w-7 shrink-0" />
            {org.name}
          </Link>
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900">← Back to site</Link>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-2xl px-5 py-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">{c.eyebrow}</p>
        <h1 className="mt-1 font-serif text-4xl font-semibold text-neutral-900">{c.title}</h1>

        <div className="mt-6 border border-neutral-200 bg-white p-6 md:p-8">
          {ref ? (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center border border-neutral-900 text-neutral-900">
                <CheckIcon className="h-9 w-9" />
              </span>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-neutral-900">{c.done}</h2>
              <p className="mt-1 text-neutral-600">Thanks, {name.split(" ")[0]}. The office will follow up within one business day.</p>
              <p className="mt-4 inline-block bg-stone-100 px-4 py-2 text-sm">Reference <strong className="text-neutral-900">{ref}</strong></p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/" className="bg-neutral-900 px-5 py-3 font-semibold text-white transition hover:bg-neutral-700">Return to site</Link>
                <Link href="/pay" className="border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 transition hover:border-neutral-500">Pay My Bill</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="text-sm text-neutral-600">{c.intro}</p>
              <div className="mt-5 grid gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-neutral-700">Full name</span>
                  <input className={`mt-1.5 ${field()}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-neutral-700">Phone</span>
                    <input className={`mt-1.5 ${field()}`} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(601) 555-0000" inputMode="tel" required />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-neutral-700">Service address</span>
                    <input className={`mt-1.5 ${field()}`} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 County Road" required />
                  </label>
                </div>

                {kind === "service" && (
                  <label className="block">
                    <span className="text-sm font-medium text-neutral-700">Request type</span>
                    <select className={`mt-1.5 ${field()}`} value={type} onChange={(e) => setType(e.target.value)}>
                      <option>Start service</option>
                      <option>Stop service</option>
                      <option>Transfer service</option>
                    </select>
                  </label>
                )}

                <label className="block">
                  <span className="text-sm font-medium text-neutral-700">{kind === "leak" ? "What are you seeing?" : "Anything else we should know?"}</span>
                  <textarea className={`mt-1.5 ${field()} min-h-24`} value={details} onChange={(e) => setDetails(e.target.value)} placeholder={kind === "leak" ? "Water pooling near the meter, low pressure, etc." : "Move-in date, account number, etc."} />
                </label>
              </div>

              {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

              <button type="submit" disabled={!canSubmit || submitting} className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-neutral-900 px-6 py-3.5 text-base font-bold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto">
                {submitting ? "Submitting…" : c.submit} <ArrowRightIcon className="h-5 w-5" />
              </button>
            </form>
          )}
        </div>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-600">
          <ShieldIcon className="h-4 w-4" /> Goes straight to the office — you'll get a call back within one business day.
        </p>
      </main>
    </div>
  );
}
