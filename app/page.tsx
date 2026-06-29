import Link from "next/link";
import {
  org,
  alertNotice,
  quickActions,
  services,
  rates,
  waterQuality,
  board,
  boardMeetings,
  faqs,
} from "@/lib/content";
import {
  DropletIcon,
  ShieldIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  WaveIcon,
  quickActionIcon,
} from "@/components/icons";

// CONCEPT 2 — "Modern Slate": dark editorial, near-black, single cyan accent, sharp corners.
export const metadata = { title: `${org.name} — Concept 2` };

const nav = [
  { label: "Services", href: "#services" },
  { label: "Rates", href: "#rates" },
  { label: "Water Quality", href: "#quality" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function ModernSlateHome() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300">
      {/* Alert banner */}
      {alertNotice.active && (
        <div className="border-b border-neutral-800 bg-neutral-900">
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-5 py-2.5 text-sm">
            <span className="mt-0.5 text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">
              {alertNotice.label}
            </span>
            <p className="text-neutral-400">{alertNotice.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-cyan-400 text-neutral-950">
              <DropletIcon className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold text-white">{org.name}</span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500">Est. {org.established}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-neutral-400 transition hover:text-cyan-400">
                {n.label}
              </a>
            ))}
          </nav>
          <Link
            href="/pay"
            className="inline-flex items-center gap-2 bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-cyan-300"
          >
            Pay My Bill <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-neutral-800">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1.3fr_1fr] md:py-28">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                <WaveIcon className="h-4 w-4" /> Serving {org.membersServed}
              </span>
              <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
                {org.tagline}
              </h1>
              <p className="mt-6 max-w-md text-lg text-neutral-400">
                Pay your bill, report a leak, or set up new service — all online, anytime.
                Serving {org.serviceArea} since {org.established}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/pay"
                  className="inline-flex items-center gap-2 bg-cyan-400 px-6 py-3.5 text-base font-semibold text-neutral-950 transition hover:bg-cyan-300"
                >
                  Pay My Bill <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border border-neutral-700 px-6 py-3.5 text-base font-semibold text-neutral-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Explore Services
                </a>
              </div>
            </div>
            <div className="border border-neutral-800 bg-neutral-900 p-7">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Account</p>
                <DropletIcon className="h-5 w-5 text-cyan-400" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-wide text-neutral-500">Current balance</p>
              <p className="font-serif text-4xl font-semibold text-white">$64.35</p>
              <dl className="mt-5 space-y-3 border-t border-neutral-800 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Due date</dt>
                  <dd className="text-neutral-200">July 20, 2026</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-500">This month</dt>
                  <dd className="text-neutral-200">7,450 gal</dd>
                </div>
              </dl>
              <Link
                href="/pay"
                className="mt-6 flex items-center justify-center gap-2 border border-cyan-400/40 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-neutral-950"
              >
                Open the portal <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-px border border-neutral-800 bg-neutral-800 md:grid-cols-3">
            {quickActions.map((a) => {
              const Icon = quickActionIcon[a.key as keyof typeof quickActionIcon];
              const href = a.href === "pay" ? "/pay" : a.href;
              return (
                <Link key={a.key} href={href} className="group bg-neutral-950 p-7 transition hover:bg-neutral-900">
                  <span className="flex h-11 w-11 items-center justify-center bg-neutral-900 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-neutral-950">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-white">{a.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{a.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400">
                    Get started <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-y border-neutral-800 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading eyebrow="What we do" title="Services for our members" />
            <div className="mt-10 grid gap-px border border-neutral-800 bg-neutral-800 md:grid-cols-2">
              {services.map((s, i) => (
                <div key={s.title} className="bg-neutral-950 p-7">
                  <span className="font-serif text-sm text-cyan-400">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rates */}
        <section id="rates" className="py-20">
          <div className="mx-auto max-w-4xl px-5">
            <SectionHeading eyebrow="Billing" title="Rates & fees" />
            <table className="mt-10 w-full border border-neutral-800 text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
                  <th className="px-5 py-3.5 font-semibold">Charge</th>
                  <th className="hidden px-5 py-3.5 font-semibold sm:table-cell">Detail</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((r) => (
                  <tr key={r.label} className="border-b border-neutral-800 last:border-0">
                    <td className="px-5 py-3.5 font-medium text-neutral-200">{r.label}</td>
                    <td className="hidden px-5 py-3.5 text-neutral-500 sm:table-cell">{r.detail}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-cyan-400">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-neutral-600">
              Rates shown are representative. Current schedules are available at the association office.
            </p>
          </div>
        </section>

        {/* Water quality */}
        <section id="quality" className="border-y border-neutral-800 bg-neutral-900 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                <ShieldIcon className="h-4 w-4" /> {waterQuality.reportYear} Consumer Confidence Report
              </span>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight text-white">{waterQuality.headline}</h2>
              <p className="mt-5 max-w-xl text-neutral-400">{waterQuality.body}</p>
              <a href="#contact" className="mt-7 inline-flex items-center gap-2 border border-cyan-400 px-6 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-neutral-950">
                Request the full report <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-px border border-neutral-800 bg-neutral-800">
              {[
                { k: "0", v: "Violations" },
                { k: "100%", v: "Standards met" },
                { k: "24/7", v: "Monitoring" },
                { k: org.established.toString(), v: "Serving since" },
              ].map((stat) => (
                <div key={stat.v} className="bg-neutral-950 p-6">
                  <p className="font-serif text-4xl font-semibold text-cyan-400">{stat.k}</p>
                  <p className="mt-1 text-sm text-neutral-500">{stat.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / Board */}
        <section id="about" className="py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
            <div>
              <SectionHeading eyebrow="About us" title="Member-owned, locally run" />
              <p className="mt-5 text-neutral-400">
                {org.name} is a member-owned, not-for-profit water system. Every dollar goes back
                into clean, reliable water for the families and businesses we serve.
              </p>
              <div className="mt-7 border border-neutral-800 bg-neutral-900 p-6">
                <p className="text-sm font-semibold text-white">Board meetings</p>
                <p className="mt-1 text-sm text-neutral-400">{boardMeetings.cadence}</p>
                <p className="text-sm text-neutral-400">{boardMeetings.location}</p>
                <p className="mt-2 text-xs text-neutral-600">{boardMeetings.note}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Board of directors</p>
              <ul className="mt-5 border border-neutral-800">
                {board.map((m) => (
                  <li key={m.name} className="flex items-center justify-between border-b border-neutral-800 px-5 py-4 last:border-0">
                    <span className="font-medium text-neutral-200">{m.name}</span>
                    <span className="text-sm text-cyan-400">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-neutral-800 bg-neutral-900 py-20">
          <div className="mx-auto max-w-4xl px-5">
            <SectionHeading eyebrow="Questions" title="Frequently asked" />
            <div className="mt-10 border-t border-neutral-800">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-neutral-800">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-5 font-serif text-lg font-medium text-white">
                    {f.q}
                    <span className="text-cyan-400 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 text-sm text-neutral-400">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHeading eyebrow="Get in touch" title="Contact the office" />
            <div className="mt-10 grid gap-px border border-neutral-800 bg-neutral-800 md:grid-cols-3">
              <ContactCard icon={<PhoneIcon className="h-5 w-5" />} label="Office phone" value={org.phone} sub={`Emergency: ${org.emergencyPhone}`} />
              <ContactCard icon={<MapPinIcon className="h-5 w-5" />} label="Office address" value={org.address} sub={org.email} />
              <ContactCard icon={<ClockIcon className="h-5 w-5" />} label="Office hours" value={org.officeHours} sub="Closed weekends & holidays" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm md:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-cyan-400 text-neutral-950">
              <DropletIcon className="h-5 w-5" />
            </span>
            <span className="font-serif font-semibold text-white">{org.name}</span>
          </div>
          <p className="text-neutral-600">© {waterQuality.reportYear} {org.name}.</p>
          <Link href="/" className="text-neutral-500 underline hover:text-cyan-400">← Back to concepts</Link>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-white">{title}</h2>
    </div>
  );
}

function ContactCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="bg-neutral-950 p-7">
      <span className="flex h-10 w-10 items-center justify-center bg-neutral-900 text-cyan-400">{icon}</span>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-sm text-neutral-500">{sub}</p>
    </div>
  );
}
