import { OFFICE_HOURS } from "../constants"
import { Card, PageBanner } from "../components/ui"

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto page-enter">
      <PageBanner
        title="Contact the Parish Office"
        subtitle="Visit the parish office for request verification, in-person transactions, and assistance."
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-stone-900">Parish Office Hours</h2>
          <div className="divide-y divide-stone-100 mt-5">
            {OFFICE_HOURS.map(row => (
              <div key={row.day} className="py-4 first:pt-0">
                <p className="font-bold text-stone-900">{row.day}</p>
                <p className="text-base text-stone-700 mt-1">{row.hours}</p>
                {row.note && <p className="text-sm text-stone-500 mt-1">{row.note}</p>}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6 sm:p-8">
          <h2 className="text-xl font-bold text-stone-900">Visit or Get in Touch</h2>
          <div className="space-y-6 mt-5">
            <div>
              <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest">Parish</h3>
              <p className="text-base text-stone-800 mt-2">Parroquia de San Pedro Apostol</p>
              <p className="text-base text-stone-700">Vinzons, Camarines Norte</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest">Contact details</h3>
              <p className="text-base text-stone-700 mt-2">
                Verified phone, email, and social media details will be published here when supplied by the parish.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-stone-700">
              Transactions requiring payment or verification are completed in person. The parish office issues the Official Receipt for applicable transactions.
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
