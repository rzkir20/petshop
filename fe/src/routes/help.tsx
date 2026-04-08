import { createFileRoute } from '@tanstack/react-router'

import {
  ChevronDown,
  CircleHelp,
  CreditCard,
  Package,
  RefreshCcw,
  ShieldCheck,
} from 'lucide-react'

export const Route = createFileRoute('/help')({
  component: HelpPage,
})

const faqs = [
  {
    question: 'How can I track my order?',
    answer:
      'After your order ships, you will receive a tracking link by email. You can also check your order status from your account page.',
  },
  {
    question: 'Can I return pet food products?',
    answer:
      'Unopened and sealed pet food can be returned within 30 days. Opened or perishable items may not be eligible for safety reasons.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept major credit/debit cards, PayPal, and selected digital wallets. All transactions are encrypted and secure.',
  },
]

function HelpPage() {
  const cards = [
    {
      title: 'Order & Shipping',
      description: 'Track packages, shipping timelines, and delivery updates.',
      icon: <Package className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Returns & Refunds',
      description:
        'Start returns and learn more about refund processing times.',
      icon: <RefreshCcw className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Payments & Billing',
      description: 'Get help with payments, invoices, and checkout issues.',
      icon: <CreditCard className="h-6 w-6 text-emerald-600" />,
    },
  ]

  return (
    <>
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            Support Center
          </p>
          <h1 className="font-display mb-4 text-5xl font-bold">
            How Can We Help?
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Find answers to common questions about orders, payments, returns,
            and product support.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-full xl:container space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3">
                {card.icon}
              </div>
              <h2 className="font-display mb-2 text-xl font-bold">
                {card.title}
              </h2>
              <p className="text-slate-600">{card.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm md:p-10">
          <h2 className="font-display mb-8 text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-100 bg-slate-50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-5">
                  <span className="font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-slate-900 p-8 text-white md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Secure & Friendly Support
              </div>
              <h2 className="font-display mb-2 text-3xl font-bold">
                Still Need Help?
              </h2>
              <p className="text-slate-300">
                Contact our pet support team and we&apos;ll get back to you
                within 24 hours.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 font-bold text-white transition-all hover:bg-emerald-600"
            >
              <CircleHelp className="h-5 w-5" />
              Contact Support
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
