import communitySrc from "../imports/pdspa-community.jpg"
import type { Page } from "../types"
import { OFFICE_HOURS, SERVICES } from "../constants"
import { BtnPrimary, BtnSecondary } from "../components/ui"
import ServiceIcon from "../components/ServiceIcon"

const PROCESS = [
  ["01", "Choose a service"],
  ["02", "Complete your request"],
  ["03", "Save and track"],
]

export default function HomePage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <div className="page-enter overflow-hidden bg-stone-50">
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img src={communitySrc} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12 pb-28 sm:pb-36 pt-72">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-300">Parroquia de San Pedro Apostol</p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mt-4">
              Parish requests,
              <span className="block text-amber-300 mt-2">one clear path.</span>
            </h1>
            <p className="font-editorial text-xl sm:text-2xl italic text-stone-200 mt-6 max-w-2xl">
              Request sacramental records and follow parish office review.
            </p>
          </div>
        </div>
        <div className="hero-bottom-blur absolute inset-x-0 bottom-0 h-20 pointer-events-none" aria-hidden="true" />
      </section>

      <section className="relative z-20 w-full max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12 -mt-20">
        <div className="grid lg:grid-cols-[1fr_1fr_1.4fr] rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setPage("services")}
            className="group text-left p-6 sm:p-8 bg-amber-700 text-white hover:bg-amber-800 min-h-40"
          >
            <span className="text-sm font-bold text-amber-200">Start here</span>
            <span className="block text-2xl font-bold mt-3">Request a Service</span>
            <span className="block text-sm text-amber-100 mt-2">Certificates, certifications, and scheduling</span>
            <span className="block mt-5 font-bold group-hover:translate-x-1 transition-transform">Continue →</span>
          </button>
          <button
            type="button"
            onClick={() => setPage("status")}
            className="group text-left p-6 sm:p-8 bg-stone-900 text-white hover:bg-stone-800 min-h-40"
          >
            <span className="text-sm font-bold text-stone-400">Already submitted?</span>
            <span className="block text-2xl font-bold mt-3">Track a Request</span>
            <span className="block text-sm text-stone-300 mt-2">Use your reference and matching contact detail</span>
            <span className="block mt-5 font-bold text-amber-300 group-hover:translate-x-1 transition-transform">Check status →</span>
          </button>
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-sm font-bold text-amber-800 uppercase tracking-widest">How it works</p>
            <div className="grid sm:grid-cols-3 gap-4 mt-5">
              {PROCESS.map(([number, title]) => (
                <div key={number}>
                  <span className="text-sm font-bold text-amber-700">{number}</span>
                  <p className="font-bold text-stone-900 mt-2">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-9">
          <div>
            <p className="text-sm font-bold text-amber-800 uppercase tracking-widest">Seven categories</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-950 mt-2">Choose your service</h2>
          </div>
          <BtnSecondary onClick={() => setPage("services")}>View Service Details</BtnSecondary>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, index) => (
            <button
              type="button"
              key={service.id}
              onClick={() => setPage("services")}
              className={`group text-left bg-white border border-stone-200 rounded-2xl p-6 min-h-44 hover:border-amber-400 hover:shadow-lg hover:-translate-y-1 transition-all ${
                index === 0 ? "lg:col-span-2 bg-amber-50" : ""
              }`}
            >
              <span className="flex items-start justify-between gap-4">
                <span className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-700 group-hover:text-white transition-colors">
                  <ServiceIcon serviceId={service.id} className="w-7 h-7" />
                </span>
                <span className="text-xs font-bold text-stone-400">{String(index + 1).padStart(2, "0")}</span>
              </span>
              <span className="block text-lg font-bold text-stone-950 mt-7">{service.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-amber-50 border-y border-amber-200">
        <div className="w-full max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12 py-16 grid lg:grid-cols-[0.65fr_1.35fr] gap-10 lg:gap-16">
          <div>
            <p className="text-sm font-bold text-amber-800 uppercase tracking-widest">Plan your visit</p>
            <h2 className="font-display text-3xl font-bold text-stone-950 mt-2">Parish office hours</h2>
            <p className="text-stone-600 mt-4">Payment and verification are completed in person.</p>
            <div className="mt-6">
              <BtnPrimary onClick={() => setPage("contact")}>Contact the Parish</BtnPrimary>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {OFFICE_HOURS.map(row => (
              <div key={row.day} className="rounded-2xl bg-white border border-amber-200 p-5">
                <p className="font-bold text-stone-950">{row.day}</p>
                <p className="text-stone-600 mt-2">{row.hours}</p>
                {row.note && <p className="text-sm text-amber-800 font-semibold mt-2">{row.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
