import type { ReactNode, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react"

// ─── Buttons ──────────────────────────────────────────────────────────────────

interface BtnProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit"
  fullWidth?: boolean
  size?: "sm" | "md" | "lg"
}

export function BtnPrimary({ children, onClick, disabled, type = "button", fullWidth, size = "md" }: BtnProps) {
  const sz = size === "lg" ? "px-7 py-3.5 text-base" : size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold
        bg-amber-700 text-white
        hover:bg-amber-800 active:bg-amber-900
        disabled:opacity-40 disabled:cursor-not-allowed
        shadow-sm hover:shadow transition-all
        ${sz} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  )
}

export function BtnSecondary({ children, onClick, disabled, type = "button", fullWidth, size = "md" }: BtnProps) {
  const sz = size === "lg" ? "px-7 py-3.5 text-base" : size === "sm" ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm"
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium
        bg-white text-stone-700 border border-stone-300
        hover:bg-stone-50 hover:border-stone-400
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-all
        ${sz} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  )
}

export function BtnGhost({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm text-amber-800 font-semibold hover:underline underline-offset-2 transition"
    >
      {children}
    </button>
  )
}

// ─── Form primitives ──────────────────────────────────────────────────────────

const baseCls =
  "w-full border border-stone-300 rounded-lg px-4 py-3 text-sm text-stone-900 bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 " +
  "transition placeholder:text-stone-400 leading-normal"

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseCls} ${props.className ?? ""}`} />
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${baseCls} cursor-pointer ${props.className ?? ""}`}>
      {children}
    </select>
  )
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${baseCls} resize-none ${props.className ?? ""}`} />
}

export function Field({ label, required, hint, children }: {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">
        {label}
        {required && <span className="text-amber-700 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-stone-400">{hint}</p>}
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-stone-200 rounded-2xl ${className}`}>
      {children}
    </div>
  )
}

// ─── Page title banner (used at top of every interior page) ───────────────────

export function PageBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 pb-6 border-b border-stone-200">
      <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
      {subtitle && <p className="text-stone-500 mt-1.5 text-sm leading-relaxed">{subtitle}</p>}
    </div>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  pending:  { label: "Pending Review", cls: "bg-amber-100 text-amber-800 border border-amber-200" },
  verified: { label: "Verified",       cls: "bg-green-100 text-green-800 border border-green-200" },
  rejected: { label: "Rejected",       cls: "bg-red-100 text-red-800 border border-red-200"   },
  done:     { label: "Completed",      cls: "bg-blue-100 text-blue-800 border border-blue-200" },
}

export function StatusBadge({ status }: { status: string }) {
  const { label, cls } = STATUS_MAP[status] ?? { label: status, cls: "bg-stone-100 text-stone-600" }
  return <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${cls}`}>{label}</span>
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function GoldDivider() {
  return <div className="amber-rule" />
}
