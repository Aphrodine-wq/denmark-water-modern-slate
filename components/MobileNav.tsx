"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo, MenuIcon, CloseIcon, PhoneIcon, ArrowRightIcon } from "@/components/icons";

interface NavGroup {
  label: string;
  items: { label: string; href: string }[];
}

export function MobileNav({
  orgShortName,
  phone,
  navGroups,
}: {
  orgShortName: string;
  phone: string;
  navGroups: NavGroup[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-10 w-10 shrink-0 items-center justify-center text-neutral-700 lg:hidden"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-neutral-900/40"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col bg-stone-50 shadow-xl">
            <div className="flex items-center justify-between px-5 py-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 font-serif text-lg font-semibold text-neutral-900"
              >
                <Logo accent="#171717" className="h-8 w-8 shrink-0" />
                {orgShortName}
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center text-neutral-600"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 pb-6">
              <Link
                href="/pay"
                onClick={() => setOpen(false)}
                className="mb-5 flex items-center justify-center gap-2 bg-neutral-900 px-5 py-3.5 text-base font-bold text-white"
              >
                Pay My Bill <ArrowRightIcon className="h-4 w-4" />
              </Link>

              {navGroups.map((group) => (
                <div key={group.label} className="mb-5">
                  <p className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500">
                    {group.label}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block px-3 py-2.5 text-base font-medium text-neutral-800 hover:bg-stone-100"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mb-5 space-y-1">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-base font-medium text-neutral-800 hover:bg-stone-100"
                >
                  Contact
                </a>
                <Link
                  href="/staff/login"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-base font-medium text-neutral-800 hover:bg-stone-100"
                >
                  Staff Sign In
                </Link>
              </div>

              <a href={`tel:${phone}`} className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-cyan-700">
                <PhoneIcon className="h-4 w-4" /> {phone}
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
