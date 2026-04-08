import { createFileRoute } from '@tanstack/react-router'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
} from 'lucide-react'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
})

const products = [
  {
    title: 'Premium Grain-Free Salmon Dog Food',
    price: '$45.99',
    subtitle: 'Adult • 12kg Pack',
    rating: '1.2k',
    image:
      'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=600&q=80',
    badgeA: 'Best Seller',
    badgeB: '-20%',
  },
  {
    title: 'Organic Free-Range Chicken Puppy Food',
    price: '$32.50',
    subtitle: 'Puppy • 5kg Bag',
    rating: '842',
    image:
      'https://images.unsplash.com/photo-1589924691995-400dc9cec109?auto=format&fit=crop&w=600&q=80',
    badgeA: '',
    badgeB: '',
  },
  {
    title: 'Hypoallergenic Lamb & Rice Mix',
    price: '$58.00',
    subtitle: 'Senior • 15kg Jumbo',
    rating: '312',
    image:
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=600&q=80',
    badgeA: 'New',
    badgeB: '',
  },
  {
    title: 'Gourmet Beef Chunks in Gravy',
    price: '$12.99',
    subtitle: 'Wet Food • 400g Can x 6',
    rating: '1.8k',
    image:
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&q=80',
    badgeA: '',
    badgeB: '',
  },
  {
    title: 'Advanced Oral Care Dental Chews',
    price: '$24.99',
    subtitle: 'Treats • 30 Chews Pack',
    rating: '950',
    image:
      'https://images.unsplash.com/photo-1581281863883-2469417a1668?auto=format&fit=crop&w=600&q=80',
    badgeA: '',
    badgeB: '',
  },
  {
    title: 'Smoky Bacon Flavor Training Strips',
    price: '$9.50',
    subtitle: 'Treats • 150g Bag',
    rating: '2.1k',
    image:
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80',
    badgeA: 'Trending',
    badgeB: '',
  },
]

function RouteComponent() {
  return (
    <>
      <section className="bg-emerald-50/50 py-10">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <nav
                className="mb-4 flex text-sm font-medium text-slate-500"
                aria-label="Breadcrumb"
              >
                <ol className="flex items-center space-x-2">
                  <li>
                    <a
                      href="/"
                      className="transition-colors hover:text-emerald-600"
                    >
                      Home
                    </a>
                  </li>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                  <li className="font-bold text-emerald-600">Search Results</li>
                </ol>
              </nav>
              <h1 className="font-display text-4xl font-bold text-slate-900">
                Results for{' '}
                <span className="text-emerald-600">&quot;dog food&quot;</span>
              </h1>
              <p className="mt-2 font-medium text-slate-500">
                We found 24 products matching your search.
              </p>
            </div>

            <div className="relative max-w-lg flex-1">
              <div className="search-input-focus flex items-center rounded-3xl border border-slate-200 bg-white p-1 transition-all">
                <div className="flex flex-1 items-center pl-5">
                  <Search className="mr-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    defaultValue="dog food"
                    className="w-full border-none bg-transparent py-3 font-medium text-slate-800 outline-none"
                    placeholder="Search again..."
                  />
                </div>
                <button className="rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-white transition-colors hover:bg-emerald-600">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto container px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-28 space-y-12">
              <div>
                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Filter className="h-5 w-5 text-emerald-500" />
                  Categories
                </h3>
                <div className="space-y-3">
                  <label className="group flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-slate-300 text-emerald-500"
                    />
                    <span className="ml-3 text-slate-600 transition-colors group-hover:text-emerald-600">
                      All Pets
                    </span>
                  </label>
                  <label className="group flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 rounded border-slate-300 text-emerald-500"
                    />
                    <span className="ml-3 font-bold text-slate-900">Dogs</span>
                    <span className="ml-auto rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
                      24
                    </span>
                  </label>
                  <label className="group flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-slate-300 text-emerald-500"
                    />
                    <span className="ml-3 text-slate-600 transition-colors group-hover:text-emerald-600">
                      Cats
                    </span>
                  </label>
                  <label className="group flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-slate-300 text-emerald-500"
                    />
                    <span className="ml-3 text-slate-600 transition-colors group-hover:text-emerald-600">
                      Birds
                    </span>
                  </label>
                  <label className="group flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-slate-300 text-emerald-500"
                    />
                    <span className="ml-3 text-slate-600 transition-colors group-hover:text-emerald-600">
                      Fish & Aquatic
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-bold text-slate-900">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-800">
                    <span className="rounded-lg bg-slate-50 px-3 py-1.5">
                      $0
                    </span>
                    <span className="rounded-lg bg-slate-50 px-3 py-1.5">
                      $250
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    defaultValue={250}
                    className="w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-emerald-500"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-bold text-slate-900">
                  Minimum Rating
                </h3>
                <div className="space-y-3">
                  <button className="group flex w-full items-center gap-3 text-left">
                    <div className="flex text-lg text-orange-400">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                      <Star size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-600 transition-colors group-hover:text-emerald-600">
                      &amp; Up
                    </span>
                  </button>
                  <button className="group flex w-full items-center gap-3 text-left">
                    <div className="flex text-lg text-orange-400">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                      <Star size={16} />
                      <Star size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-600 transition-colors group-hover:text-emerald-600">
                      &amp; Up
                    </span>
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-500 p-8 text-white">
                <Sparkles className="absolute -top-4 -right-4 h-16 w-16 -rotate-12 text-white/20" />
                <div className="relative z-10">
                  <h4 className="mb-3 text-2xl leading-tight font-bold">
                    First Order Special!
                  </h4>
                  <p className="mb-6 text-sm text-emerald-50">
                    Use code <strong>WELCOME20</strong> for 20% off all dog
                    food.
                  </p>
                  <button className="w-full rounded-2xl bg-white py-3.5 font-bold text-emerald-600 transition-colors hover:bg-emerald-50">
                    Copy Code
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium tracking-wide text-slate-500 uppercase">
                  Showing 1-6 of 24 results
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold tracking-wider text-slate-400 uppercase">
                  Sort By
                </span>
                <div className="relative">
                  <select className="cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-white px-6 py-4 pr-12 font-bold text-slate-700 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50">
                    <option>Best Sellers</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                    <option>Top Rated</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-5 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.title}
                  className="product-card group rounded-[2.5rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-2xl hover:shadow-emerald-100/50"
                >
                  <a href="#" className="block">
                    <div className="relative aspect-square overflow-hidden rounded-4xl bg-slate-50">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {product.badgeA || product.badgeB ? (
                        <div className="absolute top-4 left-4 flex gap-2">
                          {product.badgeA ? (
                            <span className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                              {product.badgeA}
                            </span>
                          ) : null}
                          {product.badgeB ? (
                            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-600 uppercase shadow-sm">
                              {product.badgeB}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                      <div className="cart-btn absolute inset-x-4 bottom-4">
                        <span className="block w-full rounded-2xl bg-emerald-500 py-4 font-bold text-white shadow-lg transition-all active:scale-95 hover:bg-emerald-600">
                          <span className="flex items-center justify-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                  <div className="mt-6 px-3">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-lg leading-snug font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
                        {product.title}
                      </h3>
                      <span className="text-xl font-bold text-emerald-600">
                        {product.price}
                      </span>
                    </div>
                    <p className="mb-4 text-sm font-medium text-slate-400">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-orange-400">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                        <Star size={16} />
                        <span className="ml-1 text-xs font-bold text-slate-400">
                          ({product.rating})
                        </span>
                      </div>
                      <button className="text-slate-300 transition-colors hover:text-emerald-500">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button className="flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 transition-all hover:text-emerald-500">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-100 transition-all">
                1
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500">
                2
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500">
                3
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500">
                4
              </button>
              <button className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </main>
        </div>
      </section>

      <section className="relative overflow-hidden py-10">
        <div className="relative z-10 mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4rem] border border-white/20 bg-emerald-500 p-10 lg:p-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="text-white">
                <h2 className="font-display mb-4 text-4xl font-bold">
                  Don&apos;t miss a treat!
                </h2>
                <p className="mb-0 text-lg text-emerald-50 opacity-90">
                  Sign up for our newsletter to get flash deals and pet
                  parenting tips directly to your inbox.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-3xl border-none bg-white px-8 py-5 font-medium text-slate-900 outline-none focus:ring-4 focus:ring-emerald-300"
                />
                <button className="rounded-3xl bg-orange-500 px-10 py-5 font-bold text-white shadow-xl transition-all hover:bg-orange-600">
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
