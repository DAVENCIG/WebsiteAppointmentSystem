export type Page = "home" | "about" | "services" | "wizard" | "status" | "contact"
export type Step = 1 | 2 | 3 | 4 | 5

export interface FormData {
  service: string
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  birthDate: string
  address: string
  mobile: string
  email: string
  civilStatus: string
  parishZone: string
  recordName: string
  recordDate: string
  purpose: string
  preferredDate: string
  preferredTime: string
}

export const EMPTY_FORM: FormData = {
  service: "",
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  birthDate: "",
  address: "",
  mobile: "",
  email: "",
  civilStatus: "",
  parishZone: "",
  recordName: "",
  recordDate: "",
  purpose: "",
  preferredDate: "",
  preferredTime: "",
}

export function generateRef(): string {
  const now = new Date()
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("")
  return `PDSPA-${date}-${Math.floor(1000 + Math.random() * 9000)}`
}

export type AppointmentStatus =
  | "pending"
  | "verified"
  | "scheduled"
  | "rejected"
  | "completed"
  | "cancelled"

export interface Appointment {
  ref: string
  submittedAt: string
  status: AppointmentStatus
  form: FormData
  approvedDate?: string
  approvedTime?: string
  publicInstruction?: string
}
