import { useState } from "react"
import type { Appointment, FormData, Page, Step } from "../types"
import { EMPTY_FORM, generateRef } from "../types"
import { SERVICES } from "../constants"
import StepNav from "../components/StepNav"
import Calendar from "../components/Calendar"
import { BtnPrimary, BtnSecondary, Card, Field, Input, Select, Textarea } from "../components/ui"

const TIME_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "1:30 PM", "2:30 PM", "3:30 PM"]

function Actions({
  onBack,
  onContinue,
  disabled,
  disabledReason,
  continueLabel = "Continue",
}: {
  onBack: () => void
  onContinue: () => void
  disabled?: boolean
  disabledReason?: string
  continueLabel?: string
}) {
  return (
    <div className="mt-7">
      {disabled && disabledReason && (
        <p role="status" className="mb-3 text-sm text-stone-600 sm:text-right">
          {disabledReason}
        </p>
      )}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
        <BtnSecondary onClick={onBack}>Back</BtnSecondary>
        <BtnPrimary onClick={onContinue} disabled={disabled}>{continueLabel}</BtnPrimary>
      </div>
    </div>
  )
}

function RequesterStep({
  form,
  update,
  onBack,
  onContinue,
}: {
  form: FormData
  update: (key: keyof FormData, value: string) => void
  onBack: () => void
  onContinue: () => void
}) {
  const valid = form.firstName.trim() && form.lastName.trim() && form.address.trim() && form.mobile.trim()
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-stone-900">Requester Information</h1>
      <p className="text-base text-stone-600 mt-2">Enter the contact details the parish office can use to verify this request.</p>
      <Card className="p-5 sm:p-7 mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="First Name" required><Input autoComplete="given-name" value={form.firstName} onChange={e => update("firstName", e.target.value)} /></Field>
          <Field label="Middle Name"><Input autoComplete="additional-name" value={form.middleName} onChange={e => update("middleName", e.target.value)} /></Field>
          <Field label="Last Name" required><Input autoComplete="family-name" value={form.lastName} onChange={e => update("lastName", e.target.value)} /></Field>
          <Field label="Suffix"><Input value={form.suffix} onChange={e => update("suffix", e.target.value)} placeholder="Jr., Sr., III" /></Field>
        </div>
        <Field label="Complete Address" required>
          <Textarea autoComplete="street-address" rows={3} value={form.address} onChange={e => update("address", e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Contact Number" required hint="Used with your tracking reference to verify your request.">
            <Input autoComplete="tel" type="tel" inputMode="tel" value={form.mobile} onChange={e => update("mobile", e.target.value)} placeholder="09XX XXX XXXX" />
          </Field>
          <Field label="Email Address">
            <Input autoComplete="email" type="email" value={form.email} onChange={e => update("email", e.target.value)} />
          </Field>
        </div>
        <Field label="Parish Zone / Chapel">
          <Input value={form.parishZone} onChange={e => update("parishZone", e.target.value)} />
        </Field>
      </Card>
      <Actions
        onBack={onBack}
        onContinue={onContinue}
        disabled={!valid}
        disabledReason="Complete your first name, last name, address, and contact number to continue."
      />
    </div>
  )
}

function DetailsStep({
  form,
  update,
  onBack,
  onContinue,
}: {
  form: FormData
  update: (key: keyof FormData, value: string) => void
  onBack: () => void
  onContinue: () => void
}) {
  const service = SERVICES.find(item => item.id === form.service)
  const valid = form.recordName.trim() && form.purpose.trim()
  const matrimony = form.service === "matrimony"
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-stone-900">Service-Specific Information</h1>
      <p className="text-base text-stone-600 mt-2">Provide only the details needed to help locate or begin this request.</p>
      <Card className="p-5 sm:p-7 mt-6 space-y-5">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-900 font-bold">Selected service</p>
          <p className="text-lg text-stone-900 mt-1">{service?.label}</p>
        </div>
        <Field label={matrimony ? "Names on the matrimonial record" : "Name on the requested record"} required>
          <Input value={form.recordName} onChange={e => update("recordName", e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Birth Date" hint="Optional; provide when relevant to identifying the record.">
            <Input type="date" value={form.birthDate} onChange={e => update("birthDate", e.target.value)} />
          </Field>
          <Field label={service?.recordDateLabel ?? "Record date"}>
            <Input type="date" value={form.recordDate} onChange={e => update("recordDate", e.target.value)} />
          </Field>
        </div>
        {matrimony && (
          <Field label="Civil Status">
            <Select value={form.civilStatus} onChange={e => update("civilStatus", e.target.value)}>
              <option value="">Select if applicable</option>
              <option>Single</option>
              <option>Widowed</option>
              <option>Other / Prefer to discuss with the parish office</option>
            </Select>
          </Field>
        )}
        <Field label="Purpose or Remarks" required>
          <Textarea rows={4} value={form.purpose} onChange={e => update("purpose", e.target.value)} placeholder="Briefly explain why you are requesting this service." />
        </Field>
        <p className="text-sm text-stone-500">Do not enter government ID numbers or payment information.</p>
      </Card>
      <Actions
        onBack={onBack}
        onContinue={onContinue}
        disabled={!valid}
        disabledReason="Enter the name on the record and the purpose of your request to continue."
      />
    </div>
  )
}

function ScheduleStep({
  form,
  update,
  blockedDates,
  onBack,
  onContinue,
}: {
  form: FormData
  update: (key: keyof FormData, value: string) => void
  blockedDates: string[]
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-stone-900">Preferred Schedule</h1>
      <p className="text-base text-stone-600 mt-2">The calendar shows availability only and never displays other parishioners’ information.</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6 text-sm text-amber-950 font-medium">
        Your selected date and time are subject to parish office verification and final confirmation.
      </div>
      <Card className="p-5 sm:p-7 mt-5 space-y-6">
        <div>
          <p className="text-sm font-bold text-stone-700 mb-3">Select an available date <span className="text-amber-700">*</span></p>
          <Calendar blockedDates={blockedDates} value={form.preferredDate} onChange={value => {
            update("preferredDate", value)
            update("preferredTime", "")
          }} />
        </div>
        <Field label="Available Time" required>
          <Select
            value={form.preferredTime}
            onChange={e => update("preferredTime", e.target.value)}
            disabled={!form.preferredDate}
          >
            <option value="">{form.preferredDate ? "Select a time" : "Select a date first"}</option>
            {TIME_SLOTS.map(slot => <option key={slot}>{slot}</option>)}
          </Select>
        </Field>
        {form.preferredDate && TIME_SLOTS.length === 0 && (
          <p role="status" className="text-sm text-red-700">No available appointment times for this date. Please select another date.</p>
        )}
        <p className="text-sm text-stone-600">
          Calendar availability is a demonstration of the shared scheduling model. Production availability, conflicts, service duration, and closed days must come from the centralized Java API.
        </p>
      </Card>
      <Actions
        onBack={onBack}
        onContinue={onContinue}
        disabled={!form.preferredDate || !form.preferredTime}
        disabledReason="Select both an available date and time to continue."
      />
    </div>
  )
}

function ReviewStep({
  form,
  onBack,
  onEdit,
  onSubmit,
}: {
  form: FormData
  onBack: () => void
  onEdit: (step: Step) => void
  onSubmit: () => void
}) {
  const [accepted, setAccepted] = useState(false)
  const service = SERVICES.find(item => item.id === form.service)?.label
  const rows = [
    ["Requester", `${form.firstName} ${form.middleName} ${form.lastName} ${form.suffix}`.replace(/\s+/g, " ").trim()],
    ["Contact number", form.mobile],
    ["Email", form.email || "Not provided"],
    ["Address", form.address],
    ["Service", service ?? form.service],
    ["Name on record", form.recordName],
    ["Record date", form.recordDate || "Not provided"],
    ["Purpose / remarks", form.purpose],
    ["Preferred schedule", `${form.preferredDate} at ${form.preferredTime}`],
  ]
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-stone-900">Review and Submit</h1>
      <p className="text-base text-stone-600 mt-2">Check your complete request before sending it to the parish office.</p>
      <Card className="p-5 sm:p-7 mt-6">
        <div className="flex flex-wrap gap-3 justify-end mb-4">
          <BtnSecondary size="sm" onClick={() => onEdit(2)}>Edit Information</BtnSecondary>
          <BtnSecondary size="sm" onClick={() => onEdit(3)}>Edit Service Details</BtnSecondary>
        </div>
        <dl className="divide-y divide-stone-100">
          {rows.map(([label, value]) => (
            <div key={label} className="py-4 grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-5">
              <dt className="text-sm font-bold text-stone-500">{label}</dt>
              <dd className="text-base text-stone-900 break-words">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <div className="bg-stone-100 border border-stone-200 rounded-xl p-5 mt-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)} className="mt-1 w-5 h-5 accent-amber-700" />
          <span className="text-sm text-stone-700 leading-relaxed">
            I confirm that the information is accurate and acknowledge that it will be used to process and verify this parish request. Submission does not mean approval.
          </span>
        </label>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-5 text-sm text-stone-700">
        Transactions requiring payment or verification are completed in person at the parish office. The Official Receipt is issued at the parish office.
      </div>
      <Actions
        onBack={onBack}
        onContinue={onSubmit}
        disabled={!accepted}
        disabledReason="Confirm the privacy acknowledgment before submitting."
        continueLabel="Submit Request"
      />
    </div>
  )
}

function Confirmation({
  appointment,
  onTrack,
  onHome,
}: {
  appointment: Appointment
  onTrack: () => void
  onHome: () => void
}) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")
  const service = SERVICES.find(item => item.id === appointment.form.service)?.label
  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable")
      await navigator.clipboard.writeText(appointment.ref)
      setCopyStatus("copied")
    } catch {
      setCopyStatus("error")
    }
  }
  return (
    <div className="max-w-2xl mx-auto text-center page-enter">
      <div className="w-16 h-16 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-3xl font-bold mx-auto">✓</div>
      <h1 className="font-display text-3xl font-bold text-stone-900 mt-5">Request submitted successfully</h1>
      <p className="text-base text-stone-600 leading-relaxed mt-3">
        Your request is awaiting parish office review. Please save your tracking reference to check its status.
      </p>
      <Card className="p-7 mt-7 text-left">
        <p className="text-xs uppercase tracking-widest text-stone-500 font-bold">Tracking reference</p>
        <p className="text-2xl sm:text-3xl font-mono font-bold text-stone-900 break-all mt-2">{appointment.ref}</p>
        <div className="mt-4">
          <BtnSecondary onClick={copy}>{copyStatus === "copied" ? "Reference Copied" : "Copy Tracking Reference"}</BtnSecondary>
          <p aria-live="polite" className="text-sm text-stone-500 mt-2">
            {copyStatus === "copied" && "Copied to your clipboard."}
            {copyStatus === "error" && "Copy was unavailable. Select and save the reference shown above."}
          </p>
        </div>
        <dl className="grid sm:grid-cols-2 gap-5 mt-7 pt-6 border-t border-stone-200">
          <div><dt className="text-sm font-bold text-stone-500">Service</dt><dd className="mt-1 text-stone-900">{service}</dd></div>
          <div><dt className="text-sm font-bold text-stone-500">Current status</dt><dd className="mt-1 font-bold text-amber-800">Pending</dd></div>
          <div><dt className="text-sm font-bold text-stone-500">Submitted</dt><dd className="mt-1 text-stone-900">{new Date(appointment.submittedAt).toLocaleString("en-PH")}</dd></div>
          <div><dt className="text-sm font-bold text-stone-500">Preferred schedule</dt><dd className="mt-1 text-stone-900">{appointment.form.preferredDate} at {appointment.form.preferredTime}</dd></div>
        </dl>
      </Card>
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">
        <BtnPrimary onClick={onTrack}>Track Your Request</BtnPrimary>
        <BtnSecondary onClick={onHome}>Back to Home</BtnSecondary>
      </div>
    </div>
  )
}

export default function WizardPage({
  setPage,
  preSelectedService,
  appointments,
  onAppointmentSubmit,
}: {
  setPage: (page: Page) => void
  preSelectedService: string
  appointments: Appointment[]
  onAppointmentSubmit: (appointment: Appointment) => void
}) {
  const [step, setStep] = useState<Step>(2)
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM, service: preSelectedService })
  const [submitted, setSubmitted] = useState<Appointment | null>(null)
  const blockedDates = appointments
    .filter(appointment => appointment.status === "scheduled" && appointment.approvedDate)
    .map(appointment => appointment.approvedDate as string)
  const update = (key: keyof FormData, value: string) => setForm(current => ({ ...current, [key]: value }))
  const goToStep = (nextStep: Step) => {
    setStep(nextStep)
    window.scrollTo({ top: 0 })
  }
  const submit = () => {
    const appointment: Appointment = {
      ref: generateRef(),
      submittedAt: new Date().toISOString(),
      status: "pending",
      form,
    }
    onAppointmentSubmit(appointment)
    setSubmitted(appointment)
    window.scrollTo({ top: 0 })
  }

  if (submitted) {
    return <Confirmation appointment={submitted} onTrack={() => setPage("status")} onHome={() => setPage("home")} />
  }

  return (
    <div className="max-w-5xl mx-auto">
      <StepNav step={step} />
      {step === 2 && <RequesterStep form={form} update={update} onBack={() => setPage("services")} onContinue={() => goToStep(3)} />}
      {step === 3 && <DetailsStep form={form} update={update} onBack={() => goToStep(2)} onContinue={() => goToStep(4)} />}
      {step === 4 && <ScheduleStep form={form} update={update} blockedDates={blockedDates} onBack={() => goToStep(3)} onContinue={() => goToStep(5)} />}
      {step === 5 && <ReviewStep form={form} onBack={() => goToStep(4)} onEdit={goToStep} onSubmit={submit} />}
    </div>
  )
}
