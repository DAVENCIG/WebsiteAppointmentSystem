import { useState } from "react"
import logoSrc from "../imports/logo.png"
import type { Page } from "../types"

const NAV: { label: string; page: Page }[] = [
  { label: "Home",         page: "home" },
  { label: "About",        page: "about" },
  { label: "Appointment",  page: "services" },
  { label: "Track Status", page: "status" },
  { label: "Campo Santo",  page: "search" },
  { label: "Contact",      page: "contact" },
]

export default function Header({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      {/* Top ribbon */}
      <div className="bg-stone-900 text-stone-300 text-[10px] font-medium tracking-wider px-6 py-1.5 hidden sm:flex items-center justify-between">
        <span>Diocese of Daet &nbsp;·&nbsp; Parish of Vinzons, Camarines Norte</span>
        <span>(054) 000-0000 &nbsp;·&nbsp; parishoffice@pdspa.ph</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center gap-5 py-3">
        {/* Logo */}
        <button
          onClick={() => { setPage("home"); setOpen(false) }}
          className="flex-shrink-0 hover:opacity-90 transition"
        >
          <img src={logoSrc} alt="Parish Seal" className="h-14 w-14 object-contain drop-shadow-sm" />
        </button>

        {/* Wordmark */}
        <button
          onClick={() => { setPage("home"); setOpen(false) }}
          className="text-left leading-tight mr-auto"
        >
          <div className="text-[15px] font-bold text-stone-900 tracking-tight">
            Parroquia de San Pedro Apostol
          </div>
          <div className="text-[11px] text-amber-700 font-semibold tracking-wide mt-0.5">
            Sacramental Records &amp; Appointment System
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map(n => (
            <button
              key={n.page}
              onClick={() => setPage(n.page)}
              className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors
                ${page === n.page
                  ? "bg-amber-100 text-amber-800 font-semibold"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current rounded transition-transform origin-center"
            style={{ transform: open ? "rotate(45deg) translateY(7px)" : "" }} />
          <span className="block w-5 h-0.5 bg-current rounded transition-opacity"
            style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-current rounded transition-transform origin-center"
            style={{ transform: open ? "rotate(-45deg) translateY(-7px)" : "" }} />
        </button>
      </div>

      {/* Gold accent line */}
      <div className="amber-rule opacity-80" />

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-3 flex flex-col gap-1 shadow-xl">
          {NAV.map(n => (
            <button
              key={n.page}
              onClick={() => { setPage(n.page); setOpen(false) }}
              className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${page === n.page
                  ? "bg-amber-50 text-amber-800 font-semibold"
                  : "text-stone-700 hover:bg-stone-50"
                }`}
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
