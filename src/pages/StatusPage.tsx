import { useState } from "react"
import { SAMPLE_STATUSES } from "../constants"
import { BtnPrimary, Field, Input, StatusBadge } from "../components/ui"

export default function StatusPage() {
  const [ref, setRef] = useState("")
  const [contact, setContact] = useState("")
  const [result, setResult] = useState<typeof SAMPLE_STATUSES[0] | "not-found" | null>(null)

  const search = () => {
    const found = SAMPLE_STATUSES.find(s => s.ref.toLowerCase() === ref.toLowerCase().trim())
    setResult(found ?? "not-found")
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Track Your Appointment</h1>
        <p className="text-stone-500 mt-1">Enter your reference number to check the current status of your request.</p>
        <div className="mt-3 h-0.5 w-12 bg-amber-500 rounded-full" />
      </div>

      {/* Search form */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-8 space-y-5">
        <Field label="Reference Number" required>
          <Input
            value={ref}
            onChange={e => setRef(e.target.value)}
            placeholder="PDSPA-YYYYMMDD-XXXX"
          />
        </Field>
        <Field label="Email or Mobile Number" required>
          <Input
            value={contact}
            onChange={e => setContact(e.target.value)}
            placeholder="juan@email.com or 09XX XXX XXXX"
          />
        </Field>
        <BtnPrimary onClick={search} disabled={!ref.trim() || !contact.trim()}>
          Check Status
        </BtnPrimary>
      </div>

      {/* Result */}
      {result === "not-found" && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-sm text-red-700">
          No appointment found for that reference number. Please double-check or contact the parish office directly.
        </div>
      )}

      {result && result !== "not-found" && (
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-stone-100 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-stone-400 mb-1">{result.ref}</p>
              <p className="text-lg font-bold text-stone-900">{result.name}</p>
              <p className="text-sm text-stone-500 mt-0.5">{result.service}</p>
            </div>
            <StatusBadge status={result.status} />
          </div>
          <div className="px-8 py-5 text-sm text-stone-500">
            For questions or updates, contact the parish office directly at <strong className="text-stone-700">(054) 000-0000</strong> or <strong className="text-stone-700">parishoffice@pdspa.ph</strong>.
          </div>
        </div>
      )}

      <p className="text-xs text-stone-400 text-center">
        Try a sample reference:{" "}
        <button
          className="text-amber-600 hover:underline font-semibold"
          onClick={() => setRef("PDSPA-20250612-4821")}
        >
          PDSPA-20250612-4821
        </button>
      </p>
    </div>
  )
}
