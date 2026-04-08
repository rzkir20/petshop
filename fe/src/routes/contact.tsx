import { createFileRoute } from '@tanstack/react-router'
import {
  ChevronDown,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Twitter,
} from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day money-back guarantee on most products. Items must be in their original packaging and unused. Some exclusions apply to perishable pet food for safety reasons.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery. You'll receive a tracking number via email as soon as your order ships.",
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Currently, we only ship within the continental United States. We are working on expanding our paw-print to other countries soon! Stay tuned to our newsletter for updates.',
  },
  {
    question: 'Can I cancel or change my order?',
    answer:
      'Orders can be changed or cancelled within 2 hours of placement. Please contact our support team immediately via phone or the contact form above for urgent modifications.',
  },
]

function RouteComponent() {
  return (
    <>
      <section className="bg-emerald-50/50 py-10">
        <div className="mx-auto w-full max-w-full xl:container px-4 text-center sm:px-6 lg:px-8">
          <nav
            className="mb-6 flex justify-center text-sm font-medium text-slate-500"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="hover:text-emerald-600">
                  Home
                </a>
              </li>
              <li className="text-slate-300">/</li>
              <li className="font-bold text-emerald-600">Contact Us</li>
            </ol>
          </nav>
          <h1 className="font-display mb-4 text-5xl font-bold text-slate-900">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Have a question about our products or need help with an order? Our
            team of pet experts is here to help you and your furry friends.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-full xl:container gap-16 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="rounded-[3rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 md:p-12 lg:col-span-7">
          <h2 className="font-display mb-8 text-3xl font-bold">
            Send us a Message
          </h2>
          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="ml-1 text-sm font-bold text-slate-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="input-focus w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="ml-1 text-sm font-bold text-slate-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="input-focus w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="subject"
                className="ml-1 text-sm font-bold text-slate-700"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="How can we help?"
                className="input-focus w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="ml-1 text-sm font-bold text-slate-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us more about your inquiry..."
                className="input-focus w-full resize-none rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full transform rounded-full bg-emerald-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-200 transition-all hover:-translate-y-1 hover:bg-emerald-600 md:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8 lg:col-span-5">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-500 p-10 text-white">
            <PawPrint className="absolute -right-6 -bottom-6 h-24 w-24 rotate-12 text-white/10" />
            <h3 className="font-display relative z-10 mb-8 text-2xl font-bold">
              Contact Information
            </h3>
            <div className="relative z-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Visit Our Store</p>
                  <p className="text-emerald-50 opacity-90">
                    123 Pet Lane, Paw City, PC 54321
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Call Us</p>
                  <p className="text-emerald-50 opacity-90">
                    +1 (800) PAW-SOME
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Email Support</p>
                  <p className="text-emerald-50 opacity-90">
                    hello@pawsomeshop.com
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex gap-4 border-t border-white/10 pt-8">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/30"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/30"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/30"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-orange-100 bg-orange-50 p-10">
            <h3 className="font-display mb-6 text-2xl font-bold text-slate-900">
              Store Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="font-medium text-slate-600">
                  Monday - Friday
                </span>
                <span className="font-bold text-slate-900">
                  09:00 AM - 08:00 PM
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-slate-600">Saturday</span>
                <span className="font-bold text-slate-900">
                  10:00 AM - 06:00 PM
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-slate-600">Sunday</span>
                <span className="font-bold text-orange-600">Closed</span>
              </li>
            </ul>
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-orange-500/10 p-4">
              <Clock3 className="h-6 w-6 text-orange-500" />
              <p className="text-sm leading-tight font-medium text-orange-700">
                Online orders are accepted 24/7. Support replies within 24
                hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-full xl:container px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative h-[400px] w-full overflow-hidden rounded-[3rem] border border-slate-200 bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1440&q=80"
            alt="Map placeholder"
            className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 hover:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-2xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">PawsomeShop HQ</p>
                <p className="text-xs text-slate-500">
                  Click to open navigation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-500">
              Quick answers to common questions about our services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-3xl border border-slate-100 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-6">
                  <span className="text-lg font-bold text-slate-800">
                    {faq.question}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 transition-all group-open:bg-emerald-500 group-open:text-white">
                    <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                  </div>
                </summary>
                <div className="px-6 pb-6 leading-relaxed text-slate-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
