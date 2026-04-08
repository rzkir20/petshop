import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowLeft,
  ChevronRight,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
  XCircle,
} from 'lucide-react'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

const cartItems = [
  {
    id: 'dog-food',
    category: 'Dogs • Food',
    title: 'Premium Adult Dog Food',
    subtitle: '12kg Pack • Chicken Flavor',
    unitPrice: 45.99,
    qty: 1,
    image:
      'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=400&q=80',
    categoryColor: 'text-orange-500',
  },
  {
    id: 'cat-feeder',
    category: 'Cats • Toys',
    title: 'Interactive Cat Feeder',
    subtitle: 'Automatic Dispenser • White',
    unitPrice: 24.5,
    qty: 2,
    image:
      'https://images.unsplash.com/photo-1591768793355-74d7c836049c?auto=format&fit=crop&w=400&q=80',
    categoryColor: 'text-emerald-500',
  },
  {
    id: 'leash',
    category: 'Dogs • Walking',
    title: 'Safety Reflective Leash',
    subtitle: 'Medium Size • Neon Green',
    unitPrice: 18.99,
    qty: 1,
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80',
    categoryColor: 'text-orange-500',
  },
]

function RouteComponent() {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.qty,
    0,
  )
  const shipping = 5
  const tax = 9.12
  const total = subtotal + shipping + tax

  return (
    <>
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-full xl:container px-4 sm:px-6 lg:px-8">
          <section className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <a href="/shop" className="hover:text-emerald-500">
                  Shop
                </a>
                <ChevronRight size={14} />
                <span className="text-emerald-600">Your Cart</span>
              </div>
              <h1 className="font-display text-4xl font-bold text-slate-900">
                Shopping Cart
              </h1>
              <p className="font-medium text-slate-500">
                You have 4 items in your cart
              </p>
            </div>
            <a
              href="/shop"
              className="inline-flex items-center gap-2 font-bold text-emerald-600 hover:underline"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </a>
          </section>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="overflow-hidden rounded-4xl border border-slate-100 bg-white shadow-sm">
                {cartItems.map((item, idx) => (
                  <article
                    key={item.id}
                    className={`item-card flex flex-col gap-6 p-6 md:flex-row md:p-8 ${
                      idx < cartItems.length - 1
                        ? 'border-b border-slate-50'
                        : ''
                    }`}
                  >
                    <div className="h-32 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 md:w-32">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <p
                            className={`mb-1 text-xs font-bold tracking-wider uppercase ${item.categoryColor}`}
                          >
                            {item.category}
                          </p>
                          <h3 className="text-xl font-bold text-slate-900 transition-colors hover:text-emerald-500">
                            <a href="#">{item.title}</a>
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {item.subtitle}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="p-2 text-slate-400 transition-colors hover:text-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="mt-6 flex items-end justify-between">
                        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors active:scale-95 hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 font-bold text-slate-900">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors active:scale-95 hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="mb-0.5 text-sm text-slate-400">
                            ${item.unitPrice.toFixed(2)} / unit
                          </p>
                          <p className="text-xl font-bold text-slate-900">
                            ${(item.unitPrice * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-red-500"
                >
                  Clear entire cart
                  <XCircle size={16} />
                </button>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/40">
                <h2 className="font-display mb-6 text-2xl font-bold text-slate-900">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-medium text-emerald-600">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Tax</span>
                    <span className="font-bold text-slate-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <div className="mb-8 flex items-end justify-between">
                      <div className="space-y-1">
                        <span className="text-lg font-bold text-slate-900">
                          Total Amount
                        </span>
                        <p className="text-xs text-slate-400">
                          Include VAT & shipping
                        </p>
                      </div>
                      <span className="text-3xl font-bold tracking-tight text-emerald-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="block w-full transform rounded-2xl bg-emerald-500 py-5 text-center text-lg font-bold text-white shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] hover:-translate-y-1 hover:bg-emerald-600"
                    >
                      Proceed to Checkout
                    </a>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-4">
                    <ShieldCheck className="h-6 w-6 text-orange-500" />
                    <div className="text-sm">
                      <p className="font-bold text-slate-900">Secure Payment</p>
                      <p className="text-slate-500">256-bit SSL encryption</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 opacity-40">
                    <span className="text-xs font-bold tracking-wider uppercase">
                      Visa
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      Mastercard
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      PayPal
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      Apple Pay
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white">
                <div className="relative z-10">
                  <h3 className="mb-2 text-xl font-bold">Need help?</h3>
                  <p className="mb-6 text-sm text-slate-400">
                    Our pet experts are available to help you with your order.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 font-bold text-emerald-400 hover:underline"
                  >
                    Chat with Support
                    <MessageCircle size={16} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
