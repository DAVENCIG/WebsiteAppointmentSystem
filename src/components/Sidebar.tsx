import { QUICK_LINKS } from "../constants"

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-52 flex-shrink-0">
      <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm sticky top-24">
        <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-200">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Quick Access</h3>
        </div>
        <ul>
          {QUICK_LINKS.map((l, i) => (
            <li key={l.label} className={i < QUICK_LINKS.length - 1 ? "border-b border-stone-100" : ""}>
              <a
                href={l.href}
                className="flex items-center gap-2 px-4 py-2.5 text-xs text-stone-600
                  hover:bg-amber-50 hover:text-amber-800 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
