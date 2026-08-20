export type Page = "home" | "about" | "services" | "wizard" | "status" | "search" | "contact"
export type Step = 1 | 2 | 3 | 4 | 5

export interface FormData {
  service: string
  lastName: string
  firstName: string
  middleName: string
  email: string
  province: string
  city: string
  barangay: string
  street: string
  mobile: string
  date: string
  timeSlot: string
  paymentMethod: string
  bankRef: string
  remarks: string
}

export const EMPTY_FORM: FormData = {
  service: "", lastName: "", firstName: "", middleName: "",
  email: "", province: "", city: "", barangay: "", street: "",
  mobile: "", date: "", timeSlot: "", paymentMethod: "in-person",
  bankRef: "", remarks: "",
}

export function generateRef(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, "0")
  const d = String(now.getDate()).padStart(2, "0")
  const r = Math.floor(1000 + Math.random() * 9000)
  return `PDSPA-${y}${m}${d}-${r}`
}
