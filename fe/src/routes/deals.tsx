import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  Box,
  ChevronDown,
  Flame,
  RefreshCw,
  ShoppingCart,
  Timer,
  TrendingUp,
  Zap,
} from 'lucide-react'

export const Route = createFileRoute('/deals')({
  component: RouteComponent,
})

const deals = [
  {
    title: 'Premium Salmon Kibble',
    category: 'Dogs • 12kg',
    price: '$22.99',
    originalPrice: '$45.99',
    discount: '50% OFF',
    timer: '02:15:09',
    stockMessage: 'Only 2 left in stock!',
    stockStyle: 'text-red-500',
    stockIcon: 'flame',
    image:
      'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Smart Interactive Laser',
    category: 'Cats • Tech',
    price: '$16.99',
    originalPrice: '$24.50',
    discount: '30% OFF',
    timer: '05:44:12',
    stockMessage: 'Selling fast: 124 sold today',
    stockStyle: 'text-orange-400',
    stockIcon: 'trending',
    image:
      'https://images.unsplash.com/photo-1591768793355-74d7c836049c?auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Cloud-Soft Orthopedic Bed',
    category: 'Dogs • Luxury',
    price: '$48.99',
    originalPrice: '$89.00',
    discount: '45% OFF',
    timer: '01:02:55',
    stockMessage: 'Only 1 left in stock!',
    stockStyle: 'text-red-500',
    stockIcon: 'alert',
    image:
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Reflective Safety Leash',
    category: 'Dogs • Outdoors',
    price: '$14.20',
    originalPrice: '$18.99',
    discount: '25% OFF',
    timer: '08:22:30',
    stockMessage: 'In Stock (35 available)',
    stockStyle: 'text-slate-400',
    stockIcon: 'box',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Glass Starter Aquarium',
    category: 'Fish • Aquariums',
    price: '$57.00',
    originalPrice: '$95.00',
    discount: '40% OFF',
    timer: '04:15:33',
    stockMessage: 'Hot Sale: 15 people viewing now',
    stockStyle: 'text-red-500',
    stockIcon: 'flame',
    image:
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Modern Parakeet Cage',
    category: 'Birds • Housing',
    price: '$100.00',
    originalPrice: '$125.00',
    discount: '20% OFF',
    timer: '09:44:01',
    stockMessage: 'Only 8 available',
    stockStyle: 'text-slate-400',
    stockIcon: 'box',
    image:
      'https://images.unsplash.com/photo-1581281863883-2469417a1668?auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Organic Cat Treats Box',
    category: 'Cats • Healthy',
    price: '$12.35',
    originalPrice: '$18.99',
    discount: '35% OFF',
    timer: '03:22:15',
    stockMessage: 'Limited time flash offer',
    stockStyle: 'text-red-500',
    stockIcon: 'zap',
    image:
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Premium Leather Collar',
    category: 'Dogs • Luxury',
    price: '$14.50',
    originalPrice: '$29.00',
    discount: '50% OFF',
    timer: '00:45:12',
    stockMessage: 'Almost gone: Only 3 left!',
    stockStyle: 'text-red-500',
    stockIcon: 'flame',
    image:
      'https://images.unsplash.com/photo-1589924691995-400dc9cec109?auto=format&fit=crop&w=500&q=80',
  },
]

function StockIcon({ kind }: { kind: string }) {
  if (kind === 'flame') return <Flame size={12} />
  if (kind === 'trending') return <TrendingUp size={12} />
  if (kind === 'alert') return <AlertCircle size={12} />
  if (kind === 'zap') return <Zap size={12} />
  return <Box size={12} />
}

function RouteComponent() {
  return (
    <>
      <div className="sticky top-20 z-40 border-b border-white/10 bg-slate-900 py-3 text-white">
        <div className="mx-auto flex max-w-full xl:container flex-col items-center justify-center gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            <p className="text-sm font-bold tracking-wider uppercase">
              Ends In:
            </p>
          </div>
          <div className="font-display flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="min-w-10 rounded-lg bg-slate-800 px-2 py-1 text-center font-bold">
                08
              </span>
              <span className="text-xs text-slate-500">HRS</span>
            </div>
            <span className="font-bold text-orange-500">:</span>
            <div className="flex items-center gap-1">
              <span className="min-w-10 rounded-lg bg-slate-800 px-2 py-1 text-center font-bold">
                42
              </span>
              <span className="text-xs text-slate-500">MIN</span>
            </div>
            <span className="font-bold text-orange-500">:</span>
            <div className="flex items-center gap-1">
              <span className="min-w-10 animate-pulse rounded-lg bg-slate-800 px-2 py-1 text-center font-bold">
                33
              </span>
              <span className="text-xs text-slate-500">SEC</span>
            </div>
          </div>
          <div className="mx-2 hidden h-4 w-px bg-slate-700 lg:block" />
          <p className="hidden text-xs font-bold tracking-widest text-slate-400 uppercase lg:block">
            Flash Sale Ends Strictly at Midnight!
          </p>
        </div>
      </div>

      <section className="relative overflow-hidden py-10">
        <div className="mx-auto max-w-full xl:container px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col items-center gap-12 overflow-hidden rounded-[3rem] bg-orange-500 p-8 lg:flex-row lg:p-16">
            <div className="relative z-10 space-y-6 text-center lg:w-3/5 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-bold tracking-widest text-white uppercase backdrop-blur-md">
                <Zap className="shake-animation h-4 w-4 text-yellow-300" />
                Limited Time Flash Sales
              </div>
              <h1 className="font-display text-5xl leading-tight font-bold text-white lg:text-7xl">
                Huge Savings For <br />
                <span className="text-slate-900">Your Furry Family</span>
              </h1>
              <p className="max-w-lg text-xl text-orange-50">
                Up to 50% Off on premium food, toys, and luxury accessories.
                Give them the best for less.
              </p>
              <a
                href="#deals-grid"
                className="inline-block transform rounded-full bg-slate-900 px-10 py-5 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-800"
              >
                Claim Your Deal
              </a>
            </div>

            <div className="relative flex justify-center lg:w-2/5">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                alt="Happy pet with sales"
                className="relative w-full max-w-sm rounded-[2.5rem] border-8 border-white/20 object-cover shadow-2xl"
              />
              <div className="absolute -right-6 -bottom-6 flex animate-bounce items-center gap-3 rounded-3xl bg-white p-4 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-500">
                  50%
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-tighter text-slate-400 uppercase">
                    Off Today
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    Sitewide Sale
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-full xl:container px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 border-b border-slate-100 pb-8 md:flex-row">
          <div className="flex flex-wrap justify-center gap-3">
            <button className="rounded-full bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-200 transition-all">
              Today&apos;s Deals
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-6 py-3 font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500">
              Ending Soon
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-6 py-3 font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500">
              Best Savings
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
            <span>Sort by:</span>
            <div className="relative">
              <select className="cursor-pointer appearance-none rounded-xl border-none bg-slate-50 px-6 py-3 pr-10 font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500">
                <option>Highest Discount</option>
                <option>Lowest Price</option>
                <option>Most Popular</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="deals-grid"
        className="mx-auto max-w-full xl:container px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((deal) => (
            <article
              key={deal.title}
              className="product-card group relative rounded-[2.5rem] border border-slate-100 bg-white p-4 transition-all hover:shadow-2xl"
            >
              <div className="absolute top-6 left-6 z-10">
                <div className="-rotate-6 transform rounded-full bg-orange-500 px-3 py-1.5 text-xs font-black text-white shadow-lg">
                  {deal.discount}
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-4xl bg-slate-100">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="cart-btn absolute inset-x-4 bottom-4">
                  <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white shadow-lg transition-all hover:bg-emerald-600">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="mt-6 px-3">
                <h3 className="text-lg leading-tight font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
                  {deal.title}
                </h3>
                <p className="mt-1 text-xs font-bold tracking-widest text-slate-500 uppercase">
                  {deal.category}
                </p>
                <div className="mt-3 mb-4 flex items-center gap-3">
                  <span className="text-2xl font-black text-emerald-600">
                    {deal.price}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {deal.originalPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-orange-50 p-3">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-bold text-orange-600">
                      {deal.timer}
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-orange-400 uppercase">
                    Left
                  </span>
                </div>
                <p
                  className={`mt-3 flex items-center gap-1 text-[10px] font-bold ${deal.stockStyle}`}
                >
                  <StockIcon kind={deal.stockIcon} />
                  {deal.stockMessage}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mb-10 flex justify-center">
          <button className="flex items-center gap-3 rounded-full border-2 border-slate-100 px-12 py-5 font-bold text-slate-500 transition-all hover:border-emerald-500 hover:text-emerald-500">
            Load More Deals
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-900 py-16">
        <div className="relative z-10 mx-auto max-w-full xl:container px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display mb-6 text-3xl font-bold text-white lg:text-4xl">
            Don&apos;t Wait! These Deals Disappear Fast.
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-slate-400">
            Our flash sales are updated hourly with new items for your pets.
            Stock is limited and once it&apos;s gone, it&apos;s gone!
          </p>
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
            <div className="text-white">
              <p className="mb-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
                Daily Active Users
              </p>
              <p className="text-3xl font-black text-orange-500">24,812</p>
            </div>
            <div className="hidden h-12 w-px bg-slate-800 sm:block" />
            <div className="text-white">
              <p className="mb-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
                Average Savings
              </p>
              <p className="text-3xl font-black text-emerald-500">$42.50</p>
            </div>
            <div className="hidden h-12 w-px bg-slate-800 sm:block" />
            <div className="text-white">
              <p className="mb-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
                Orders Shipped Today
              </p>
              <p className="text-3xl font-black text-orange-500">1,402</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
