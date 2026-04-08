import { createFileRoute } from '@tanstack/react-router'

import { Clock3, MapPin, ShieldCheck, Truck } from 'lucide-react'

export const Route = createFileRoute('/shipping')({
  component: ShippingPage,
})

function ShippingPage() {
  const methods = [
    {
      title: 'Standard Shipping',
      eta: '3-5 business days',
      fee: '$5.00',
      detail: 'Reliable delivery for everyday orders across most regions.',
    },
    {
      title: 'Express Shipping',
      eta: '1-2 business days',
      fee: '$12.00',
      detail: 'Priority handling for urgent pet essentials.',
    },
    {
      title: 'Free Shipping',
      eta: '3-7 business days',
      fee: '$0.00',
      detail: 'Available for orders above $75 (eligible locations only).',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            Delivery & Logistics
          </p>
          <h1 className="font-display mb-4 text-5xl font-bold">
            Shipping Information
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Everything you need to know about shipping timelines, fees, and
            delivery coverage for your pet essentials.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-full xl:container space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3">
              <Truck className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="font-display mb-2 text-xl font-bold">
              Fast Dispatch
            </h2>
            <p className="text-slate-600">
              Orders before 2 PM are usually packed and shipped the same day.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3">
              <MapPin className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="font-display mb-2 text-xl font-bold">
              Coverage Areas
            </h2>
            <p className="text-slate-600">
              We currently ship nationwide, with selected remote areas requiring
              extra time.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="font-display mb-2 text-xl font-bold">
              Safe Packaging
            </h2>
            <p className="text-slate-600">
              Products are packed carefully to keep food and accessories secure
              in transit.
            </p>
          </article>
        </section>

        <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10">
          <h2 className="font-display mb-8 text-3xl font-bold">
            Shipping Methods
          </h2>
          <div className="space-y-4">
            {methods.map((method) => (
              <div
                key={method.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5 md:flex md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {method.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{method.detail}</p>
                </div>
                <div className="mt-4 flex items-center gap-6 md:mt-0">
                  <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Clock3 className="h-4 w-4 text-emerald-600" />
                    {method.eta}
                  </p>
                  <p className="text-lg font-bold text-emerald-600">
                    {method.fee}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-slate-900 p-8 text-white md:p-10">
          <h2 className="font-display mb-4 text-3xl font-bold">
            Need Delivery Support?
          </h2>
          <p className="mb-6 max-w-2xl text-slate-300">
            If your package is delayed or you need help with shipping status,
            our support team is ready to assist.
          </p>
          <a
            href="/help"
            className="inline-flex rounded-full bg-emerald-500 px-8 py-4 font-bold text-white transition-colors hover:bg-emerald-600"
          >
            Contact Help Center
          </a>
        </section>
      </main>
    </div>
  )
}
