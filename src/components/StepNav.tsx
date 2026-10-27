import { WIZARD_STEPS } from "../constants"
import type { Step } from "../types"

export default function StepNav({ step }: { step: Step }) {
  return (
    <nav aria-label="Request progress" className="mb-10">
      <div className="sm:hidden bg-white border border-stone-200 rounded-2xl p-4 mb-3">
        <p className="text-sm font-bold text-amber-800">Step {step} of {WIZARD_STEPS.length}</p>
        <p className="text-lg font-bold text-stone-950 mt-1">{WIZARD_STEPS[step - 1]}</p>
      </div>
      <ol className="hidden sm:flex overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
        {WIZARD_STEPS.map((label, index) => {
          const number = (index + 1) as Step
          const done = number < step
          const active = number === step
          return (
            <li
              key={label}
              aria-current={active ? "step" : undefined}
              className={`relative flex min-w-44 flex-1 items-center gap-3 p-4 border-r border-stone-200 last:border-r-0 ${
                active ? "bg-amber-50" : ""
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                  done
                    ? "border-amber-700 bg-amber-700 text-white"
                    : active
                      ? "border-amber-700 bg-white text-amber-800"
                      : "border-stone-300 bg-white text-stone-500"
                }`}
                aria-hidden="true"
              >
                {done ? "✓" : number}
              </span>
              <span className={`text-sm font-bold leading-tight ${active ? "text-amber-950" : done ? "text-stone-700" : "text-stone-500"}`}>
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
