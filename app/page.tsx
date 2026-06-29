import Link from "next/link";
import { org, quickActions, waterQuality } from "@/lib/content";
import {
  DropletIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  quickActionIcon,
} from "@/components/icons";

export const metadata = { title: `${org.name} — Pay your water bill online` };

const nav = [
  { label: "Pay Bill", href: "/pay" },
  { label: "Services", href: "#services" },
  { label: "Water Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

// Light editorial theme — off-white background, near-black type, cyan accent, sharp corners.
export default function ModernLightHome() {
  return (
    <div className="min-h-screen bg-stone-50 text-neutral-700">
      {/* Utility bar */}
      <div className="hidden border-b border-neutral-200 bg-white md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs text-neutral-500">
          <span className="flex items-center gap-2"><MapPinIcon className="h-3.5 w-3.5" /> {org.address}</span>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-2"><ClockIcon className="h-3.5 w-3.5" /> {org.officeHours}</span>
            <a href={`tel:${org.phone}`} className="flex items-center gap-2 font-semibold text-cyan-700"><PhoneIcon className="h-3.5 w-3.5" /> {org.phone}</a>
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-neutral-900 text-white">
              <DropletIcon className="h-5 w-5" />
            </span>
            <span className="font-serif text-lg font-semibold text-neutral-900">{org.name}</span>
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
                {n.label}
              </a>
            ))}
          </nav>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2 bg-neutral-900 px-6 py-3 text-base font-bold text-white transition hover:bg-neutral-700"
          >
            Pay My Bill <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </header>

      <main>
        {/* Split hero */}
        <section className="mx-auto grid max-w-7xl items-stretch gap-0 md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Serving our community since {org.established}</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-neutral-900 md:text-6xl">
              {org.tagline}
            </h1>
            <p className="mt-6 max-w-md text-lg text-neutral-600">
              Pay your water bill online in under a minute — no account to create, no trip to the office.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/pay"
                className="inline-flex items-center gap-2.5 bg-neutral-900 px-10 py-5 text-xl font-bold text-white transition hover:bg-neutral-700"
              >
                Pay My Bill <ArrowRightIcon className="h-6 w-6" />
              </Link>
              <a href="#contact" className="inline-flex items-center gap-2 border border-neutral-300 px-8 py-5 text-base font-semibold text-neutral-900 transition hover:border-neutral-900">
                Report a Leak
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px] md:min-h-full">
            <img src="/images/hero.jpg" alt="Piney woods in morning fog" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </section>

        {/* Quick actions */}
        <section id="services" className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">
              {quickActions.map((a) => {
                const Icon = quickActionIcon[a.key as keyof typeof quickActionIcon];
                const href = a.href === "pay" ? "/pay" : "#contact";
                return (
                  <Link key={a.key} href={href} className="group flex items-start gap-4 bg-white p-7 transition hover:bg-stone-50">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-cyan-50 text-cyan-700 transition group-hover:bg-neutral-900 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-serif text-lg font-semibold text-neutral-900">{a.title}</span>
                      <span className="mt-1 block text-sm text-neutral-500">{a.desc}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* About / water-quality band */}
        <section id="quality" className="border-t border-neutral-200">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            <div className="overflow-hidden">
              <img src="/images/band.jpg" alt="Sunlight through the canopy" className="h-80 w-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Clean water, close to home</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-neutral-900">Member-owned, locally run since {org.established}</h2>
              <p className="mt-5 text-neutral-600">{waterQuality.body}</p>
              <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-neutral-200 pt-6">
                {[["0", "Violations"], ["100%", "Standards met"], [org.membersServed, "Served"]].map(([k, v]) => (
                  <div key={v}>
                    <dt className="font-serif text-3xl font-semibold text-neutral-900">{k}</dt>
                    <dd className="mt-0.5 text-sm text-neutral-500">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Contact + final CTA */}
        <section id="contact" className="border-t border-neutral-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col items-start justify-between gap-10 border border-neutral-900 bg-stone-50 p-10 md:flex-row md:items-center md:p-14">
              <div>
                <h2 className="font-serif text-4xl font-semibold text-neutral-900">Ready to pay your bill?</h2>
                <p className="mt-2 max-w-sm text-neutral-600">It takes about a minute. Questions? Call the office at {org.phone}.</p>
              </div>
              <Link href="/pay" className="inline-flex items-center gap-2.5 bg-neutral-900 px-10 py-5 text-xl font-bold text-white transition hover:bg-neutral-700">
                Pay My Bill <ArrowRightIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm md:flex-row">
          <span className="font-serif font-semibold text-neutral-900">{org.name}</span>
          <span className="text-neutral-500">{org.address} · {org.phone}</span>
          <span className="text-neutral-400">© {waterQuality.reportYear}</span>
        </div>
      </footer>
    </div>
  );
}
