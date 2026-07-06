"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ServiceRequest, RequestStatus, DocumentRow, Notice } from "@/lib/staffData";

const STATUS_LABEL: Record<RequestStatus, string> = {
  new: "New",
  in_progress: "In progress",
  done: "Done",
};

const TABS = [
  { key: "notice", label: "Service notice" },
  { key: "requests", label: "Requests" },
  { key: "documents", label: "Documents" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export default function StaffDashboardClient({
  staffName,
  initialNotice,
  initialRequests,
  initialDocuments,
}: {
  staffName: string;
  initialNotice: Notice;
  initialRequests: ServiceRequest[];
  initialDocuments: DocumentRow[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("notice");
  const [requests, setRequests] = useState(initialRequests);
  const [notice, setNotice] = useState(initialNotice);
  const [documents, setDocuments] = useState(initialDocuments);
  const [savingNotice, setSavingNotice] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: "", category: "General", url: "" });
  const [addingDoc, setAddingDoc] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/staff/logout", { method: "POST" });
    router.push("/staff/login");
    router.refresh();
  }

  async function setStatus(id: number, status: RequestStatus) {
    setError(null);
    const res = await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Couldn't update status.");
      return;
    }
    setRequests((prev) => prev.map((r) => (r.id === id ? data.request : r)));
  }

  async function saveNotice() {
    setSavingNotice(true);
    setError(null);
    try {
      const res = await fetch("/api/notice", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notice),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't save the notice.");
        return;
      }
      setNotice(data.notice);
    } finally {
      setSavingNotice(false);
    }
  }

  async function addDocument(e: React.FormEvent) {
    e.preventDefault();
    if (!newDoc.title.trim() || !newDoc.url.trim()) return;
    setAddingDoc(true);
    setError(null);
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoc),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't add the document.");
        return;
      }
      setDocuments((prev) => [data.document, ...prev]);
      setNewDoc({ title: "", category: "General", url: "" });
    } finally {
      setAddingDoc(false);
    }
  }

  async function removeDocument(id: number) {
    setError(null);
    const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Couldn't remove the document.");
      return;
    }
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      <header className="bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">Denmark Water Association</p>
            <h1 className="font-serif text-xl font-semibold text-stone-900">Staff dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-600">Signed in as <strong>{staffName}</strong></span>
            <button onClick={logout} className="bg-stone-200 px-3 py-1.5 text-sm font-semibold text-stone-700 hover:bg-stone-300">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl items-start gap-8 px-6 py-10">
        <aside className="w-52 shrink-0">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`block w-full px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:bg-white/60 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 space-y-10">
        {error && <p className="bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

        {/* Service notice */}
        {activeTab === "notice" && (
        <section className="bg-white p-6">
          <h2 className="font-serif text-lg font-semibold text-stone-900">Service notice banner</h2>
          <p className="mt-1 text-sm text-stone-500">Controls the banner at the top of the public site.</p>
          <label className="mt-4 flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={notice.active} onChange={(e) => setNotice({ ...notice, active: e.target.checked })} />
            Show banner on the public site
          </label>
          <div className="mt-3 grid gap-3 sm:grid-cols-[200px_1fr]">
            <input
              value={notice.label}
              onChange={(e) => setNotice({ ...notice, label: e.target.value })}
              placeholder="Label (e.g. Service Notice)"
              className="bg-stone-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-stone-300"
            />
            <input
              value={notice.message}
              onChange={(e) => setNotice({ ...notice, message: e.target.value })}
              placeholder="Message"
              className="bg-stone-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-stone-300"
            />
          </div>
          <button
            onClick={saveNotice}
            disabled={savingNotice}
            className="mt-4 bg-stone-900 px-4 py-2 text-sm font-bold text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {savingNotice ? "Saving…" : "Save notice"}
          </button>
        </section>
        )}

        {/* Requests */}
        {activeTab === "requests" && (
        <section className="bg-white p-6">
          <h2 className="font-serif text-lg font-semibold text-stone-900">Leak & service requests</h2>
          <p className="mt-1 text-sm text-stone-500">Submitted from the public Report-a-Leak and Start/Stop Service forms.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                <tr>
                  <th className="py-2 pr-4">Ref</th>
                  <th className="py-2 pr-4">Kind</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Phone</th>
                  <th className="py-2 pr-4">Address</th>
                  <th className="py-2 pr-4">Details</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="">
                {requests.length === 0 && (
                  <tr><td colSpan={7} className="py-6 text-center text-stone-400">No requests yet.</td></tr>
                )}
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td className="py-2.5 pr-4 font-mono text-xs">{r.reference}</td>
                    <td className="py-2.5 pr-4 capitalize">{r.kind}</td>
                    <td className="py-2.5 pr-4">{r.name}</td>
                    <td className="py-2.5 pr-4">{r.phone}</td>
                    <td className="py-2.5 pr-4">{r.address}</td>
                    <td className="max-w-[220px] truncate py-2.5 pr-4" title={r.details ?? ""}>{r.details || "—"}</td>
                    <td className="py-2.5 pr-4">
                      <select
                        value={r.status}
                        onChange={(e) => setStatus(r.id, e.target.value as RequestStatus)}
                        className="bg-stone-100 px-2 py-1 text-xs font-semibold"
                      >
                        {(Object.keys(STATUS_LABEL) as RequestStatus[]).map((s) => (
                          <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        )}

        {/* Documents */}
        {activeTab === "documents" && (
        <section className="bg-white p-6">
          <h2 className="font-serif text-lg font-semibold text-stone-900">Water quality & board documents</h2>
          <p className="mt-1 text-sm text-stone-500">Shown on the public site's Documents section — CCR, rate schedule, board minutes, etc.</p>

          <form onSubmit={addDocument} className="mt-4 grid gap-2 sm:grid-cols-[1fr_140px_1fr_auto]">
            <input
              value={newDoc.title}
              onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
              placeholder="Title (e.g. 2026 CCR)"
              className="bg-stone-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-stone-300"
            />
            <input
              value={newDoc.category}
              onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
              placeholder="Category"
              className="bg-stone-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-stone-300"
            />
            <input
              value={newDoc.url}
              onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
              placeholder="Link to PDF"
              className="bg-stone-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-stone-300"
            />
            <button type="submit" disabled={addingDoc} className="bg-stone-900 px-4 py-2 text-sm font-bold text-white hover:bg-stone-700 disabled:opacity-50">
              Add
            </button>
          </form>

          <ul className="mt-4">
            {documents.length === 0 && <li className="py-3 text-sm text-stone-400">No documents yet.</li>}
            {documents.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <div>
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-stone-900 underline underline-offset-2">{d.title}</a>
                  <span className="ml-2 text-xs text-stone-500">{d.category}</span>
                </div>
                <button onClick={() => removeDocument(d.id)} className="text-xs font-semibold text-red-600 hover:underline">Remove</button>
              </li>
            ))}
          </ul>
        </section>
        )}
        </main>
      </div>
    </div>
  );
}
