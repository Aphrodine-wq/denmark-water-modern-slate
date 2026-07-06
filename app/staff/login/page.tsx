"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { org } from "@/lib/content";
import { Logo } from "@/components/icons";

export default function StaffLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't sign in.");
        return;
      }
      router.push("/staff/dashboard");
      router.refresh();
    } catch {
      setError("Couldn't reach the server — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-5">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2.5 font-serif text-lg font-semibold text-neutral-900"
        >
          <Logo accent="#171717" className="h-8 w-8 shrink-0" />
          {org.shortName}
        </Link>

        <form onSubmit={submit} className="bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Staff portal</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold text-neutral-900">Sign in</h1>

          <label className="mt-6 block">
            <span className="text-sm font-medium text-neutral-700">Email</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full bg-stone-100 px-3.5 py-2.5 text-neutral-900 outline-none transition focus:ring-2 focus:ring-cyan-200"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-neutral-700">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full bg-stone-100 px-3.5 py-2.5 text-neutral-900 outline-none transition focus:ring-2 focus:ring-cyan-200"
            />
          </label>

          {error && (
            <p className="mt-4 border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-neutral-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-700 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-5 block text-center text-sm font-medium text-neutral-600 transition hover:text-cyan-700"
        >
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
