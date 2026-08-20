// Certificate services only — Pamisa is handled separately
export const SERVICES = [
  { id: "baptismal",     label: "Baptismal Certificate",       desc: "Copy of your baptismal record from parish archives" },
  { id: "confirmation",  label: "Confirmation Certificate",     desc: "Sacrament of confirmation record" },
  { id: "communion",     label: "First Holy Communion",         desc: "Certificate of first holy communion" },
  { id: "matrimony",     label: "Certificate of Matrimony",     desc: "Official marriage record from the parish" },
  { id: "burial",        label: "Certificate of Burial/Death",  desc: "Burial or death certificate from parish records" },
  { id: "no-record",     label: "Certificate of No Record",     desc: "Certification that no record exists in archives" },
  { id: "good-standing", label: "Certificate of Good Standing", desc: "Certify active membership in the parish" },
]

export const QUICK_LINKS = [
  { label: "PdSPA Official Facebook Page", href: "#" },
  { label: "SOCCOMM Facebook Page",        href: "#" },
  { label: "Coro de San Pedro Facebook",   href: "#" },
  { label: "Youth Ministry Facebook",      href: "#" },
  { label: "CFC – Youth for Christ",       href: "#" },
  { label: "Parish Office Contact",        href: "#" },
  { label: "Mass Schedule",               href: "#" },
]

export const WIZARD_STEPS = ["Reminders", "Information", "Appointment", "Review", "Finish"] as const

export const REMINDERS = [
  "Bring a valid government-issued ID when claiming your document at the parish office.",
  "Requests must be filed at least five (5) working days before the date needed.",
  "For records dated before 1970, availability cannot be guaranteed; an archivist will verify.",
  "The parish does not process online payments. Payment may be settled in-person or via bank transfer.",
  "One request per transaction. Submit a new form for additional documents.",
  "Ensure all information is accurate. Errors may cause delays or rejection of your request.",
  "You will receive a reference number upon submission. Keep it for status tracking.",
]

export const SAMPLE_STATUSES = [
  { ref: "PDSPA-20250612-4821", name: "Maria Santos",  status: "verified", service: "Baptismal Certificate" },
  { ref: "PDSPA-20250613-3309", name: "Jose Reyes",    status: "pending",  service: "Certificate of Matrimony" },
  { ref: "PDSPA-20250610-1177", name: "Ana Lim",       status: "done",     service: "Pamisa — Mass Intention" },
]

export const SAMPLE_BURIALS = [
  { name: "Ernesto dela Cruz",       date: "March 14, 1998",    plot: "Section A, Row 3, Plot 12", barangay: "Poblacion" },
  { name: "Remedios Santos-Reyes",   date: "July 7, 2003",      plot: "Section B, Row 1, Plot 5",  barangay: "Cagaluan" },
  { name: "Domingo Lim y Taguiam",   date: "November 22, 2011", plot: "Section C, Row 7, Plot 20", barangay: "Palanas" },
]
