import { useState, useMemo } from "react"

interface CalendarProps {
  value: string
  onChange: (iso: string) => void
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

export default function Calendar({ value, onChange }: CalendarProps) {
  const today = new Date()
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = useMemo<(number | null)[]>(() => {
    const arr: (number | null)[] = Array(firstWeekday).fill(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(d)
    return arr
  }, [firstWeekday, daysInMonth])

  const toISO = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`

  const isPast = (d: number) =>
    new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const canGoPrev =
    year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth())

  const monthLabel = cursor.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm w-full max-w-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-stone-50 border-b border-stone-200">
        <button
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          disabled={!canGoPrev}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-500
            hover:bg-stone-200 disabled:opacity-30 transition text-base font-bold"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-stone-800">{monthLabel}</span>
        <button
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-500
            hover:bg-stone-200 transition text-base font-bold"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-stone-100">
        {DAYS.map(d => (
          <div key={d} className="py-2 text-center text-xs font-semibold text-stone-400">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-0.5 p-2">
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />
          const iso = toISO(d)
          const past = isPast(d)
          const selected = value === iso

          return (
            <button
              key={iso}
              disabled={past}
              onClick={() => onChange(iso)}
              className={`
                h-9 w-full rounded-lg text-sm font-medium transition-colors
                ${selected
                  ? "bg-amber-600 text-white font-bold"
                  : past
                  ? "text-stone-300 cursor-not-allowed"
                  : "text-stone-700 hover:bg-amber-50 hover:text-amber-800"
                }
              `}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}
