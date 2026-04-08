import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rules/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  const updatedAt = 'April 8, 2026'

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            PawsomeShop Legal
          </p>
          <h1 className="font-display mb-4 text-5xl font-bold">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: {updatedAt}</p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">1. Information we collect</h2>
          <p className="leading-relaxed text-slate-600">
            We may collect personal information such as your name, email, shipping address, and
            payment details when you create an account or place an order. We also collect technical
            data like browser type and device information for analytics.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">2. How we use your data</h2>
          <ul className="space-y-3 text-slate-600">
            <li>To process orders, payments, and deliveries.</li>
            <li>To provide customer support and service updates.</li>
            <li>To improve product recommendations and site performance.</li>
            <li>To send marketing emails when you opt in.</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">3. Data sharing and security</h2>
          <p className="leading-relaxed text-slate-600">
            We share data only with trusted service providers necessary for payment processing,
            shipping, and operations. We use reasonable technical and organizational safeguards to
            protect your personal information.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">4. Your rights</h2>
          <p className="leading-relaxed text-slate-600">
            You may request access, correction, or deletion of your personal information by
            contacting us at
            <a href="mailto:privacy@pawsomeshop.com" className="ml-1 font-semibold text-emerald-600">
              privacy@pawsomeshop.com
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  )
}
