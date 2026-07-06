"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
      <form onSubmit={submit} className="w-full max-w-sm border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Staff</p>
        <h1 className="mt-1 font-serif text-2xl font-semibold text-neutral-900">Sign in</h1>

        <label className="mt-6 block">
          <span className="text-sm font-medium text-neutral-700">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full border border-neutral-300 px-3.5 py-2.5 text-neutral-900 outline-none focus:border-neutral-900"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-medium text-neutral-700">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full border border-neutral-300 px-3.5 py-2.5 text-neutral-900 outline-none focus:border-neutral-900"
          />
        </label>

        {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-neutral-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-700 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
