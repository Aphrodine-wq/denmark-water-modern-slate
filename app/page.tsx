import Link from "next/link";
import { org, quickActions, waterQuality, rates, faqs, alertNotice as staticAlertNotice, boardMeetings, leakCheck, boilWater, conservationTips, assistance } from "@/lib/content";
import { getNotice, listDocuments } from "@/lib/staffData";
import { DatabaseNotConfiguredError } from "@/lib/db";
import {
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  DocumentIcon,
  CheckIcon,
  LeakIcon,
  ShieldIcon,
} from "@/components/icons";
import { MobileNav } from "@/components/MobileNav";

const actionHref: Record<string, string> = { pay: "/pay", leak: "/report-leak", service: "/start-stop" };

export const metadata = { title: `${org.name} — Pay your water bill online` };
export const dynamic = "force-dynamic";

const navGroups = [
  {
    label: "Services",
    items: [
      { label: "Pay My Bill", href: "/pay" },
      { label: "Report a Leak", href: "/report-leak" },
      { label: "Start / Stop Service", href: "/start-stop" },
    ],
  },
  {
    label: "Billing & Water",
    items: [
      { label: "Rates & Fees", href: "#rates" },
      { label: "Documents", href: "#documents" },
      { label: "Water Quality", href: "#quality" },
    ],
  },
];

const mobileLinks = [
  { label: "Rates", href: "#rates" },
  { label: "Documents", href: "#documents" },
  { label: "Water Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

// Light editorial theme — off-white background, near-black type, cyan accent, sharp corners.
export default async function ModernLightHome() {
  const alertNotice = await getNotice().catch((err) => {
    if (err instanceof DatabaseNotConfiguredError) return staticAlertNotice;
    throw err;
  });
  const liveDocuments = await listDocuments().catch((err) => {
    if (err instanceof DatabaseNotConfiguredError) return [];
    throw err;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-700">
      {/* Service notice */}
      {alertNotice.active && (
        <div className="bg-neutral-900 text-neutral-100">
          <div className="mx-auto flex max-w-6xl items-start gap-3 px-6 py-3.5 text-sm">
            <span className="mt-0.5 text-xs font-bold uppercase tracking-[0.15em] text-cyan-400">{alertNotice.label}</span>
            <p className="text-neutral-300">{alertNotice.message}</p>
          </div>
        </div>
      )}
      {/* Utility bar */}
      <div className="hidden bg-white md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs text-neutral-600">
          <span className="flex items-center gap-2"><MapPinIcon className="h-3.5 w-3.5" /> {org.address}</span>
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-2"><ClockIcon className="h-3.5 w-3.5" /> {org.officeHours}</span>
            <a href={`tel:${org.phone}`} className="flex items-center gap-2 font-semibold text-cyan-700"><PhoneIcon className="h-3.5 w-3.5" /> {org.phone}</a>
            <a href={`tel:${org.emergencyPhone}`} className="flex items-center gap-2 font-semibold text-neutral-900">Emergency: {org.emergencyPhone}</a>
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-stone-50/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex min-w-0 items-center">
            <img src="/dwa-logo.svg" alt={org.name} className="h-11 w-auto shrink-0 sm:h-12" />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {navGroups.map((group) => (
              <div key={group.label} className="group relative">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
                  {group.label} <ChevronDownIcon className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full z-40 w-56 translate-y-1 bg-white py-1.5 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {group.items.map((item) => (
                    <a key={item.label} href={item.href} className="block px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-stone-50 hover:text-cyan-700">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <a href="#contact" className="px-3 py-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
              Contact
            </a>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/pay"
              className="whitespace-nowrap bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-neutral-700 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Pay My Bill
            </Link>
            <Link
              href="/staff/login"
              className="hidden px-4 py-2.5 text-sm font-semibold text-neutral-600 transition hover:text-cyan-700 sm:inline-flex"
            >
              Staff Sign In
            </Link>
            <MobileNav orgShortName={org.shortName} phone={org.phone} navGroups={navGroups} />
          </div>
        </div>
      </header>

      {/* Mobile quick bar — tap-to-call + section nav (desktop gets the utility bar + full nav). */}
      <div className="bg-white lg:hidden">
        <div className="flex items-center gap-1 overflow-x-auto px-4 py-2 text-sm">
          <a href={`tel:${org.phone}`} className="flex shrink-0 items-center gap-1.5 bg-cyan-50 px-3 py-1.5 font-semibold text-cyan-800">
            <PhoneIcon className="h-4 w-4" /> Call office
          </a>
          {mobileLinks.map((n) => (
            <a key={n.label} href={n.href} className="shrink-0 px-3 py-1.5 font-medium text-neutral-600">{n.label}</a>
          ))}
        </div>
      </div>

      <main id="main">
        {/* Split hero */}
        <section className="mx-auto grid max-w-7xl items-stretch gap-0 md:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-28">
            <div className="h-1 w-14 bg-cyan-600" />
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-neutral-900 md:text-6xl">
              {org.tagline}
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/pay"
                className="inline-flex items-center gap-2.5 bg-neutral-900 px-10 py-5 text-xl font-bold text-white transition hover:bg-neutral-700"
              >
                Pay My Bill <ArrowRightIcon className="h-6 w-6" />
              </Link>
              <Link href="/report-leak" className="inline-flex items-center gap-2 bg-stone-100 px-8 py-5 text-base font-semibold text-neutral-900 transition hover:bg-stone-200">
                Report a Leak
              </Link>
            </div>
          </div>
          <div className="relative min-h-[280px] md:min-h-full">
            <img src="/images/hero.jpg" alt="Cotton field under a storm sky in rural Mississippi" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </section>

        {/* Quick actions */}
        <section id="services" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid gap-px bg-neutral-200 md:grid-cols-3">
              {quickActions.map((a) => {
                const href = actionHref[a.key] ?? "#contact";
                return (
                  <Link key={a.key} href={href} className="group flex items-center justify-between bg-white p-7 transition hover:bg-stone-50">
                    <span className="font-serif text-lg font-semibold text-neutral-900">{a.title}</span>
                    <ArrowRightIcon className="h-5 w-5 shrink-0 text-cyan-700 transition group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* About / water-quality band */}
        <section id="quality" className="">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            <div className="overflow-hidden">
              <img src="/images/band.jpg" alt="Southern magnolia, the Mississippi state flower" className="h-80 w-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Clean water, close to home</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-neutral-900">Member-owned, locally run since {org.established}</h2>
              <p className="mt-5 text-neutral-600">{waterQuality.body}</p>
              <dl className="mt-8 grid grid-cols-3 gap-6 pt-6">
                {[["0", "Violations"], ["100%", "Standards met"], [org.membersServed, "Served"]].map(([k, v]) => (
                  <div key={v}>
                    <dt className="font-serif text-3xl font-semibold text-neutral-900">{k}</dt>
                    <dd className="mt-0.5 text-sm text-neutral-600">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Rates */}
        <section id="rates" className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Billing</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-neutral-900">Rates &amp; fees</h2>
            <table className="mt-8 w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-neutral-600">
                  <th className="px-5 py-3.5 font-semibold">Charge</th>
                  <th className="hidden px-5 py-3.5 font-semibold sm:table-cell">Detail</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((r) => (
                  <tr key={r.label} className="">
                    <td className="px-5 py-3.5 font-medium text-neutral-900">{r.label}</td>
                    <td className="hidden px-5 py-3.5 text-neutral-600 sm:table-cell">{r.detail}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-cyan-700">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Documents & reports */}
        <section id="documents" className="">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Members</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-neutral-900">Documents &amp; reports</h2>
            <div className="mt-8 grid gap-px bg-neutral-200 md:grid-cols-3">
              {(liveDocuments.length > 0
                ? liveDocuments.map((d) => ({ key: String(d.id), t: d.title, s: d.category, href: d.url }))
                : [
                    { key: "ccr", t: `${waterQuality.reportYear} Water Quality Report`, s: "Consumer Confidence Report (CCR)", href: "#contact" },
                    { key: "minutes", t: "Board Meeting Minutes", s: boardMeetings.cadence, href: "#contact" },
                    { key: "rates", t: "Rate Schedule & Bylaws", s: "Current rates and association bylaws", href: "#contact" },
                  ]
              ).map((d) => (
                <a key={d.key} href={d.href} target={d.href.startsWith("#") ? undefined : "_blank"} rel={d.href.startsWith("#") ? undefined : "noopener noreferrer"} className="group flex items-start gap-4 bg-white p-7 transition hover:bg-stone-50">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-cyan-50 text-cyan-700 transition group-hover:bg-neutral-900 group-hover:text-white">
                    <DocumentIcon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-serif text-lg font-semibold text-neutral-900">{d.t}</span>
                    <span className="mt-1 block text-sm text-neutral-600">{d.s}</span>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-cyan-700">Download <ArrowRightIcon className="h-4 w-4" /></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Questions</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-neutral-900">Frequently asked</h2>
            <div className="mt-8 divide-y divide-neutral-200">
              {faqs.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-6 font-serif text-lg font-medium text-neutral-900">
                    {f.q}
                    <span className="text-cyan-700 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-6 text-sm text-neutral-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Helpful resources */}
        <section id="resources" className="">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700">Member help</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-neutral-900">Helpful for members</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="bg-white p-7">
                <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-neutral-900">
                  <LeakIcon className="h-5 w-5 text-cyan-700" /> {leakCheck.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{leakCheck.intro}</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-neutral-700 marker:font-semibold marker:text-cyan-700">
                  {leakCheck.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-neutral-600">{leakCheck.note}</p>
              </div>
              <div className="bg-white p-7">
                <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-neutral-900">
                  <ShieldIcon className="h-5 w-5 text-cyan-700" /> {boilWater.title}
                </h3>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-neutral-700 marker:font-semibold marker:text-cyan-700">
                  {boilWater.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-neutral-600">{boilWater.note}</p>
              </div>
            </div>
            <div className="mt-6 bg-white p-7">
              <h3 className="font-serif text-xl font-semibold text-neutral-900">Save water, save money</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {conservationTips.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 bg-neutral-900 p-7 text-white">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-white">
                <PhoneIcon className="h-5 w-5 text-cyan-400" /> {assistance.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-300">{assistance.body}</p>
            </div>
          </div>
        </section>

        {/* Contact + final CTA */}
        <section id="contact" className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col items-start justify-between gap-10 bg-stone-50 p-10 md:flex-row md:items-center md:p-14">
              <div>
                <h2 className="font-serif text-4xl font-semibold text-neutral-900">Ready to pay your bill?</h2>
                <p className="mt-2 max-w-sm text-neutral-600">Have your account number ready. Questions? Call the office at <a href={`tel:${org.phone}`} className="font-semibold text-cyan-700 underline-offset-2 hover:underline">{org.phone}</a>.</p>
              </div>
              <Link href="/pay" className="bg-neutral-900 px-9 py-4 text-lg font-bold text-white transition hover:bg-neutral-700">
                Pay My Bill
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm md:flex-row">
          <span className="font-serif font-semibold text-neutral-900">{org.name}</span>
          <span className="text-neutral-600">{org.address} · <a href={`tel:${org.phone}`} className="hover:text-neutral-900">{org.phone}</a></span>
          <span className="text-neutral-600">© {waterQuality.reportYear}</span>
        </div>
        <div className="mx-auto mt-4 max-w-6xl px-6 text-xs text-neutral-400">
          Photos: Matthew Nichols (cotton field, Clay County, MS) &amp; Loco Steve (magnolia, Pearl River County, MS) — Wikimedia Commons, CC BY-SA 3.0 / CC BY 3.0
        </div>
        <div className="mx-auto mt-2 max-w-6xl px-6 text-xs text-neutral-400">
          Site by{" "}
          <a href="https://waltburge.com" target="_blank" rel="noopener" className="underline-offset-2 hover:text-neutral-600 hover:underline">
            Walt Builds
          </a>
        </div>
      </footer>
    </div>
  );
}
