import { useState } from "react"
import { generateRef } from "../types"
import { BtnPrimary, BtnSecondary, Field, Input, Textarea } from "./ui"
import Calendar from "./Calendar"

type PamisaState = "idle" | "form" | "done"

const INTENTION_TYPES = [
  { value: "living",   label: "For the Living",   desc: "Birthday, anniversary, special occasion" },
  { value: "deceased", label: "For the Deceased",  desc: "Soul of a departed loved one" },
  { value: "special",  label: "Special Intention", desc: "Thanksgiving, healing, guidance" },
]

export default function PamisaSection() {
  const [state, setState] = useState<PamisaState>("idle")
  const [intention, setIntention] = useState("")
  const [intentionType, setIntentionType] = useState("")
  const [date, setDate] = useState("")
  const [name, setName] = useState("")
  const [refNo] = useState(generateRef)

  const valid = intention.trim() !== "" && intentionType !== ""

  const reset = () => {
    setState("idle")
    setIntention("")
    setIntentionType("")
    setDate("")
    setName("")
  }

  if (state === "done") {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">Mass Intention Submitted</h3>
        <p className="text-sm text-stone-500 mb-6">
          Your intention has been received. The parish priest will include it in the upcoming mass.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 mb-6 inline-block">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Reference No.</p>
          <p className="text-xl font-bold text-stone-900 font-mono">{refNo}</p>
        </div>
        <div className="text-sm text-stone-600 space-y-2 mb-6">
          {intentionType && <p><span className="font-medium text-stone-400">Type:</span> {INTENTION_TYPES.find(t => t.value === intentionType)?.label}</p>}
          {intention && <p><span className="font-medium text-stone-400">Intention:</span> {intention}</p>}
          {date && <p><span className="font-medium text-stone-400">Date:</span> {new Date(date + "T12:00:00").toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>}
        </div>
        <BtnSecondary onClick={reset}>Submit Another Intention</BtnSecondary>
      </div>
    )
  }

  if (state === "form") {
    return (
      <div className="bg-white border-2 border-amber-300 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-100 bg-amber-50">
          <div>
            <h3 className="font-bold text-stone-900">Book a Pamisa — Mass Intention</h3>
            <p className="text-xs text-stone-500 mt-0.5">No registration required</p>
          </div>
          <button
            onClick={() => setState("idle")}
            className="text-stone-400 hover:text-stone-700 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Intention type */}
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-3">
              Type of Intention <span className="text-amber-600">*</span>
            </label>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {INTENTION_TYPES.map(t => (
                <button
                  key={t.value}
                  onClick={() => setIntentionType(t.value)}
                  className={`text-left p-4 border-2 rounded-xl transition-all
                    ${intentionType === t.value
                      ? "border-amber-500 bg-amber-50 shadow-sm"
                      : "border-stone-200 hover:border-amber-300 bg-white"
                    }`}
                >
                  <div className={`text-sm font-semibold leading-tight ${intentionType === t.value ? "text-amber-800" : "text-stone-800"}`}>
                    {t.label}
                  </div>
                  <div className="text-xs text-stone-400 mt-1 leading-snug">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <Field label="Your Intention" required>
            <Textarea
              rows={3}
              value={intention}
              onChange={e => setIntention(e.target.value)}
              placeholder="e.g. For the soul of Juan dela Cruz… or Thanksgiving for Maria's birthday…"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-6 items-start">
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-3">
                Preferred Mass Date <span className="text-stone-400 font-normal normal-case">(optional)</span>
              </label>
              <Calendar value={date} onChange={setDate} />
              {date && (
                <p className="text-xs text-amber-700 font-semibold mt-2">
                  Selected: {new Date(date + "T12:00:00").toLocaleDateString("en-PH", { weekday: "short", month: "long", day: "numeric" })}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Field label="Your Name (optional)">
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Maria Santos"
                />
              </Field>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-500 leading-relaxed">
                <p className="font-semibold text-stone-700 mb-1.5">About Pamisa</p>
                <p>Mass intentions are offered by the parish priest during Holy Mass. A suggested stipend may be given in person at the parish office. No payment is required to submit.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-stone-100">
            <BtnSecondary onClick={() => setState("idle")}>Cancel</BtnSecondary>
            <BtnPrimary onClick={() => setState("done")} disabled={!valid}>
              Submit Intention
            </BtnPrimary>
          </div>
        </div>
      </div>
    )
  }

  // idle trigger
  return (
    <button
      onClick={() => setState("form")}
      className="w-full text-left bg-white border-2 border-dashed border-amber-300 rounded-2xl p-5
        hover:border-amber-500 hover:bg-amber-50 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors border border-amber-200">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2v20M2 12h20" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
            Book a Pamisa — Mass Intention
          </div>
          <div className="text-xs text-stone-500 mt-0.5 leading-snug">
            For the living, for the deceased, or for a special occasion. No registration required.
          </div>
        </div>
        <span className="ml-auto text-amber-500 font-bold flex-shrink-0 group-hover:translate-x-1 transition-transform text-lg">
          &rarr;
        </span>
      </div>
    </button>
  )
}
