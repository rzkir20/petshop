import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rules/terms')({
  component: TermsPage,
})

function TermsPage() {
  const updatedAt = 'April 8, 2026'

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            PawsomeShop Legal
          </p>
          <h1 className="font-display mb-4 text-5xl font-bold">Terms of Service</h1>
          <p className="text-slate-500">Last updated: {updatedAt}</p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">1. Acceptance of terms</h2>
          <p className="leading-relaxed text-slate-600">
            By accessing and using PawsomeShop, you agree to these Terms of Service. If you do not
            agree with any part of these terms, please discontinue use of the website.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">2. Orders and payments</h2>
          <ul className="space-y-3 text-slate-600">
            <li>All orders are subject to product availability and confirmation.</li>
            <li>Prices are listed in USD and may change without prior notice.</li>
            <li>
              We reserve the right to refuse or cancel orders due to payment issues, stock
              limitations, or suspected fraud.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">3. Shipping and returns</h2>
          <p className="leading-relaxed text-slate-600">
            Shipping timelines are estimates and may vary by region. Returns are accepted according
            to our return policy. Perishable or opened pet food items may have special restrictions
            for safety and quality reasons.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">4. Limitation of liability</h2>
          <p className="leading-relaxed text-slate-600">
            PawsomeShop is not liable for indirect, incidental, or consequential damages resulting
            from the use or inability to use our services, to the extent permitted by applicable
            law.
          </p>
        </section>
      </main>
    </div>
  )
}
