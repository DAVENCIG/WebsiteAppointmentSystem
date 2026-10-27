import { useState } from "react"
import logoSrc from "../imports/logo.png"
import type { Page } from "../types"

const NAV: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Track", page: "status" },
  { label: "Contact", page: "contact" },
]

export default function Header({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  const [open, setOpen] = useState(false)
  const go = (next: Page) => {
    setPage(next)
    setOpen(false)
  }
  const requestActive = page === "services" || page === "wizard"

  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-xl border-b border-amber-200/70">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="flex items-center gap-3 sm:gap-5">
          <button onClick={() => go("home")} className="flex items-center gap-3 text-left rounded-xl" aria-label="Go to SARMS home">
            <img src={logoSrc} alt="" className="h-12 w-12 sm:h-14 sm:w-14 object-contain" />
            <span className="leading-tight">
              <span className="block font-display text-sm sm:text-base font-extrabold text-stone-950 tracking-wide">
                Parroquia de San Pedro Apostol
              </span>
              <span className="block text-xs font-semibold text-amber-800 mt-1">Parish Services</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1 mx-auto rounded-xl bg-white/80 border border-stone-200 p-1 shadow-sm" aria-label="Main navigation">
            {NAV.map(item => {
              const active = page === item.page
              return (
                <button
                  key={item.page}
                  onClick={() => go(item.page)}
                  aria-current={active ? "page" : undefined}
                  className={`min-h-10 px-5 rounded-lg text-sm font-bold ${
                    active ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-3 ml-auto lg:ml-0">
            <span className="hidden xl:block text-xs text-stone-500 text-right">
              Tue–Sat<br /><strong className="text-stone-800">8 AM–4 PM</strong>
            </span>
            <button
              onClick={() => go("services")}
              aria-current={requestActive ? "page" : undefined}
              className={`min-h-12 px-5 rounded-xl font-bold shadow-sm ${
                requestActive
                  ? "bg-amber-100 text-amber-950 ring-2 ring-amber-700"
                  : "bg-amber-700 text-white hover:bg-amber-800"
              }`}
            >
              Request a Service
            </button>
          </div>

          <button
            className="lg:hidden ml-auto min-h-11 min-w-16 px-3 rounded-xl border border-stone-300 bg-white text-stone-800 font-bold"
            onClick={() => setOpen(value => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 grid gap-2 shadow-xl" aria-label="Mobile navigation">
          {[...NAV, { label: "Request a Service", page: "services" as Page }].map(item => {
            const active = page === item.page || (page === "wizard" && item.page === "services")
            return (
              <button
                key={item.page}
                onClick={() => go(item.page)}
                aria-current={active ? "page" : undefined}
                className={`text-left min-h-12 px-4 rounded-xl text-base font-semibold ${
                  active ? "bg-amber-100 text-amber-950" : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      )}
    </header>
  )
}
