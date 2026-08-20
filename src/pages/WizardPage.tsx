import { useState } from "react"
import type { Page, Step, FormData } from "../types"
import { EMPTY_FORM, generateRef } from "../types"
import { SERVICES, REMINDERS } from "../constants"
import StepNav from "../components/StepNav"
import Calendar from "../components/Calendar"
import Sidebar from "../components/Sidebar"
import { BtnPrimary, BtnSecondary, Field, Input, Select, Textarea, Card } from "../components/ui"

// ─── Step 1: Reminders ────────────────────────────────────────────────────────

function Step1({ onNext }: { onNext: () => void }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="max-w-2xl">
      <h3 className="text-base font-bold text-stone-900 mb-4">Please Read Before Proceeding</h3>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5 space-y-3">
        {REMINDERS.map((r, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
            <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-amber-400 text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
            {r}
          </div>
        ))}
      </div>

      <label className="flex items-start gap-3 cursor-pointer mb-7 select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-amber-600 cursor-pointer flex-shrink-0"
        />
        <span className="text-sm text-stone-700 font-medium leading-snug">
          I have read and understand the reminders above and wish to proceed.
        </span>
      </label>

      <div className="flex justify-end">
        <BtnPrimary onClick={onNext} disabled={!agreed}>Next: Personal Information →</BtnPrimary>
      </div>
    </div>
  )
}

// ─── Step 2: Information ──────────────────────────────────────────────────────

function Step2({ form, update, onNext, onPrev }: {
  form: FormData
  update: (k: keyof FormData, v: string) => void
  onNext: () => void
  onPrev: () => void
}) {
  const required: (keyof FormData)[] = ["lastName", "firstName", "email", "mobile", "province", "city", "barangay"]
  const valid = required.every(k => form[k].trim() !== "")

  return (
    <div className="max-w-2xl">
      <h3 className="text-base font-bold text-stone-900 mb-5">Personal & Contact Information</h3>

      <Card className="p-6 space-y-5 mb-5">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Last Name" required>
            <Input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Dela Cruz" />
          </Field>
          <Field label="First Name" required>
            <Input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Juan" />
          </Field>
          <Field label="Middle Name">
            <Input value={form.middleName} onChange={e => update("middleName", e.target.value)} placeholder="Santos" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email Address" required>
            <Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="juan@email.com" />
          </Field>
          <Field label="Mobile Number" required>
            <Input value={form.mobile} onChange={e => update("mobile", e.target.value)} placeholder="09XX XXX XXXX" />
          </Field>
        </div>

        <div className="border-t border-stone-100 pt-4">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Home Address</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Province" required>
              <Select value={form.province} onChange={e => update("province", e.target.value)}>
                <option value="">Select…</option>
                <option>Camarines Norte</option>
                <option>Camarines Sur</option>
                <option>Albay</option>
                <option>Other</option>
              </Select>
            </Field>
            <Field label="City / Municipality" required>
              <Input value={form.city} onChange={e => update("city", e.target.value)} placeholder="Vinzons" />
            </Field>
            <Field label="Barangay" required>
              <Input value={form.barangay} onChange={e => update("barangay", e.target.value)} placeholder="Poblacion" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Street / House No.">
              <Input value={form.street} onChange={e => update("street", e.target.value)} placeholder="123 Rizal St." />
            </Field>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <BtnSecondary onClick={onPrev}>← Back</BtnSecondary>
        <BtnPrimary onClick={onNext} disabled={!valid}>Next: Appointment →</BtnPrimary>
      </div>
    </div>
  )
}

// ─── Step 3: Appointment ──────────────────────────────────────────────────────

function Step3({ form, update, onNext, onPrev }: {
  form: FormData
  update: (k: keyof FormData, v: string) => void
  onNext: () => void
  onPrev: () => void
}) {
  const valid =
    form.service !== "" &&
    form.date !== "" &&
    form.timeSlot !== "" &&
    (form.paymentMethod !== "bank-transfer" || form.bankRef.trim() !== "")

  const fmtDate = (iso: string) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-PH", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    })

  return (
    <div className="max-w-2xl">
      <h3 className="text-base font-bold text-stone-900 mb-5">Appointment Details</h3>

      <Card className="p-6 space-y-6 mb-5">
        {/* Service */}
        <Field label="Certificate Type" required>
          <Select value={form.service} onChange={e => update("service", e.target.value)}>
            <option value="">Select a certificate…</option>
            {SERVICES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </Select>
        </Field>

        {/* Calendar */}
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-3">
            Preferred Date <span className="text-amber-600">*</span>
          </label>
          <Calendar value={form.date} onChange={v => update("date", v)} />
          {form.date && (
            <p className="text-xs text-amber-700 font-medium mt-2">✓ {fmtDate(form.date)}</p>
          )}
        </div>

        {/* Time slot */}
        <Field label="Preferred Time Slot" required>
          <Select value={form.timeSlot} onChange={e => update("timeSlot", e.target.value)}>
            <option value="">Select time…</option>
            <option value="Morning (8:00 AM – 12:00 PM)">Morning (8:00 AM – 12:00 PM)</option>
            <option value="Afternoon (1:00 PM – 5:00 PM)">Afternoon (1:00 PM – 5:00 PM)</option>
          </Select>
        </Field>

        {/* Payment method */}
        <div>
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-2">
            Payment Method <span className="text-amber-600">*</span>
          </label>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { value: "in-person",     label: "Pay in Person" },
              { value: "bank-transfer", label: "Bank Transfer" },
            ].map(opt => (
              <label
                key={opt.value}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                  ${form.paymentMethod === opt.value
                    ? "border-amber-500 bg-amber-50"
                    : "border-stone-200 hover:border-amber-300"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={opt.value}
                  checked={form.paymentMethod === opt.value}
                  onChange={e => update("paymentMethod", e.target.value)}
                  className="accent-amber-600"
                />
                <span className="text-sm font-medium text-stone-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bank transfer details */}
        {form.paymentMethod === "bank-transfer" && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest">Parish Bank Details</p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-amber-700">
              {[
                ["Bank", "Land Bank of the Philippines"],
                ["Account Name", "Parroquia de San Pedro Apostol"],
                ["Account No.", "0000-0000-00"],
                ["Branch", "Daet, Camarines Norte"],
              ].map(([k, v]) => (
                <>
                  <dt key={`k-${k}`} className="font-semibold">{k}</dt>
                  <dd key={`v-${k}`}>{v}</dd>
                </>
              ))}
            </dl>
            <p className="text-xs text-amber-600">Use your full name as the transfer remarks. Staff will verify manually — no live payment processing.</p>
            <Field label="Bank Transfer Reference No." required>
              <Input
                value={form.bankRef}
                onChange={e => update("bankRef", e.target.value)}
                placeholder="e.g. 2025-06-TRF-001234"
              />
            </Field>
          </div>
        )}

        {/* Remarks */}
        <Field label="Purpose / Additional Remarks">
          <Textarea
            rows={3}
            value={form.remarks}
            onChange={e => update("remarks", e.target.value)}
            placeholder="Any special notes for the parish office…"
          />
        </Field>
      </Card>

      <div className="flex justify-between">
        <BtnSecondary onClick={onPrev}>← Back</BtnSecondary>
        <BtnPrimary onClick={onNext} disabled={!valid}>Next: Review →</BtnPrimary>
      </div>
    </div>
  )
}

// ─── Step 4: Review ───────────────────────────────────────────────────────────

function Step4({ form, setStep, onNext }: {
  form: FormData
  setStep: (s: Step) => void
  onNext: () => void
}) {
  const serviceLabel = SERVICES.find(s => s.id === form.service)?.label ?? form.service
  const dateLabel = form.date
    ? new Date(form.date + "T12:00:00").toLocaleDateString("en-PH", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      })
    : "—"

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2 border-b border-stone-100 last:border-0 text-sm gap-4">
      <span className="text-stone-400 font-medium flex-shrink-0">{label}</span>
      <span className="text-stone-800 font-medium text-right">{value || "—"}</span>
    </div>
  )

  return (
    <div className="max-w-2xl">
      <h3 className="text-base font-bold text-stone-900 mb-2">Review Your Appointment</h3>
      <p className="text-sm text-stone-500 mb-5">Verify all details before submitting. Use Edit to make changes.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <Card className="p-5">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Personal Info</h4>
            <button onClick={() => setStep(2)} className="text-xs text-amber-600 hover:underline font-medium">Edit</button>
          </div>
          <Row label="Name" value={`${form.firstName} ${form.middleName} ${form.lastName}`.trim()} />
          <Row label="Email" value={form.email} />
          <Row label="Mobile" value={form.mobile} />
          <Row label="Province" value={form.province} />
          <Row label="City" value={form.city} />
          <Row label="Barangay" value={form.barangay} />
          {form.street && <Row label="Street" value={form.street} />}
        </Card>

        <Card className="p-5">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Appointment</h4>
            <button onClick={() => setStep(3)} className="text-xs text-amber-600 hover:underline font-medium">Edit</button>
          </div>
          <Row label="Service" value={serviceLabel} />
          <Row label="Date" value={dateLabel} />
          <Row label="Time" value={form.timeSlot} />
          <Row label="Payment" value={form.paymentMethod === "bank-transfer" ? "Bank Transfer" : "Pay in Person"} />
          {form.bankRef && <Row label="Bank Ref." value={form.bankRef} />}
          {form.remarks && <Row label="Remarks" value={form.remarks} />}
        </Card>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-xs text-amber-800">
        By submitting, you confirm all information is accurate. The parish office will contact you to confirm your appointment.
      </div>

      <div className="flex justify-between">
        <BtnSecondary onClick={() => setStep(3)}>← Back</BtnSecondary>
        <BtnPrimary onClick={onNext}>Submit Appointment</BtnPrimary>
      </div>
    </div>
  )
}

// ─── Step 5: Confirmation ─────────────────────────────────────────────────────

function Step5({ form, refNo, restart }: { form: FormData; refNo: string; restart: () => void }) {
  const serviceLabel = SERVICES.find(s => s.id === form.service)?.label ?? form.service

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-2xl mx-auto mb-5">
        ✓
      </div>
      <h3 className="text-xl font-bold text-stone-900 mb-2">Appointment Submitted</h3>
      <p className="text-sm text-stone-500 mb-8 leading-relaxed">
        Thank you, <strong>{form.firstName}</strong>. Your request for a <strong>{serviceLabel}</strong> has been received.
        The parish office will contact you at <strong>{form.email}</strong> or <strong>{form.mobile}</strong>.
      </p>

      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Reference Number</p>
        <p className="text-2xl font-bold text-stone-900 tracking-widest font-mono">{refNo}</p>
        <p className="text-xs text-stone-400 mt-2">Screenshot or write this down to track your appointment status.</p>
      </div>

      <Card className="p-4 text-xs text-left text-stone-600 space-y-2 mb-6">
        {[
          ["Service", serviceLabel],
          ["Date", form.date ? new Date(form.date + "T12:00:00").toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : "—"],
          ["Time", form.timeSlot],
          ["Payment", form.paymentMethod === "bank-transfer" ? "Bank Transfer" : "Pay in Person"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <span className="text-stone-400 font-medium w-20 flex-shrink-0">{k}</span>
            <span className="text-stone-700">{v}</span>
          </div>
        ))}
      </Card>

      <BtnPrimary onClick={restart}>Back to Home</BtnPrimary>
    </div>
  )
}

// ─── Wizard Shell ─────────────────────────────────────────────────────────────

export default function WizardPage({
  setPage,
  preSelectedService,
}: {
  setPage: (p: Page) => void
  preSelectedService: string
}) {
  const [step, setStep] = useState<Step>(1)
  const [form, setFormState] = useState<FormData>({ ...EMPTY_FORM, service: preSelectedService })
  const [refNo] = useState(generateRef)

  const update = (k: keyof FormData, v: string) => setFormState(f => ({ ...f, [k]: v }))
  const next = () => setStep(s => Math.min(5, s + 1) as Step)
  const prev = () => setStep(s => Math.max(1, s - 1) as Step)
  const restart = () => { setPage("home") }

  return (
    <div className="max-w-5xl mx-auto">
      <StepNav step={step} />
      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          {step === 1 && <Step1 onNext={next} />}
          {step === 2 && <Step2 form={form} update={update} onNext={next} onPrev={prev} />}
          {step === 3 && <Step3 form={form} update={update} onNext={next} onPrev={prev} />}
          {step === 4 && <Step4 form={form} setStep={setStep} onNext={next} />}
          {step === 5 && <Step5 form={form} refNo={refNo} restart={restart} />}
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
