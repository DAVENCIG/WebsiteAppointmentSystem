import logoSrc from "../imports/logo.png"
import { QUICK_LINKS } from "../constants"

const NAV_LINKS = [
  { label: "Home",            href: "#home" },
  { label: "About the Parish", href: "#about" },
  { label: "Request Appointment", href: "#services" },
  { label: "Track Status",    href: "#status" },
  { label: "Campo Santo",     href: "#search" },
  { label: "Contact",         href: "#contact" },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-0 text-xs">
      {/* Gold rule */}
      <div className="amber-rule opacity-70" />

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logoSrc} alt="Parish Seal" className="w-12 h-12 object-contain opacity-75" />
            <div>
              <div className="text-stone-200 font-bold text-sm leading-tight">
                Parroquia de San Pedro Apostol
              </div>
              <div className="text-stone-500 text-[10px] mt-0.5">Diocese of Daet · Est. 1611</div>
            </div>
          </div>
          <p className="text-stone-500 leading-relaxed text-[11px]">
            Serving the faithful of Vinzons and its surrounding barangays since 1611. Open for transactions Tue–Sat and Sundays at the church door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-stone-300 font-bold uppercase tracking-widest text-[10px] mb-3">Navigation</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-amber-400 transition-colors leading-none">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* External links */}
        <div>
          <h4 className="text-stone-300 font-bold uppercase tracking-widest text-[10px] mb-3">Resources</h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map(l => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-amber-400 transition-colors leading-none">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-stone-300 font-bold uppercase tracking-widest text-[10px] mb-3">Contact</h4>
          <address className="not-italic space-y-2 text-stone-500 text-[11px] leading-relaxed">
            <p>Poblacion, Vinzons<br />Camarines Norte, 4614</p>
            <p>(054) 000-0000</p>
            <p>parishoffice@pdspa.ph</p>
            <div className="border-t border-stone-800 pt-2 mt-2">
              <p className="text-stone-400 font-semibold mb-1">Office Hours</p>
              <p>Tue–Sat: 8AM–12NN, 1:30–4PM</p>
              <p>Sun: 5–7:30AM, 3–6PM (church door)</p>
              <p className="text-red-400">Mon: Day off</p>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-stone-800 py-4 text-center text-stone-600 text-[10px] tracking-wider">
        © {new Date().getFullYear()} Parroquia de San Pedro Apostol &nbsp;·&nbsp; SARMS &nbsp;·&nbsp; All rights reserved
      </div>
    </footer>
  )
}
