import { createFileRoute } from '@tanstack/react-router'

import { ArrowRight } from 'lucide-react'

import { fetchCategories } from '#/lib/FetchData'

import {
  CARD_STYLES,
  CategoryIcon,
  inferIconKind,
} from '#/components/ui/helper'

const createCategoriesRoute = createFileRoute as any
export const Route = createCategoriesRoute('/categories/')({
  loader: async () => {
    const categories = await fetchCategories('/categories')
    return { categories }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { categories } = Route.useLoaderData()
  const activeCategories = categories.filter(
    (c: ShopCategoryItem) => c.status === 'active',
  )
  return (
    <>
      <section className="bg-emerald-50/50 py-10">
        <div className="mx-auto w-full max-w-full xl:container px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-display mb-4 text-5xl font-bold text-slate-900">
            Shop by Category
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Explore specialized collections designed for every member of your
            furry, feathery, or aquatic family.
          </p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-full xl:container px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {activeCategories.length === 0 ? (
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center text-slate-600 md:col-span-2">
              Belum ada kategori aktif.
            </div>
          ) : (
            activeCategories.map(
              (category: ShopCategoryItem, index: number) => {
                const style = CARD_STYLES[index % CARD_STYLES.length]
                return (
                  <a
                    key={category._id}
                    href={`/categories/${encodeURIComponent(category.slug)}`}
                    className={`category-hero-card group relative block overflow-hidden rounded-[2.5rem] border p-8 shadow-sm lg:p-12 ${style.cardClass}`}
                  >
                    <div className="flex flex-col items-center gap-10 lg:flex-row">
                      <div className="flex-1 space-y-4">
                        <div
                          className={`inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm ${style.chipClass}`}
                        >
                          <CategoryIcon kind={inferIconKind(category.name)} />
                          <span>
                            {category.count.toLocaleString()} Products
                          </span>
                        </div>
                        <h2 className="font-display text-4xl font-bold text-slate-900 lg:text-5xl">
                          {category.name}
                        </h2>
                        <p className="text-lg leading-relaxed text-slate-600">
                          {category.description || category.slug}
                        </p>
                        <div
                          className={`flex items-center gap-2 text-lg font-bold ${style.textClass}`}
                        >
                          <span>Explore Collection</span>
                          <ArrowRight className="arrow-icon h-5 w-5 transition-transform" />
                        </div>
                      </div>
                      <div className="aspect-square w-full lg:w-1/2">
                        <img
                          src={
                            category.image ||
                            'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=600&q=80'
                          }
                          alt={category.name}
                          className="h-full w-full rounded-4xl object-cover shadow-xl"
                        />
                      </div>
                    </div>
                  </a>
                )
              },
            )
          )}
        </div>
      </section>
      <section className="bg-slate-50 py-10">
        <div className="mx-auto w-full max-w-full xl:container px-4 sm:px-6 lg:px-8">
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
