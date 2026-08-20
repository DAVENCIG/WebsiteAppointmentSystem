import { useState } from "react"
import type { Page } from "../types"
import { SAMPLE_BURIALS } from "../constants"
import { BtnPrimary, Field, Input } from "../components/ui"

export default function SearchPage({ setPage }: { setPage: (p: Page) => void }) {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [results, setResults] = useState<typeof SAMPLE_BURIALS | null>(null)

  const search = () => {
    setResults(
      SAMPLE_BURIALS.filter(b =>
        b.name.toLowerCase().includes(name.toLowerCase()) ||
        (year && b.date.includes(year))
      )
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Campo Santo — Burial Records</h1>
        <p className="text-stone-500 mt-1">Search the parish cemetery registry by name or year of burial.</p>
        <div className="mt-3 h-0.5 w-12 bg-amber-500 rounded-full" />
      </div>

      {/* Search form */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-8">
        <div className="grid sm:grid-cols-3 gap-5 mb-6">
          <div className="sm:col-span-2">
            <Field label="Deceased Name">
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Last name, First name"
              />
            </Field>
          </div>
          <Field label="Approximate Year">
            <Input
              value={year}
              onChange={e => setYear(e.target.value)}
              placeholder="e.g. 1998"
            />
          </Field>
        </div>
        <BtnPrimary onClick={search} disabled={!name.trim() && !year.trim()}>
          Search Records
        </BtnPrimary>
      </div>

      {/* Results */}
      {results !== null && (
        results.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
            No records found. For older records (pre-1970), please contact the parish office directly.
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-stone-400 font-medium">
              {results.length} record{results.length > 1 ? "s" : ""} found
            </p>
            {results.map((r, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-base font-bold text-stone-900 mb-3">{r.name}</p>
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <dt className="text-stone-400 font-medium">Date of Burial</dt>
                      <dd className="text-stone-700">{r.date}</dd>
                      <dt className="text-stone-400 font-medium">Plot / Section</dt>
                      <dd className="text-stone-700">{r.plot}</dd>
                      <dt className="text-stone-400 font-medium">Barangay</dt>
                      <dd className="text-stone-700">{r.barangay}</dd>
                    </dl>
                  </div>
                  <button
                    onClick={() => setPage("services")}
                    className="flex-shrink-0 text-sm text-amber-700 font-semibold hover:underline underline-offset-2 transition whitespace-nowrap"
                  >
                    Request Assistance →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
