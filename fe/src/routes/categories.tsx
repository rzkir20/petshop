import { createFileRoute } from '@tanstack/react-router'

import { ArrowRight, Bird, Cat, Dog, Fish } from 'lucide-react'

export const Route = createFileRoute('/categories')({
  component: RouteComponent,
})

const categories = [
  {
    id: 'dogs',
    title: 'For Dogs',
    count: '1.2k+ Products',
    description:
      'From premium kibble to chew-proof toys and cozy memory foam beds, find everything your loyal companion needs to thrive.',
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    href: '/shop',
    cardClass: 'bg-orange-50 border-orange-100/50',
    chipClass: 'text-orange-600',
    textClass: 'text-orange-600',
    icon: 'dog',
  },
  {
    id: 'cats',
    title: 'For Cats',
    count: '850+ Products',
    description:
      "Discover elegant scratchers, grain-free nutrition, and interactive toys designed to satisfy your cat's natural instincts.",
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    href: '/shop',
    cardClass: 'bg-emerald-50 border-emerald-100/50',
    chipClass: 'text-emerald-600',
    textClass: 'text-emerald-600',
    icon: 'cat',
  },
  {
    id: 'fish',
    title: 'Fish & Aquatic',
    count: '420+ Products',
    description:
      'Create a vibrant underwater world with our high-tech filtration systems, decorative plants, and premium aquatic nutrition.',
    image:
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80',
    href: '/shop',
    cardClass: 'bg-blue-50 border-blue-100/50',
    chipClass: 'text-blue-600',
    textClass: 'text-blue-600',
    icon: 'fish',
  },
  {
    id: 'birds',
    title: 'For Birds',
    count: '300+ Products',
    description:
      'Keep your feathered friends singing with organic seed mixes, spacious flight cages, and interactive enrichment toys.',
    image:
      'https://images.unsplash.com/photo-1552728089-57bdde30fc3a?auto=format&fit=crop&w=600&q=80',
    href: '/shop',
    cardClass: 'bg-yellow-50 border-yellow-100/50',
    chipClass: 'text-yellow-600',
    textClass: 'text-yellow-600',
    icon: 'bird',
  },
]

function CategoryIcon({ kind }: { kind: string }) {
  if (kind === 'dog') return <Dog size={16} />
  if (kind === 'cat') return <Cat size={16} />
  if (kind === 'fish') return <Fish size={16} />
  return <Bird size={16} />
}

function RouteComponent() {
  return (
    <>
      <section className="bg-emerald-50/50 py-10">
        <div className="mx-auto w-full container px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display mb-4 text-5xl font-bold text-slate-900">
            Shop by Category
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Explore specialized collections designed for every member of your
            furry, feathery, or aquatic family.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full container px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className={`category-hero-card group relative block overflow-hidden rounded-[2.5rem] border p-8 shadow-sm lg:p-12 ${category.cardClass}`}
            >
              <div className="flex flex-col items-center gap-10 lg:flex-row">
                <div className="flex-1 space-y-4">
                  <div
                    className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm ${category.chipClass}`}
                  >
                    <CategoryIcon kind={category.icon} />
                    <span>{category.count}</span>
                  </div>
                  <h2 className="font-display text-4xl font-bold text-slate-900 lg:text-5xl">
                    {category.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-slate-600">
                    {category.description}
                  </p>
                  <div
                    className={`flex items-center gap-2 text-lg font-bold ${category.textClass}`}
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="arrow-icon h-5 w-5 transition-transform" />
                  </div>
                </div>
                <div className="aspect-square w-full lg:w-1/2">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full rounded-4xl object-cover shadow-xl"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="mx-auto w-full container px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[4rem] bg-emerald-500 p-10 lg:p-20">
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div className="text-white">
                <h2 className="font-display mb-4 text-4xl font-bold">
                  Can&apos;t decide where to start?
                </h2>
                <p className="text-xl leading-relaxed text-emerald-50 opacity-90">
                  Join our Furry Family and get personalized pet care tips and
                  15% off your first specialized order.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-3xl border-none bg-white px-8 py-5 font-medium text-slate-900 outline-none focus:ring-4 focus:ring-emerald-300"
                />
                <button
                  type="submit"
                  className="rounded-3xl bg-orange-500 px-10 py-5 font-bold text-white shadow-xl transition-all hover:bg-orange-600"
                >
                  Join Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
