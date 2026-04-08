import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rules/cookies')({
  component: CookiesPage,
})

function CookiesPage() {
  const updatedAt = 'April 8, 2026'

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            PawsomeShop Legal
          </p>
          <h1 className="font-display mb-4 text-5xl font-bold">Cookie Policy</h1>
          <p className="text-slate-500">Last updated: {updatedAt}</p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">1. What are cookies?</h2>
          <p className="leading-relaxed text-slate-600">
            Cookies are small text files stored on your device when you visit our website. They
            help us remember your preferences, improve performance, and provide a smoother shopping
            experience for you and your pets.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">2. Types of cookies we use</h2>
          <ul className="space-y-3 text-slate-600">
            <li>
              <strong>Essential cookies:</strong> Required for core site functions such as cart,
              login, and checkout.
            </li>
            <li>
              <strong>Performance cookies:</strong> Help us understand usage patterns so we can
              improve site speed and usability.
            </li>
            <li>
              <strong>Functional cookies:</strong> Remember preferences such as language, region,
              and recently viewed products.
            </li>
            <li>
              <strong>Marketing cookies:</strong> Used to deliver more relevant ads and promotions.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">3. Managing your preferences</h2>
          <p className="leading-relaxed text-slate-600">
            You can control or disable cookies in your browser settings at any time. Please note
            that disabling some cookies may affect the functionality of certain features, including
            personalized recommendations and checkout flow.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="font-display mb-4 text-2xl font-bold">4. Contact us</h2>
          <p className="leading-relaxed text-slate-600">
            If you have any questions about our Cookie Policy, contact us at
            <a href="mailto:hello@pawsomeshop.com" className="ml-1 font-semibold text-emerald-600">
              hello@pawsomeshop.com
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  )
}
