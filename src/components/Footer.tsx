import logoSrc from "../imports/logo.png"
import type { Page } from "../types"

const LINKS: { label: string; page: Page }[] = [
  { label: "About PdSPA", page: "about" },
  { label: "Request a Service", page: "services" },
  { label: "Track Your Request", page: "status" },
  { label: "Contact", page: "contact" },
]

export default function Footer({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="w-full max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <img src={logoSrc} alt="" className="w-16 h-16 object-contain" />
              <div>
                <p className="font-display font-bold text-white text-lg">Parroquia de San Pedro Apostol</p>
                <p className="text-sm text-amber-300 mt-1">Vinzons, Camarines Norte</p>
              </div>
            </div>
            <p className="font-editorial text-lg text-stone-400 leading-relaxed mt-5">
              Public sacramental request and appointment services for parishioners.
            </p>
          </div>
          <nav className="grid sm:grid-cols-2 gap-x-8 gap-y-1" aria-label="Footer navigation">
            {LINKS.map(link => (
              <button
                key={link.page}
                onClick={() => setPage(link.page)}
                className="min-h-11 text-left font-semibold hover:text-amber-300"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t border-stone-800 mt-10 pt-5 text-sm text-stone-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} PdSPA · SARMS</span>
          <span>Online submission is subject to parish office approval.</span>
        </div>
      </div>
    </footer>
  )
}
