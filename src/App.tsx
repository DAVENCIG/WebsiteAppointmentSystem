import { useState } from "react"
import type { Page } from "./types"

import Header    from "./components/Header"
import Footer    from "./components/Footer"
import HomePage  from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ServicesPage from "./pages/ServicesPage"
import WizardPage   from "./pages/WizardPage"
import StatusPage   from "./pages/StatusPage"
import SearchPage   from "./pages/SearchPage"
import ContactPage  from "./pages/ContactPage"

export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [wizardService, setWizardService] = useState("")

  const goToWizard = (serviceId: string) => {
    setWizardService(serviceId)
    setPage("wizard")
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header page={page} setPage={setPage} />

      <main className="flex-1">
        {page === "home" && (
          // HomePage manages its own full-width hero; no outer padding
          <HomePage setPage={setPage} />
        )}

        {page !== "home" && (
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
            {page === "about"    && <AboutPage />}
            {page === "services" && <ServicesPage setPage={setPage} onSelect={goToWizard} />}
            {page === "wizard"   && <WizardPage setPage={setPage} preSelectedService={wizardService} />}
            {page === "status"   && <StatusPage />}
            {page === "search"   && <SearchPage setPage={setPage} />}
            {page === "contact"  && <ContactPage />}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
