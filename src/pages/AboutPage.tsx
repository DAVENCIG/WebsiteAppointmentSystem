import logoSrc from "../imports/logo.png"

const OFFICE_HOURS = [
  { day: "Tuesday – Saturday", slots: ["8:00 AM – 12:00 NN", "1:30 PM – 4:00 PM"], note: "" },
  { day: "Sunday",             slots: ["5:00 AM – 7:30 AM", "3:00 PM – 6:00 PM"],  note: "At the front door of the church" },
  { day: "Monday",             slots: ["Day off — No Transaction"],                  dayOff: true },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">About the Parish</h1>
        <p className="text-stone-500 mt-1">Parroquia de San Pedro Apostol · Vinzons, Camarines Norte</p>
        <div className="mt-3 h-0.5 w-12 bg-amber-500 rounded-full" />
      </div>

      {/* History */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-0">
          <div className="p-8 flex-1 space-y-4">
            <h2 className="text-lg font-bold text-stone-900">Parish History</h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              <strong className="text-stone-900">Parroquia de San Pedro Apostol</strong> is one of the oldest parishes
              in the Diocese of Daet, established in <strong>1611</strong> in Vinzons, Camarines Norte, Philippines.
              Dedicated to Saint Peter the Apostle, the parish has served generations of families with sacramental
              rites, pastoral programs, and community outreach.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              The church building is a heritage structure reflecting centuries of faith and community resilience.
              The parish maintains comprehensive sacramental records — baptismal, confirmation, matrimonial, and
              burial registries — spanning several centuries.
            </p>
          </div>
          <div className="sm:w-48 bg-amber-50 border-t sm:border-t-0 sm:border-l border-stone-200 flex items-center justify-center p-8">
            <img src={logoSrc} alt="Parish Seal" className="w-28 h-28 object-contain opacity-80" />
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-stone-200 grid grid-cols-3 divide-x divide-stone-200">
          {[
            { label: "Established", value: "1611" },
            { label: "Diocese",     value: "Diocese of Daet" },
            { label: "Location",    value: "Vinzons, CN" },
          ].map(i => (
            <div key={i.label} className="px-6 py-5 text-center">
              <div className="text-lg font-bold text-amber-700">{i.value}</div>
              <div className="text-xs text-stone-400 font-semibold uppercase tracking-wide mt-1">{i.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Office Hours + Address side by side */}
      <div className="grid sm:grid-cols-2 gap-6">

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900">Parish Office Hours</h3>
          </div>
          <div className="divide-y divide-stone-100">
            {OFFICE_HOURS.map(row => (
              <div key={row.day} className="px-6 py-4 flex items-start gap-4">
                <span className={`text-sm font-semibold w-40 flex-shrink-0 leading-snug ${row.dayOff ? "text-red-500" : "text-stone-700"}`}>
                  {row.day}
                </span>
                <div>
                  {row.slots.map(s => (
                    <div key={s} className={`text-sm ${row.dayOff ? "text-red-500 font-bold" : "text-stone-800"}`}>{s}</div>
                  ))}
                  {row.note && <div className="text-xs text-stone-400 mt-0.5">{row.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900">Location & Contact</h3>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Address</p>
              <address className="not-italic text-sm text-stone-700 leading-relaxed">
                Poblacion, Vinzons<br />
                Camarines Norte 4614<br />
                Philippines
              </address>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Phone &amp; Email</p>
              <p className="text-sm text-stone-700">(054) 000-0000</p>
              <p className="text-sm text-stone-700">parishoffice@pdspa.ph</p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Social Media</p>
              <p className="text-sm text-stone-700">Facebook: Parroquia de San Pedro Apostol</p>
            </div>
          </div>
          {/* Map placeholder */}
          <div className="border-t border-stone-200 bg-stone-50 h-40 flex items-center justify-center text-stone-400 text-sm">
            Vinzons, Camarines Norte
          </div>
        </div>

      </div>
    </div>
  )
}
