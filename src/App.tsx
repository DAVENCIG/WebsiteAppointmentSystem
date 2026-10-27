import { useEffect, useRef, useState } from "react"
import type { Appointment, Page } from "./types"
import { SAMPLE_APPOINTMENTS } from "./constants"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import WizardPage from "./pages/WizardPage"
import StatusPage from "./pages/StatusPage"
import ContactPage from "./pages/ContactPage"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [wizardService, setWizardService] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>(SAMPLE_APPOINTMENTS)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    mainRef.current?.focus()
  }, [page])

  const goToWizard = (serviceId: string) => {
    setWizardService(serviceId)
    setPage("wizard")
    window.scrollTo({ top: 0 })
  }

  const navigate = (next: Page) => {
    setPage(next)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-stone-950 px-5 py-3 font-bold text-white shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <Header page={page} setPage={navigate} />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1">
        {page === "home" ? (
          <HomePage setPage={navigate} />
        ) : page === "about" ? (
          <AboutPage setPage={navigate} />
        ) : (
          <div className="page-canvas">
            <div className="relative w-full max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
              {page === "services" && <ServicesPage setPage={navigate} onSelect={goToWizard} />}
              {page === "wizard" && (
                <WizardPage
                  setPage={navigate}
                  preSelectedService={wizardService}
                  appointments={appointments}
                  onAppointmentSubmit={appointment =>
                    setAppointments(current => [appointment, ...current])
                  }
                />
              )}
              {page === "status" && <StatusPage appointments={appointments} />}
              {page === "contact" && <ContactPage />}
            </div>
          </div>
        )}
      </main>
      <Footer setPage={navigate} />
    </div>
  )
}
