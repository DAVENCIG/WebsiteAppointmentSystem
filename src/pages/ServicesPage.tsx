import { useState } from "react"
import type { Page } from "../types"
import { ENABLED_MASS_REQUESTS, SERVICES } from "../constants"
import { BtnPrimary, BtnSecondary, Card, PageBanner } from "../components/ui"
import StepNav from "../components/StepNav"
import ServiceIcon from "../components/ServiceIcon"

export default function ServicesPage({
  setPage,
  onSelect,
}: {
  setPage: (page: Page) => void
  onSelect: (serviceId: string) => void
}) {
  const [selected, setSelected] = useState("")
  const services = [...SERVICES, ...ENABLED_MASS_REQUESTS]
  const selectedService = services.find(service => service.id === selected)

  return (
    <div className="max-w-5xl mx-auto page-enter">
      <StepNav step={1} />
      <PageBanner
        title="Request a Service"
        subtitle="Choose the record or certification you need. You will review all information before anything is submitted."
      />

      <div className="grid sm:grid-cols-3 gap-3 mb-7" aria-label="What to expect">
        {[
          ["About 5 minutes", "Your entries stay available as you move between steps."],
          ["No online payment", "Applicable transactions are completed at the parish office."],
          ["Not automatic approval", "The parish office reviews every submitted request."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl bg-stone-100 border border-stone-200 p-4">
            <p className="font-bold text-stone-900">{title}</p>
            <p className="text-sm text-stone-600 leading-relaxed mt-1">{text}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {services.map((service, index) => {
          const active = selected === service.id
          return (
            <Card
              key={service.id}
              className={active ? "border-amber-500 ring-2 ring-amber-200 shadow-md" : "hover:border-amber-300 hover:shadow-sm"}
            >
              <button
                type="button"
                onClick={() => setSelected(service.id)}
                aria-pressed={active}
                className="w-full h-full text-left p-6 rounded-2xl"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        active ? "bg-amber-700 text-white" : "bg-amber-100 text-amber-800"
                      }`}>
                        <ServiceIcon serviceId={service.id} />
                      </span>
                      <p className="text-xs font-bold tracking-widest text-amber-700">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <h2 className="text-lg font-bold text-stone-900">{service.label}</h2>
                    <p className="text-base text-stone-600 leading-relaxed mt-2">{service.desc}</p>
                  </div>
                  <span
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      active ? "bg-amber-700 border-amber-700 text-white" : "border-stone-300"
                    }`}
                    aria-hidden="true"
                  >
                    {active ? "✓" : ""}
                  </span>
                </div>
                <p className="text-sm font-semibold text-amber-800 mt-5 pt-4 border-t border-stone-100">
                  {service.appointmentRequired ? "Preferred schedule required" : "No appointment required"}
                </p>
              </button>
            </Card>
          )
        })}
      </div>

      {ENABLED_MASS_REQUESTS.length === 0 && (
        <div className="bg-stone-100 border border-stone-200 rounded-xl p-4 mb-8 text-base text-stone-600">
          No parish-enabled Mass request types are currently available online.
        </div>
      )}

      <div className="sticky bottom-4 bg-white/95 backdrop-blur border border-stone-200 rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div aria-live="polite">
          <p className="text-sm font-bold text-stone-500">Your selection</p>
          <p className="text-lg font-bold text-stone-950 mt-1">
            {selectedService?.label ?? "Choose a service above"}
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <BtnSecondary onClick={() => setPage("home")}>Back to Home</BtnSecondary>
          <BtnPrimary onClick={() => selected && onSelect(selected)} disabled={!selected} size="lg">
            Continue to Your Information
          </BtnPrimary>
        </div>
      </div>
    </div>
  )
}
