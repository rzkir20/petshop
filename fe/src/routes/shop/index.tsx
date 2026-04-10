import { createFileRoute } from '@tanstack/react-router'

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dog,
  Search,
  ShoppingCart,
  Star,
} from 'lucide-react'

const categoryFilters = [
  { label: 'All Pets', count: 248, checked: true },
  { label: 'Dogs', count: 112, checked: false },
  { label: 'Cats', count: 84, checked: false },
  { label: 'Birds', count: 32, checked: false },
  { label: 'Fish & Aquatic', count: 20, checked: false },
]

const products = [
  {
    slug: 'premium-grain-free-salmon-dog-food',
    title: 'Premium Grain-Free Salmon Dog Food',
    price: '$45.99',
    category: 'Dogs • 12kg Pack',
    ratingText: '(1.2k)',
    image:
      'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
  },
  {
    slug: 'smart-interactive-laser-toy',
    title: 'Smart Interactive Laser Toy',
    price: '$24.50',
    category: 'Cats • Toys',
    ratingText: '(842)',
    image:
      'https://images.unsplash.com/photo-1591768793355-74d7c836049c?auto=format&fit=crop&w=600&q=80',
    badge: '',
  },
  {
    slug: 'orthopedic-memory-foam-bed',
    title: 'Orthopedic Memory Foam Bed',
    price: '$89.00',
    category: 'Dogs/Cats • Accessories',
    ratingText: '(512)',
    image:
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
  {
    slug: 'reflective-heavy-duty-leash',
    title: 'Reflective Heavy-Duty Leash',
    price: '$18.99',
    category: 'Dogs • Accessories',
    ratingText: '(215)',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
    badge: '',
  },
  {
    slug: 'modern-parakeet-flight-cage',
    title: 'Modern Parakeet Flight Cage',
    price: '$125.00',
    category: 'Birds • Cages',
    ratingText: '(128)',
    image:
      'https://images.unsplash.com/photo-1581281863883-2469417a1668?auto=format&fit=crop&w=600&q=80',
    badge: '',
  },
  {
    slug: '20-gallon-glass-starter-kit',
    title: '20-Gallon Glass Starter Kit',
    price: '$95.00',
    category: 'Fish • Aquariums',
    ratingText: '(340)',
    image:
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
  },
]

export const Route = createFileRoute('/shop/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <section className="bg-emerald-50/50 py-10">
        <div className="mx-auto w-full max-w-full xl:container px-4 sm:px-6 lg:px-8">
          <nav
            className="mb-4 flex text-sm font-medium text-slate-500"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className="hover:text-emerald-600">
                  Home
                </a>
              </li>
              <li className="text-slate-300">/</li>
              <li className="font-bold text-emerald-600">Shop All Products</li>
            </ol>
          </nav>
          <h1 className="font-display mb-2 text-4xl font-bold text-slate-900">
            Browse Everything
          </h1>
          <p className="max-w-2xl text-slate-500">
            Find the best supplies, treats, and toys for your companions. We
            have curated only the finest quality for your pets.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-full xl:container px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-28 space-y-10">
              <div>
                <h3 className="mb-6 text-lg font-bold text-slate-800">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categoryFilters.map((item) => (
                    <label
                      key={item.label}
                      className="group flex cursor-pointer items-center"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="h-5 w-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className="ml-3 text-slate-600 transition-colors group-hover:text-emerald-600">
                        {item.label}
                      </span>
                      <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-400">
                        {item.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-bold text-slate-800">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min={0}
                    max={500}
                    defaultValue={250}
                    className="w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-500"
                  />
                  <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                    <span>$0</span>
                    <span>$500+</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-bold text-slate-800">
                  Customer Rating
                </h3>
                <button
                  type="button"
                  className="flex items-center gap-2 text-slate-600 hover:text-emerald-600"
                >
                  <div className="flex text-orange-400">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    <Star size={16} />
                  </div>
                  <span className="text-sm font-medium">& Up</span>
                </button>
              </div>

              <div className="relative overflow-hidden rounded-4xl bg-orange-500 p-8 text-white">
                <Dog className="absolute -right-4 -bottom-4 h-24 w-24 rotate-12 text-white/20" />
                <div className="relative z-10">
                  <h4 className="mb-2 text-2xl font-bold">Join the Club</h4>
                  <p className="mb-6 text-sm text-orange-50">
                    Get 15% off and free shipping on your next order.
                  </p>
                  <button
                    type="button"
                    className="w-full rounded-xl bg-white py-3 font-bold text-orange-500 transition-colors hover:bg-orange-50"
                  >
                    Sign Up Now
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for food, toys, beds..."
                  className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-4 pr-4 pl-12 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm whitespace-nowrap text-slate-500">
                  Showing 1-12 of 248 products
                </span>
                <div className="relative">
                  <select className="cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-6 py-3.5 pr-12 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Best Sellers</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                    <option>Customer Reviews</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.title}
                  className="product-card group rounded-[2.5rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-2xl hover:shadow-emerald-100/50"
                >
                  <div className="relative aspect-square overflow-hidden rounded-4xl bg-slate-100">
                    <a href={`/shop/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </a>
                    {product.badge ? (
                      <div className="absolute top-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                        {product.badge}
                      </div>
                    ) : null}
                    <div className="cart-btn absolute inset-x-4 bottom-4">
                      <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white shadow-lg transition-all hover:bg-emerald-600"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 px-3">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <a
                        href={`/shop/${product.slug}`}
                        className="text-xl leading-tight font-bold text-slate-800 transition-colors group-hover:text-emerald-600"
                      >
                        {product.title}
                      </a>
                      <span className="text-xl font-bold whitespace-nowrap text-emerald-600">
                        {product.price}
                      </span>
                    </div>
                    <p className="mb-3 text-sm font-medium text-slate-500">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-1.5 text-orange-400">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                      <Star size={16} />
                      <span className="ml-1 text-xs font-bold text-slate-400">
                        {product.ratingText}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 font-bold text-white transition-all"
              >
                1
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500"
              >
                2
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500"
              >
                3
              </button>
              <span className="px-2 text-slate-300">...</span>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500"
              >
                20
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </main>
        </div>
      </section>

      <section className="relative overflow-hidden py-10">
        <div className="mx-auto w-full max-w-full xl:container px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4rem] border border-white/20 bg-emerald-500 p-10 lg:p-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="text-white">
                <h2 className="font-display mb-4 text-4xl font-bold">
                  Weekly Pet Tips & Deals
                </h2>
                <p className="mb-0 text-lg text-emerald-50 opacity-90">
                  Join 24,000+ pet parents who get our best advice and flash
                  sales delivered to their inbox.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="yourname@email.com"
                  className="flex-1 rounded-3xl border-none bg-white px-8 py-5 font-medium text-slate-900 outline-none focus:ring-4 focus:ring-emerald-300"
                />
                <button
                  type="submit"
                  className="rounded-3xl bg-orange-500 px-10 py-5 font-bold text-white shadow-xl transition-all hover:bg-orange-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
