import { createFileRoute } from '@tanstack/react-router'

import {
  ChevronDown,
  ChevronRight,
  LayoutList,
  PawPrint,
  ShoppingCart,
  Star,
} from 'lucide-react'

import { fetchProductsByCategory } from '#/lib/FetchData'

const createCategorySlugRoute = createFileRoute as any
export const Route = createCategorySlugRoute('/categories/$slug')({
  loader: async ({ params }: { params: { slug: string } }) => {
    return fetchProductsByCategory(params.slug, { page: 1, limit: 12 })
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const { category, products, total, page, limit } = Route.useLoaderData()
  const categoryLabel = category?.name || (slug === 'dogs' ? 'Dogs' : slug)
  const start = products.length > 0 ? (page - 1) * limit + 1 : 0
  const end = products.length > 0 ? start + products.length - 1 : 0

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden bg-emerald-50/50 py-16">
        <div className="relative z-10 mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="space-y-6 text-center lg:w-3/5 lg:text-left">
              <nav
                className="mb-6 flex justify-center text-sm font-medium text-slate-500 lg:justify-start"
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
                  <li>
                    <a
                      href="/categories"
                      className="transition-colors hover:text-emerald-600"
                    >
                      Categories
                    </a>
                  </li>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                  <li className="font-bold tracking-tight text-emerald-600">
                    {categoryLabel}
                  </li>
                </ol>
              </nav>
              <h1 className="text-5xl leading-tight font-bold text-slate-900 lg:text-7xl">
                {categoryLabel}{' '}
                <span className="text-emerald-600">Collection</span>
              </h1>
              <p className="mx-auto max-w-xl text-xl leading-relaxed text-slate-500 lg:mx-0">
                {category?.description ||
                  'Temukan produk terbaik pada kategori ini untuk kebutuhan harian hewan peliharaan Anda.'}
              </p>
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <p className="text-sm font-bold text-slate-600">
                  <span className="text-emerald-600">
                    {total.toLocaleString()}
                  </span>{' '}
                  produk tersedia
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:w-2/5">
              <div className="relative">
                <div className="absolute inset-0 scale-95 rotate-6 rounded-[3rem] bg-emerald-500 opacity-20" />
                <img
                  src={
                    category?.image ||
                    'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={categoryLabel}
                  className="relative w-full max-w-md rounded-[3rem] border-8 border-white object-cover shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white px-4 py-3 shadow-xl">
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                    Category
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {categoryLabel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PawPrint className="absolute -top-10 right-10 h-52 w-52 rotate-12 text-emerald-500/5" />
        <PawPrint className="absolute bottom-0 left-20 h-40 w-40 -rotate-12 text-orange-500/5" />
      </section>

      <section className="mx-auto w-full max-w-full px-4 py-20 sm:px-6 lg:px-8 xl:container">
        <div className="flex flex-col gap-12 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-28 space-y-12">
              <div>
                <h3 className="mb-6 text-lg font-bold text-slate-900">
                  Category Info
                </h3>
                <div className="space-y-3 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-sm">
                  <p className="text-slate-500">
                    Slug:{' '}
                    <span className="font-semibold text-slate-900">
                      {category?.slug || slug}
                    </span>
                  </p>
                  <p className="text-slate-500">
                    Status:{' '}
                    <span className="font-semibold text-slate-900">
                      {category?.status || 'active'}
                    </span>
                  </p>
                  <p className="text-slate-500">
                    Total produk:{' '}
                    <span className="font-semibold text-slate-900">
                      {total.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-bold text-slate-900">
                  Price Range
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-slate-50 px-4 py-2 text-sm font-bold text-emerald-600">
                      $0
                    </span>
                    <span className="rounded-xl bg-slate-50 px-4 py-2 text-sm font-bold text-emerald-600">
                      $500
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    defaultValue={250}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-emerald-500"
                  />
                  <div className="flex justify-center">
                    <p className="text-sm font-bold tracking-tight text-slate-400">
                      Avg: $124.00
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-bold text-slate-900">
                  Minimum Rating
                </h3>
                <div className="space-y-4">
                  {[4, 3].map((filled) => (
                    <button
                      key={filled}
                      type="button"
                      className="group flex w-full items-center gap-3"
                    >
                      <div className="flex text-xl text-orange-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < filled ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-slate-500 transition-colors group-hover:text-emerald-600">
                        & Up
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-4xl bg-orange-500 p-8 text-white">
                <h4 className="relative z-10 mb-3 text-xl font-bold">
                  Extra 15% Off!
                </h4>
                <p className="relative z-10 mb-6 text-xs leading-relaxed text-orange-50">
                  First time ordering dog food? Use code{' '}
                  <span className="font-black tracking-widest">DOGGY15</span> at
                  checkout.
                </p>
                <button
                  type="button"
                  className="relative z-10 w-full rounded-xl bg-white py-3 font-bold text-orange-600 transition-colors hover:bg-orange-50"
                >
                  Copy Code
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                  <LayoutList className="h-5 w-5" />
                </div>
                <span className="font-medium text-slate-500">
                  Showing{' '}
                  <span className="font-bold text-slate-900">
                    {start}-{end}
                  </span>{' '}
                  of <span className="font-bold text-slate-900">{total}</span>{' '}
                  products
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">
                  Sort By
                </span>
                <div className="relative">
                  <select className="cursor-pointer appearance-none rounded-2xl border border-slate-100 bg-white px-6 py-4 pr-12 font-bold text-slate-700 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50">
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
              {products.map((product: ShopProductCard) => (
                <article
                  key={product.slug}
                  className="group rounded-[2.5rem] border border-slate-100 bg-white p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-100/50"
                >
                  <div className="relative aspect-square overflow-hidden rounded-4xl bg-slate-50">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.isBestSeller ? (
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                          Best Seller
                        </span>
                      </div>
                    ) : null}
                    <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <button
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white shadow-lg transition-all hover:bg-emerald-600"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 px-3">
                    <div className="mb-2 flex items-start justify-between">
                      <a
                        href={`/shop/${product.slug}`}
                        className="text-lg leading-snug font-bold text-slate-800"
                      >
                        {product.title}
                      </a>
                      <span className="text-xl font-bold text-emerald-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="mb-4 text-sm font-medium text-slate-400 italic">
                      {product.category}
                    </p>
                    <div className="flex items-center text-sm text-orange-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                      <span className="ml-2 text-xs font-bold text-slate-400">
                        (5.0)
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-center">
              <span className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
                Page {page}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="relative overflow-hidden rounded-[3rem] bg-emerald-500 p-10 lg:p-20">
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div className="text-white">
                <h2 className="mb-4 text-4xl font-bold">
                  Unlock Exclusive Treats
                </h2>
                <p className="text-xl leading-relaxed text-emerald-50 opacity-90">
                  Join our Furry Family newsletter and get personalized care
                  tips plus 15% off your next order.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your best email address"
                  className="flex-1 rounded-3xl border-none bg-white px-8 py-5 font-medium text-slate-900 outline-none focus:ring-4 focus:ring-emerald-300"
                />
                <button
                  type="submit"
                  className="rounded-3xl bg-orange-500 px-10 py-5 font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-orange-600"
                >
                  Join Family
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
