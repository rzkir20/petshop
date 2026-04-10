import { createFileRoute } from '@tanstack/react-router'
import {
  Bone,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  LayoutList,
  PawPrint,
  ShoppingCart,
  Star,
} from 'lucide-react'

const createCategorySlugRoute = createFileRoute as any
export const Route = createCategorySlugRoute('/categories/$slug')({
  component: RouteComponent,
})

const products = [
  {
    slug: 'grain-free-atlantic-salmon-kibble',
    title: 'Grain-Free Atlantic Salmon Kibble',
    price: '$45.99',
    meta: 'Adult • 12kg Pack',
    rating: '(248)',
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'extra-tough-3-knot-rope-tug-toy',
    title: 'Extra Tough 3-Knot Rope Tug Toy',
    price: '$12.50',
    meta: 'Tug & Pull • Cotton Fiber',
    rating: '(152)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'cloud-comfort-orthopedic-foam-bed',
    title: 'Cloud-Comfort Orthopedic Foam Bed',
    price: '$89.00',
    meta: 'Large • Memory Foam',
    rating: '(420)',
    badge: 'Trending',
    image:
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'handcrafted-italian-leather-collar',
    title: 'Handcrafted Italian Leather Collar',
    price: '$34.50',
    meta: 'Medium • Saddle Brown',
    rating: '(88)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1589924691995-400dc9cec109?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'daily-fresh-breath-dental-chews',
    title: 'Daily Fresh Breath Dental Chews',
    price: '$19.99',
    meta: '30 Count • Tartar Control',
    rating: '(512)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1591768793355-74d7c836049c?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'smoky-beef-liver-training-treats',
    title: 'Smoky Beef Liver Training Treats',
    price: '$9.99',
    meta: 'High Reward • 150g Bag',
    rating: '(342)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'no-pull-padded-training-harness',
    title: 'No-Pull Padded Training Harness',
    price: '$28.00',
    meta: 'Adjustable • Neon Reflective',
    rating: '(210)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'sensitive-skin-oat-honey-shampoo',
    title: 'Sensitive Skin Oat & Honey Shampoo',
    price: '$14.25',
    meta: 'Natural • 500ml Bottle',
    rating: '(128)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'anti-gulp-slow-feeder-bowl',
    title: 'Anti-Gulp Slow Feeder Bowl',
    price: '$18.50',
    meta: 'Ceramic • Dishwasher Safe',
    rating: '(94)',
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'smart-hide-and-seek-puzzle-toy',
    title: 'Smart Hide-and-Seek Puzzle Toy',
    price: '$22.00',
    meta: 'Advanced • Mental Stimulation',
    rating: '(318)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'waterproof-winter-parka-for-dogs',
    title: 'Waterproof Winter Parka for Dogs',
    price: '$42.99',
    meta: 'All Sizes • Thermal Fleece',
    rating: '(64)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1541591490109-6a3e7d515bfc?auto=format&fit=crop&w=600&q=80',
  },
  {
    slug: 'impact-resistant-airline-travel-crate',
    title: 'Impact-Resistant Airline Travel Crate',
    price: '$120.00',
    meta: 'Extra Large • Safety Locking',
    rating: '(203)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1581281863883-2469417a1668?auto=format&fit=crop&w=600&q=80',
  },
]

function RouteComponent() {
  const { slug } = Route.useParams()
  const categoryLabel = slug === 'dogs' ? 'Dogs' : slug

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
                    <a href="/" className="transition-colors hover:text-emerald-600">
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
                Everything your loyal companion needs. From high-protein
                nutrition to orthopedic beds and interactive puzzle toys for
                ultimate happiness.
              </p>
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <div className="-space-x-3 flex">
                  {[
                    'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=48&h=48&q=80',
                    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=48&h=48&q=80',
                    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=48&h=48&q=80',
                  ].map((image) => (
                    <img
                      key={image}
                      src={image}
                      className="h-12 w-12 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <p className="text-sm font-bold text-slate-600">
                  <span className="text-emerald-600">12k+</span> Happy Paws Served
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:w-2/5">
              <div className="relative">
                <div className="absolute inset-0 scale-95 rotate-6 rounded-[3rem] bg-emerald-500 opacity-20" />
                <img
                  src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80"
                  alt="Happy dog"
                  className="relative w-full max-w-md rounded-[3rem] border-8 border-white object-cover shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 flex animate-bounce items-center gap-3 rounded-3xl bg-white p-4 shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                    <Bone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      Popular
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      Beef Bully Sticks
                    </p>
                  </div>
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
                <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <LayoutGrid className="h-5 w-5 text-emerald-500" />
                  Subcategories
                </h3>
                <div className="space-y-4">
                  {[
                    ['Dog Food', '420', true],
                    ['Dog Toys', '280', false],
                    ['Beds & Furniture', '150', false],
                    ['Collars & Leashes', '210', false],
                    ['Health & Care', '140', false],
                  ].map((item) => (
                    <label
                      key={String(item[0])}
                      className="group flex cursor-pointer items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="flex h-5 w-5 items-center justify-center rounded border border-slate-200 transition-colors group-hover:border-emerald-500">
                          <div
                            className={`h-3 w-3 rounded-sm bg-emerald-500 ${
                              item[2] ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        </div>
                        <span
                          className={`ml-3 transition-colors ${
                            item[2]
                              ? 'font-bold text-slate-900'
                              : 'text-slate-600 group-hover:text-slate-900'
                          }`}
                        >
                          {item[0]}
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          item[2]
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-slate-50 text-slate-400'
                        }`}
                      >
                        {item[1]}
                      </span>
                    </label>
                  ))}
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
                  Showing <span className="font-bold text-slate-900">1-12</span>{' '}
                  of <span className="font-bold text-slate-900">1,200+</span>{' '}
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
              {products.map((product) => (
                <article
                  key={product.slug}
                  className="group rounded-[2.5rem] border border-slate-100 bg-white p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-100/50"
                >
                  <div className="relative aspect-square overflow-hidden rounded-4xl bg-slate-50">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge ? (
                      <div className="absolute top-4 left-4">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase ${
                            product.badge === 'Trending'
                              ? 'bg-orange-500'
                              : product.badge === 'New'
                                ? 'bg-emerald-500'
                                : 'bg-emerald-500'
                          }`}
                        >
                          {product.badge}
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
                        {product.price}
                      </span>
                    </div>
                    <p className="mb-4 text-sm font-medium text-slate-400 italic">
                      {product.meta}
                    </p>
                    <div className="flex items-center text-sm text-orange-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                      <span className="ml-2 text-xs font-bold text-slate-400">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                className="flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    page === 1
                      ? 'flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-200'
                      : 'flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500'
                  }
                >
                  {page}
                </button>
              ))}
              <span className="px-2 font-black text-slate-300">...</span>
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500"
              >
                10
              </button>
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="relative overflow-hidden rounded-[3rem] bg-emerald-500 p-10 lg:p-20">
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div className="text-white">
                <h2 className="mb-4 text-4xl font-bold">Unlock Exclusive Treats</h2>
                <p className="text-xl leading-relaxed text-emerald-50 opacity-90">
                  Join our Furry Family newsletter and get personalized care tips
                  plus 15% off your next order.
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
