import logoSrc from "../imports/logo.png"
import type { Page } from "../types"
import { QUICK_LINKS } from "../constants"
import { BtnPrimary, BtnSecondary } from "../components/ui"
import PamisaSection from "../components/PamisaSection"

const MASS_SCHEDULE = [
  { day: "Sunday",   slots: ["6:00 AM", "8:00 AM", "5:00 PM"] },
  { day: "Weekdays", slots: ["6:00 AM", "7:30 PM"] },
  { day: "Saturday", slots: ["6:00 AM", "5:00 PM"] },
]

const OFFICE_HOURS = [
  { day: "Tue – Sat", slots: ["8:00 AM – 12:00 NN", "1:30 PM – 4:00 PM"], note: "" },
  { day: "Sunday",    slots: ["5:00 AM – 7:30 AM", "3:00 PM – 6:00 PM"],  note: "At church front door" },
  { day: "Monday",    slots: ["Day off"],                                   note: "No transactions", dayOff: true },
]

export default function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="page-enter">

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">
              Diocese of Daet &nbsp;·&nbsp; Vinzons, Camarines Norte &nbsp;·&nbsp; Est. 1611
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-5">
              Parroquia de<br />San Pedro Apostol
            </h1>
            <p className="text-stone-500 text-base leading-relaxed max-w-lg mb-10">
              Request sacramental certificates, book a mass intention, or look up burial records — online, anytime. No payment gateway required.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <BtnPrimary size="lg" onClick={() => setPage("services")}>Request an Appointment</BtnPrimary>
              <BtnSecondary size="lg" onClick={() => setPage("search")}>Find a Name in Campo Santo</BtnSecondary>
            </div>
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">Mass Intention</p>
              <PamisaSection />
            </div>
          </div>
          <div className="flex-shrink-0">
            <img
              src={logoSrc}
              alt="Parish seal"
              className="w-52 h-52 object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Mass schedule + Office hours */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-6">

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900">Mass Schedule</h2>
            <p className="text-xs text-stone-400 mt-1">Holy Mass times at Parroquia de San Pedro Apostol</p>
          </div>
          <div className="divide-y divide-stone-100">
            {MASS_SCHEDULE.map(row => (
              <div key={row.day} className="flex items-center gap-6 px-6 py-4">
                <span className="text-sm font-semibold text-stone-700 w-24 flex-shrink-0">{row.day}</span>
                <div className="flex flex-wrap gap-2">
                  {row.slots.map(s => (
                    <span key={s} className="bg-amber-50 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900">Parish Office Hours</h2>
            <p className="text-xs text-stone-400 mt-1">When the parish office is open for transactions</p>
          </div>
          <div className="divide-y divide-stone-100">
            {OFFICE_HOURS.map(row => (
              <div key={row.day} className="flex items-start gap-6 px-6 py-4">
                <span className={`text-sm font-semibold w-24 flex-shrink-0 ${row.dayOff ? "text-red-500" : "text-stone-700"}`}>
                  {row.day}
                </span>
                <div>
                  {row.slots.map(s => (
                    <div key={s} className={`text-sm leading-snug ${row.dayOff ? "text-red-500 font-semibold" : "text-stone-800"}`}>{s}</div>
                  ))}
                  {row.note && (
                    <div className={`text-xs mt-1 ${row.dayOff ? "text-red-400" : "text-stone-400"}`}>{row.note}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Quick links */}
      <section className="border-t border-stone-200 bg-stone-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4 text-center">
            Quick Access
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {QUICK_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="px-4 py-2 bg-white border border-stone-200 rounded-full text-xs
                  text-stone-600 hover:border-amber-400 hover:text-amber-700 transition-colors shadow-sm"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
