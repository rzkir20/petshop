import { createFileRoute } from '@tanstack/react-router'

import {
  BadgeDollarSign,
  ClipboardList,
  PackageCheck,
  RefreshCcw,
} from 'lucide-react'

export const Route = createFileRoute('/returns')({
  component: ReturnsPage,
})

function ReturnsPage() {
  const steps = [
    {
      title: 'Submit return request',
      detail:
        'Open the Help Center and provide your order number with return reason.',
    },
    {
      title: 'Pack item securely',
      detail:
        'Place products in original packaging where possible to avoid transit damage.',
    },
    {
      title: 'Send package',
      detail:
        'Use the provided return label and drop the parcel at the nearest courier point.',
    },
    {
      title: 'Refund processed',
      detail:
        'After inspection, refunds are issued to your original payment method.',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            Support Policy
          </p>
          <h1 className="font-display mb-4 text-5xl font-bold">
            Returns & Refunds
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            We want every order to make pets and owners happy. If something is
            not right, we make returns simple and transparent.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-full xl:container space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3">
              <RefreshCcw className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="font-display mb-2 text-xl font-bold">
              30-Day Window
            </h2>
            <p className="text-slate-600">
              Most products can be returned within 30 days after delivery.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3">
              <PackageCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="font-display mb-2 text-xl font-bold">
              Item Condition
            </h2>
            <p className="text-slate-600">
              Items should be unused and in resellable condition, unless
              defective.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
            <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3">
              <BadgeDollarSign className="h-6 w-6 text-emerald-600" />
            </div>
            <h2 className="font-display mb-2 text-xl font-bold">Fast Refund</h2>
            <p className="text-slate-600">
              Approved refunds are typically completed in 3-7 business days.
            </p>
          </article>
        </section>

        <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10">
          <h2 className="font-display mb-8 text-3xl font-bold">
            How Returns Work
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                <p className="mb-2 text-xs font-bold tracking-widest text-emerald-600 uppercase">
                  Step {idx + 1}
                </p>
                <h3 className="mb-1 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-orange-100 bg-orange-50 p-8 md:p-10">
          <div className="mb-4 inline-flex rounded-xl bg-orange-100 p-3">
            <ClipboardList className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className="font-display mb-3 text-3xl font-bold text-slate-900">
            Important Notes
          </h2>
          <ul className="space-y-2 text-slate-700">
            <li>
              - Opened/perishable pet food may be non-returnable for safety
              reasons.
            </li>
            <li>
              - Shipping fees may be non-refundable unless item is
              damaged/incorrect.
            </li>
            <li>
              - Exchanges depend on stock availability at the time of approval.
            </li>
          </ul>
          <a
            href="/help"
            className="mt-6 inline-flex rounded-full bg-emerald-500 px-8 py-4 font-bold text-white transition-colors hover:bg-emerald-600"
          >
            Start a Return Request
          </a>
        </section>
      </main>
    </div>
  )
}
