import { useMemo, useState } from "react"

interface CalendarProps {
  value: string
  onChange: (value: string) => void
  blockedDates?: string[]
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function isAvailableDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`)
  const day = date.getDay()
  return day >= 2 && day <= 6
}

export default function Calendar({ value, onChange, blockedDates = [] }: CalendarProps) {
  const today = new Date()
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = useMemo(
    () => [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)],
    [firstWeekday, daysInMonth],
  )
  const toISO = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const canGoPrevious = cursor > new Date(today.getFullYear(), today.getMonth(), 1)

  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white w-full max-w-md">
      <div className="flex items-center justify-between p-4 bg-stone-50 border-b border-stone-200">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          disabled={!canGoPrevious}
          aria-label="Previous month"
          className="min-w-11 min-h-11 rounded-lg border border-stone-200 disabled:opacity-30"
        >
          ←
        </button>
        <strong className="text-stone-900">
          {cursor.toLocaleDateString("en-PH", { month: "long", year: "numeric" })}
        </strong>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          aria-label="Next month"
          className="min-w-11 min-h-11 rounded-lg border border-stone-200"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 border-b border-stone-100">
        {DAYS.map(day => <div key={day} className="py-3 text-center text-xs font-bold text-stone-500">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 p-3">
        {cells.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} />
          const iso = toISO(day)
          const past = new Date(year, month, day) < todayStart
          const blocked = blockedDates.includes(iso)
          const unavailable = past || !isAvailableDate(iso) || blocked
          const selected = value === iso
          return (
            <button
              type="button"
              key={iso}
              disabled={unavailable}
              onClick={() => onChange(iso)}
              aria-label={`${iso}, ${unavailable ? "unavailable" : selected ? "selected" : "available"}`}
              title={blocked ? "Unavailable due to an existing appointment or parish activity" : unavailable ? "Closed or unavailable" : "Available"}
              className={`min-h-11 rounded-lg text-sm font-semibold border ${
                selected
                  ? "bg-amber-700 text-white border-amber-700"
                  : unavailable
                    ? "bg-stone-100 text-stone-400 border-stone-100 line-through cursor-not-allowed"
                    : "bg-white text-stone-800 border-stone-200 hover:border-amber-500 hover:bg-amber-50"
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
      <div className="px-4 py-3 bg-stone-50 border-t border-stone-200 flex flex-wrap gap-4 text-xs text-stone-600">
        <span><strong>Available:</strong> bordered date</span>
        <span><strong>Unavailable:</strong> crossed out</span>
        <span><strong>Selected:</strong> gold</span>
      </div>
    </div>
  )
}
