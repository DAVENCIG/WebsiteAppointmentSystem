export interface Service {
  id: string
  label: string
  desc: string
  appointmentRequired: boolean
  recordDateLabel: string
}

export const SERVICES: Service[] = [
  {
    id: "baptismal",
    label: "Baptismal",
    desc: "Request a copy or certification of a baptismal record.",
    appointmentRequired: true,
    recordDateLabel: "Date of Baptism, if known",
  },
  {
    id: "confirmation",
    label: "Confirmation",
    desc: "Request a copy or certification of a confirmation record.",
    appointmentRequired: true,
    recordDateLabel: "Date of Confirmation, if known",
  },
  {
    id: "communion",
    label: "First Holy Communion",
    desc: "Request certification of a First Holy Communion record.",
    appointmentRequired: true,
    recordDateLabel: "Date of Communion, if known",
  },
  {
    id: "matrimony",
    label: "Matrimony",
    desc: "Initiate a request concerning a parish matrimonial record.",
    appointmentRequired: true,
    recordDateLabel: "Date of Matrimony, if known",
  },
  {
    id: "death",
    label: "Death Certificate",
    desc: "Request a parish certification of a death record.",
    appointmentRequired: true,
    recordDateLabel: "Date of Death, if known",
  },
  {
    id: "no-record",
    label: "No Record",
    desc: "Request certification that a searched sacramental record was not found.",
    appointmentRequired: true,
    recordDateLabel: "Approximate record date",
  },
  {
    id: "good-standing",
    label: "Good Standing / Membership",
    desc: "Request certification of parish membership or good standing.",
    appointmentRequired: true,
    recordDateLabel: "Membership start date, if known",
  },
]

// Populated from the centralized service configuration when the API is connected.
export const ENABLED_MASS_REQUESTS: Service[] = []

export const WIZARD_STEPS = [
  "Select Service",
  "Requester Information",
  "Service Details",
  "Preferred Schedule",
  "Review & Submit",
] as const

export const STATUS_COPY = {
  pending: "Your request is awaiting parish office review.",
  verified: "The parish office has verified your request.",
  scheduled: "Your appointment date and time have been confirmed.",
  rejected: "Your request was not approved. Review the shared instructions, if available.",
  completed: "Your request has been processed and completed.",
  cancelled: "This request is no longer active.",
} as const

export const OFFICE_HOURS = [
  { day: "Tuesday – Saturday", hours: "8:00 AM – 12:00 NN and 1:30 PM – 4:00 PM" },
  { day: "Sunday", hours: "5:00 AM – 7:30 AM and 3:00 PM – 6:00 PM", note: "At the church front door" },
  { day: "Monday", hours: "Closed" },
]

export const SAMPLE_APPOINTMENTS = [
  {
    ref: "PDSPA-DEMO-4821",
    submittedAt: "2025-06-12T08:30:00.000Z",
    status: "scheduled" as const,
    approvedDate: "2026-06-18",
    approvedTime: "9:00 AM",
    form: {
      service: "baptismal",
      firstName: "Maria",
      middleName: "",
      lastName: "Santos",
      suffix: "",
      birthDate: "1990-05-14",
      address: "Demonstration address, Vinzons",
      mobile: "0917 000 0000",
      email: "maria@example.com",
      civilStatus: "",
      parishZone: "",
      recordName: "Maria Santos",
      recordDate: "1990-06-10",
      purpose: "Demonstration request only",
      preferredDate: "2026-06-17",
      preferredTime: "9:00 AM",
    },
  },
]
