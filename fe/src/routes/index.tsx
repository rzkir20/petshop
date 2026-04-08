import { createFileRoute } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

const categories = [
  {
    id: 'dogs',
    name: 'Dogs',
    count: '1.2k+ Products',
    icon: 'DG',
    bg: 'bg-orange-50 hover:bg-orange-100',
  },
  {
    id: 'cats',
    name: 'Cats',
    count: '850+ Products',
    icon: 'CT',
    bg: 'bg-emerald-50 hover:bg-emerald-100',
  },
  {
    id: 'fish',
    name: 'Fish',
    count: '420+ Products',
    icon: 'FS',
    bg: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    id: 'birds',
    name: 'Birds',
    count: '300+ Products',
    icon: 'BD',
    bg: 'bg-yellow-50 hover:bg-yellow-100',
  },
]

const products = [
  {
    title: 'Premium Adult Dog Food',
    price: '$45.99',
    meta: 'Dogs • 12kg Pack',
    rating: '4.5/5',
    reviews: '(128 reviews)',
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Interactive Cat Feeder',
    price: '$24.50',
    meta: 'Cats • Toys',
    rating: '5/5',
    reviews: '(56 reviews)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1591768793355-74d7c836049c?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Safety Reflective Leash',
    price: '$18.99',
    meta: 'Dogs • Walking',
    rating: '4/5',
    reviews: '(42 reviews)',
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Orthopedic Memory Bed',
    price: '$89.00',
    meta: 'Dogs/Cats • Accessories',
    rating: '5/5',
    reviews: '(215 reviews)',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=400&q=80',
  },
]

const testimonials = [
  {
    quote:
      "The quality of the dog food here is unmatched. My Golden Retriever's coat has never looked shinier and healthier!",
    name: 'Sarah Jenkins',
    role: 'Dog Mom of Buddy',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
    card: 'bg-emerald-50/50 border-emerald-100',
  },
  {
    quote:
      'Customer service helped me pick the perfect aquarium starter kit. My fish are thriving and the shipping was fast!',
    name: 'Marcus Wong',
    role: 'Aquarist Enthusiast',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
    card: 'bg-orange-50/50 border-orange-100',
  },
  {
    quote:
      "I love the organic treats selection. Knowing exactly what's in my cat's food gives me such peace of mind.",
    name: 'Elena Rodriguez',
    role: 'Cat Parent',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
    card: 'bg-slate-50 border-slate-200',
  },
]

function App() {
  return (
    <main id="home" className="min-h-screen bg-white text-slate-900">
      <section className="hero-gradient relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
        <div className="mx-auto grid w-full max-w-full xl:container items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
              <Sparkles size={16} /> <span>New Arrivals are here!</span>
            </div>
            <h1 className="font-display text-5xl leading-[1.1] font-bold text-slate-900 lg:text-7xl">
              Everything your <br />
              <span className="text-orange-500 underline decoration-emerald-200 underline-offset-8">
                Best Friend
              </span>{' '}
              Needs
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-slate-600">
              Quality food, cozy beds, and interactive toys designed to keep
              your pets healthy, happy, and active every single day.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#shop"
                className="transform rounded-full bg-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-200 transition-all hover:-translate-y-1 hover:bg-emerald-600"
              >
                Shop Now
              </a>
              <a
                href="#"
                className="rounded-full border-2 border-slate-200 px-8 py-4 text-lg font-bold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-500"
              >
                Watch Video
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-orange-100 opacity-30 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-emerald-100 opacity-30 blur-3xl" />
            <div className="relative rotate-2 overflow-hidden rounded-[3rem] bg-emerald-100/50 p-6 transition-transform duration-500 hover:rotate-0">
              <img
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80"
                alt="Happy Golden Retriever"
                className="h-[500px] w-full rounded-[2.5rem] object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-20">
        <div className="mx-auto w-full max-w-full xl:container px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="font-display mb-2 text-3xl font-bold">
                Shop by Category
              </h2>
              <p className="text-slate-500">
                Explore our wide range of pet supplies
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-1 font-bold text-emerald-600 hover:underline"
            >
              View All
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href="#"
                className={`group relative rounded-3xl p-8 text-center transition-all ${cat.bg}`}
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm transition-transform group-hover:scale-110">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold">{cat.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{cat.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-full xl:container px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold">
              Featured Favorites
            </h2>
            <p className="mx-auto max-w-2xl text-slate-500">
              Handpicked premium quality products for your lovely pets. From
              grain-free food to eco-friendly toys.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.title}
                className="product-card group rounded-3xl bg-white p-4 transition-all hover:shadow-2xl hover:shadow-emerald-100/50"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.badge ? (
                    <div className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                      {product.badge}
                    </div>
                  ) : null}
                  <div className="cart-btn absolute inset-x-4 bottom-4">
                    <button
                      type="button"
                      className="w-full rounded-xl bg-emerald-500 py-3 font-bold text-white shadow-lg transition-all hover:bg-emerald-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="mt-4 px-2">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-800">
                      {product.title}
                    </h3>
                    <span className="text-lg font-bold text-emerald-600">
                      {product.price}
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-slate-500">{product.meta}</p>
                  <p className="text-xs font-medium text-orange-400">
                    {product.rating}{' '}
                    <span className="ml-1 text-slate-400">
                      {product.reviews}
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-full xl:container px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold">
              Words from Pet Parents
            </h2>
            <p className="text-slate-500">
              Don&apos;t just take our word for it - ask our happy customers!
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className={`relative rounded-[2.5rem] border p-8 ${item.card}`}
              >
                <p className="mb-6 text-lg leading-relaxed italic text-slate-700">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="deals" className="py-16">
        <div className="mx-auto w-full max-w-full xl:container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 rounded-[3rem] border border-white/20 bg-emerald-500 p-8 lg:flex-row lg:p-16">
            <div className="space-y-4 text-white">
              <h2 className="font-display text-4xl font-bold">
                Join our Furry Family!
              </h2>
              <p className="text-lg text-emerald-50 opacity-90">
                Subscribe to get 15% off your first order and weekly pet care
                tips.
              </p>
            </div>
            <form className="flex w-full gap-2 lg:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border-none bg-white px-6 py-4 font-medium text-slate-800 outline-none transition-all focus:ring-4 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="rounded-full bg-orange-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-orange-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
