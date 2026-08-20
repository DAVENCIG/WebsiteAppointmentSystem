const OFFICE_HOURS = [
  { day: "Tuesday – Saturday", slots: ["8:00 AM – 12:00 NN", "1:30 PM – 4:00 PM"], note: "" },
  { day: "Sunday",             slots: ["5:00 AM – 7:30 AM", "3:00 PM – 6:00 PM"],  note: "At the front door of the church" },
  { day: "Monday",             slots: ["Day off — No Transaction"],                  dayOff: true },
]

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Contact the Parish Office</h1>
        <p className="text-stone-500 mt-1">Reach out for inquiries about appointments, records, or sacramental services.</p>
        <div className="mt-3 h-0.5 w-12 bg-amber-500 rounded-full" />
      </div>

      {/* Office hours — full width */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-stone-100">
          <h2 className="text-base font-bold text-stone-900">Parish Office Hours</h2>
        </div>
        <div className="divide-y divide-stone-100">
          {OFFICE_HOURS.map(row => (
            <div key={row.day} className="flex items-start gap-8 px-8 py-5">
              <span className={`text-sm font-bold w-48 flex-shrink-0 ${row.dayOff ? "text-red-500" : "text-stone-800"}`}>
                {row.day}
              </span>
              <div className="flex-1">
                {row.slots.map(s => (
                  <div key={s} className={`text-sm font-medium ${row.dayOff ? "text-red-500" : "text-stone-700"}`}>{s}</div>
                ))}
                {row.note && <div className="text-xs text-stone-400 mt-1">{row.note}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address + Contact side by side */}
      <div className="grid sm:grid-cols-2 gap-6">

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-8">
          <h3 className="text-base font-bold text-stone-900 mb-5">Visit Us</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Address</p>
              <address className="not-italic text-sm text-stone-700 leading-relaxed">
                Poblacion, Vinzons<br />
                Camarines Norte 4614<br />
                Philippines
              </address>
            </div>
            <div className="bg-stone-50 rounded-xl h-36 flex items-center justify-center text-stone-400 text-sm border border-stone-200">
              Google Maps embed
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-8">
          <h3 className="text-base font-bold text-stone-900 mb-5">Get in Touch</h3>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Phone</p>
              <p className="text-sm text-stone-700">(054) 000-0000</p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Email</p>
              <p className="text-sm text-stone-700">parishoffice@pdspa.ph</p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Facebook</p>
              <a href="#" className="text-sm text-amber-700 hover:underline">Parroquia de San Pedro Apostol</a>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Instagram</p>
              <a href="#" className="text-sm text-amber-700 hover:underline">@pdspavinzons</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
