import { WIZARD_STEPS } from "../constants"
import type { Step } from "../types"

export default function StepNav({ step }: { step: Step }) {
  return (
    <nav className="flex items-start w-full mb-10 overflow-x-auto pb-1">
      {WIZARD_STEPS.map((label, i) => {
        const num = (i + 1) as Step
        const done = num < step
        const active = num === step

        return (
          <div key={label} className="flex items-center flex-1 min-w-0 last:flex-none">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 shadow-sm transition-all
                  ${done   ? "bg-amber-600 border-amber-600 text-white shadow-amber-200"
                  : active ? "bg-white border-amber-500 text-amber-600 shadow-amber-100"
                  :          "bg-white border-stone-200 text-stone-400"}`}
              >
                {done ? "✓" : num}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:block text-center leading-tight max-w-[60px]
                  ${done ? "text-amber-700" : active ? "text-amber-600" : "text-stone-400"}`}
              >
                {label}
              </span>
            </div>

            {i < WIZARD_STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-6 rounded-full transition-colors ${done ? "bg-amber-400" : "bg-stone-200"}`} />
            )}
          </div>
        )
      })}
    </nav>
  )
}
