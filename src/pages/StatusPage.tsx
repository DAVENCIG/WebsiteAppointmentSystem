import { useState } from "react"
import type { Appointment } from "../types"
import { SERVICES, STATUS_COPY } from "../constants"
import { BtnPrimary, Card, Field, Input, PageBanner, StatusBadge } from "../components/ui"

const normalize = (value: string) => value.toLowerCase().replace(/[\s()-]/g, "")

export default function StatusPage({ appointments }: { appointments: Appointment[] }) {
  const [ref, setRef] = useState("")
  const [contact, setContact] = useState("")
  const [result, setResult] = useState<Appointment | "not-found" | null>(null)

  const search = () => {
    const found = appointments.find(appointment => {
      const matchingRef = normalize(appointment.ref) === normalize(ref)
      const matchingContact =
        normalize(appointment.form.mobile) === normalize(contact) ||
        (!!appointment.form.email && normalize(appointment.form.email) === normalize(contact))
      return matchingRef && matchingContact
    })
    setResult(found ?? "not-found")
  }

  const appointment = result && result !== "not-found" ? result : null
  const service = appointment
    ? SERVICES.find(item => item.id === appointment.form.service)?.label ?? appointment.form.service
    : ""

  return (
    <div className="max-w-5xl mx-auto page-enter">
      <PageBanner
        title="Track Your Request"
        subtitle="Enter your tracking reference and the same contact number or email used when submitting."
      />

      <div className="grid lg:grid-cols-[1fr_0.55fr] gap-5">
        <Card className="p-5 sm:p-8 space-y-5 shadow-sm">
          <Field label="Tracking Reference" required>
            <Input
              value={ref}
              onChange={event => {
                setRef(event.target.value)
                setResult(null)
              }}
              placeholder="PDSPA-YYYYMMDD-XXXX"
              autoComplete="off"
            />
          </Field>
          <Field label="Contact Number or Email Used in the Request" required>
            <Input
              value={contact}
              onChange={event => {
                setContact(event.target.value)
                setResult(null)
              }}
              placeholder="Enter the same detail you submitted"
              autoComplete="email"
            />
          </Field>
          <BtnPrimary onClick={search} disabled={!ref.trim() || !contact.trim()}>
            Verify and View Request
          </BtnPrimary>
          {(!ref.trim() || !contact.trim()) && (
            <p role="status" className="text-sm text-stone-600">
              Enter both details to verify your request.
            </p>
          )}
          <p className="text-sm text-stone-500">
            Prototype example: <strong>PDSPA-DEMO-4821</strong> with <strong>0917 000 0000</strong>.
          </p>
        </Card>

        <aside className="rounded-2xl bg-stone-900 text-white p-6 sm:p-8">
          <p className="text-sm font-bold text-amber-300 uppercase tracking-widest">Private lookup</p>
          <h2 className="text-xl font-bold mt-3">Two details protect your request.</h2>
          <p className="text-base text-stone-300 leading-relaxed mt-3">
            A reference alone is not enough. Your contact detail must also match before request information is displayed.
          </p>
          <p className="text-sm text-stone-400 mt-6">
            No other parishioner records or internal staff notes are shown.
          </p>
        </aside>
      </div>

      {result === "not-found" && (
        <div role="alert" className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-6 text-red-900">
          We could not verify this request. Please check your details and try again.
        </div>
      )}

      {appointment && (
        <Card className="mt-6 overflow-hidden" >
          <div className="p-6 sm:p-8 border-b border-stone-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <p className="font-mono text-sm text-stone-500">{appointment.ref}</p>
              <h2 className="text-2xl font-bold text-stone-900 mt-2">{service}</h2>
              <p className="text-stone-600 mt-2">{STATUS_COPY[appointment.status]}</p>
            </div>
            <StatusBadge status={appointment.status} />
          </div>
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-stone-900 mb-4">Submitted request</h3>
            <dl className="divide-y divide-stone-100">
              {[
                ["Requester", `${appointment.form.firstName} ${appointment.form.middleName} ${appointment.form.lastName}`.replace(/\s+/g, " ").trim()],
                ["Contact number", appointment.form.mobile],
                ["Address", appointment.form.address],
                ["Name on record", appointment.form.recordName],
                ["Record date", appointment.form.recordDate || "Not provided"],
                ["Purpose / remarks", appointment.form.purpose],
                ["Submitted", new Date(appointment.submittedAt).toLocaleString("en-PH")],
                [
                  "Preferred schedule",
                  `${appointment.form.preferredDate} at ${appointment.form.preferredTime}${
                    appointment.status === "scheduled" ? "" : " (not yet approved)"
                  }`,
                ],
              ].map(([label, value]) => (
                <div key={label} className="py-3 grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-5">
                  <dt className="text-sm font-bold text-stone-500">{label}</dt>
                  <dd className="text-stone-900 break-words">{value}</dd>
                </div>
              ))}
              {appointment.status === "scheduled" && appointment.approvedDate && (
                <div className="py-4 grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-5 bg-green-50 -mx-3 px-3">
                  <dt className="text-sm font-bold text-green-800">Approved schedule</dt>
                  <dd className="text-green-950 font-bold">{appointment.approvedDate} at {appointment.approvedTime}</dd>
                </div>
              )}
            </dl>
            {appointment.status === "rejected" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-5 text-stone-800">
                {appointment.publicInstruction || "Your request requires further action. Please contact the parish office for assistance."}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
