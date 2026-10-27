import logoSrc from "../imports/logo.png"
import interiorSrc from "../imports/pdspa-interior.jpg"
import { OFFICE_HOURS } from "../constants"
import type { Page } from "../types"
import { BtnPrimary, BtnSecondary, Card } from "../components/ui"

const PAGE_LINKS = [
  ["parish-story", "Parish story"],
  ["office-hours", "Office hours"],
  ["visit", "Visit the parish"],
]

export default function AboutPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <div className="page-enter bg-stone-50">
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <img src={interiorSrc} alt="" className="absolute inset-0 w-full h-full object-cover object-bottom" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/15 to-amber-950/5" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12 pb-28 sm:pb-36 pt-72">
          <div className="max-w-4xl text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-300">Inside the parish church</p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mt-4">
              About Parroquia de San Pedro Apostol
            </h1>
            <p className="font-editorial text-lg sm:text-2xl italic text-stone-200 mt-4">Vinzons, Camarines Norte</p>
          </div>
        </div>
        <div className="hero-bottom-blur absolute inset-x-0 bottom-0 h-20 pointer-events-none" aria-hidden="true" />
      </section>

      <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 -mt-20">
        <nav aria-label="On this page" className="sticky top-20 z-20 bg-white/95 backdrop-blur border border-stone-200 rounded-2xl shadow-xl p-2 flex gap-2 overflow-x-auto">
          {PAGE_LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="min-h-11 whitespace-nowrap px-4 rounded-xl inline-flex items-center font-semibold text-stone-700 hover:bg-amber-100 hover:text-amber-950"
            >
              {label}
            </a>
          ))}
        </nav>

        <section id="parish-story" className="scroll-mt-40 py-12">
          <div className="grid lg:grid-cols-[1fr_0.4fr] gap-6">
            <Card className="p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-amber-800">Our parish</p>
              <h2 className="font-display text-3xl font-bold text-stone-950 mt-2">A community rooted in faith</h2>
              <div className="font-editorial space-y-4 mt-6 text-lg text-stone-700 leading-relaxed">
                <p>
                  <strong className="text-stone-950">Parroquia de San Pedro Apostol</strong> is one of the oldest parishes
                  in the Diocese of Daet, established in <strong>1611</strong> in Vinzons, Camarines Norte.
                </p>
                <p>
                  Dedicated to Saint Peter the Apostle, the parish has served generations through sacramental rites,
                  pastoral programs, and community outreach.
                </p>
                <p>
                  Its heritage church and sacramental records reflect centuries of faith and community life.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 bg-amber-50 border-amber-200 flex flex-col items-center justify-center text-center">
              <img src={logoSrc} alt="Parroquia de San Pedro Apostol seal" className="w-32 h-32 object-contain" />
              <dl className="w-full divide-y divide-amber-200 mt-6">
                <div className="py-4">
                  <dt className="text-sm font-bold text-stone-500">Established</dt>
                  <dd className="font-display text-2xl font-bold text-amber-800 mt-1">1611</dd>
                </div>
                <div className="py-4">
                  <dt className="text-sm font-bold text-stone-500">Diocese</dt>
                  <dd className="font-bold text-stone-900 mt-1">Diocese of Daet</dd>
                </div>
              </dl>
            </Card>
          </div>
        </section>

        <section id="office-hours" className="scroll-mt-40 pb-12">
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-800">Plan ahead</p>
            <h2 className="font-display text-3xl font-bold text-stone-950 mt-2">Parish office hours</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {OFFICE_HOURS.map(row => {
              const closed = row.day === "Monday"
              return (
                <Card key={row.day} className={`p-6 ${closed ? "bg-stone-100" : ""}`}>
                  <p className="font-bold text-stone-950">{row.day}</p>
                  <p className={`text-base leading-relaxed mt-3 ${closed ? "text-red-700 font-bold" : "text-stone-700"}`}>
                    {row.hours}
                  </p>
                  {row.note && <p className="text-sm text-amber-800 font-semibold mt-2">{row.note}</p>}
                </Card>
              )
            })}
          </div>
        </section>

        <section id="visit" className="scroll-mt-40 pb-12">
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center rounded-3xl bg-stone-900 text-white p-7 sm:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-amber-300">Visit the parish</p>
              <h2 className="font-display text-3xl font-bold mt-2">Poblacion, Vinzons</h2>
              <address className="not-italic text-stone-300 leading-relaxed mt-3">
                Camarines Norte 4614<br />
                Philippines
              </address>
              <p className="text-sm text-stone-400 mt-4">
                Verified phone, email, and social details will be published when supplied by the parish.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <BtnPrimary onClick={() => setPage("services")}>Request a Service</BtnPrimary>
              <BtnSecondary onClick={() => setPage("contact")}>Contact Information</BtnSecondary>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
