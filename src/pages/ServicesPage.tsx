import { useState } from "react"
import type { Page } from "../types"
import { SERVICES } from "../constants"
import { BtnPrimary } from "../components/ui"
import PamisaSection from "../components/PamisaSection"

export default function ServicesPage({ setPage, onSelect }: {
  setPage: (p: Page) => void
  onSelect: (serviceId: string) => void
}) {
  const [selected, setSelected] = useState("")

  const proceed = () => {
    if (!selected) return
    onSelect(selected)
    setPage("wizard")
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10 page-enter">

      {/* Certificate section */}
      <section>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-900">Request a Certificate</h1>
          <p className="text-stone-500 text-sm mt-1.5 leading-relaxed">
            Select the certificate you need. The 5-step process takes about 3 minutes.
          </p>
          <div className="h-1 w-10 rounded-full bg-amber-500 mt-3" />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICES.map(s => {
            const active = selected === s.id
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`text-left border-2 rounded-2xl p-4 transition-all bg-white
                  ${active
                    ? "border-amber-500 bg-amber-50 shadow-md"
                    : "border-stone-200 hover:border-amber-300 hover:shadow-sm"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold leading-tight ${active ? "text-amber-800" : "text-stone-800"}`}>
                      {s.label}
                    </div>
                    <div className="text-xs text-stone-400 mt-1 leading-snug">{s.desc}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors
                    ${active ? "border-amber-500 bg-amber-500" : "border-stone-300"}`}
                  >
                    {active && (
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button onClick={() => setPage("home")} className="text-sm text-stone-400 hover:text-stone-700 transition-colors">
            &larr; Back
          </button>
          <BtnPrimary onClick={proceed} disabled={!selected} size="lg">
            Continue &rarr;
          </BtnPrimary>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 text-xs text-stone-400">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="uppercase tracking-widest font-bold">or</span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* Pamisa */}
      <section>
        <PamisaSection />
      </section>

    </div>
  )
}
