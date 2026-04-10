import { Link, createFileRoute } from '@tanstack/react-router'

import {
  CheckCircle2,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'

const createShopSlugRoute = createFileRoute as any
export const Route = createShopSlugRoute('/shop/$slug')({
  component: RouteComponent,
})

const product = {
  slug: 'premium-grain-free-salmon-dog-food',
  category: 'Dogs',
  subCategory: 'Food',
  title: 'Premium Grain-Free Salmon & Sweet Potato Dog Food',
  price: '$54.99',
  oldPrice: '$69.99',
  discount: '20% OFF',
  status: 'IN STOCK',
  badge: 'BEST SELLER',
  reviews: '(1,248 Verified Reviews)',
  mainImage:
    'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=1000&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1583947581924-860bda6a26df?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1589924691995-400dc9cec109?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=200&q=80',
  ],
}

const relatedProducts = [
  {
    slug: 'calming-pet-bed',
    title: 'Calming Pet Bed',
    price: '$39.99',
    category: 'Dogs • Accessories',
    rating: '4.8',
    reviewCount: '(85)',
    image:
      'https://images.unsplash.com/photo-1591768793355-74d7c836049c?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'eco-friendly-leash',
    title: 'Eco-Friendly Leash',
    price: '$14.50',
    category: 'Dogs • Walking',
    rating: '4.6',
    reviewCount: '(42)',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'durable-chew-toy',
    title: 'Durable Chew Toy',
    price: '$12.00',
    category: 'Dogs • Toys',
    rating: '4.9',
    reviewCount: '(210)',
    image:
      'https://images.unsplash.com/photo-1596751303335-742b50bb8fdf?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'joint-care-treats',
    title: 'Joint Care Treats',
    price: '$22.99',
    category: 'Dogs • Supplements',
    rating: '4.7',
    reviewCount: '(134)',
    image:
      'https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=400&q=80',
  },
]

function RouteComponent() {
  const { slug } = Route.useParams()

  return (
    <main className="mx-auto w-full max-w-full bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-8 xl:container">
      <nav className="mb-8 flex text-sm font-medium text-slate-500">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="transition-colors hover:text-emerald-500">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link
              to="/shop"
              className="transition-colors hover:text-emerald-500"
            >
              {product.category}
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="text-slate-900">{product.subCategory}</li>
        </ol>
      </nav>

      <section className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <div className="group relative aspect-square overflow-hidden rounded-[3rem] bg-slate-100">
            <img
              src={product.mainImage}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-lg transition-all hover:text-red-500"
            >
              <Heart className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`aspect-square overflow-hidden rounded-3xl border-2 transition-all ${
                  index === 0
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-transparent bg-slate-100 hover:border-emerald-200'
                }`}
              >
                <img src={image} alt={`Product thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold tracking-wide text-white">
                {product.badge}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                {product.status}
              </span>
            </div>
            <h1 className="mb-4 text-4xl leading-tight font-bold text-slate-900 lg:text-5xl">
              {product.title}
            </h1>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-1 text-orange-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-medium text-slate-500">
                {product.reviews}
              </span>
            </div>
            <div className="mb-8 flex items-baseline gap-4">
              <span className="text-4xl font-bold text-emerald-600">
                {product.price}
              </span>
              <span className="text-xl text-slate-400 line-through">
                {product.oldPrice}
              </span>
              <span className="rounded-lg bg-orange-50 px-2 py-1 text-sm font-bold text-orange-500">
                {product.discount}
              </span>
            </div>

            <div className="mb-8 rounded-3xl bg-slate-50 p-6">
              <h3 className="mb-3 font-bold text-slate-800">Key Highlights:</h3>
              <ul className="space-y-2">
                {[
                  'Real Salmon is the #1 Ingredient',
                  '100% Grain-free and Gluten-free',
                  'Added Probiotics for Digestive Health',
                  'Essential Vitamins and Minerals for Immunity',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-slate-600"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 space-y-4">
              <h3 className="font-bold text-slate-800">Select Weight</h3>
              <div className="flex flex-wrap gap-3">
                {['5 kg', '12 kg', '20 kg'].map((size, index) => (
                  <button
                    key={size}
                    type="button"
                    className={`rounded-2xl border-2 px-6 py-3 font-bold transition-colors ${
                      index === 0
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center text-slate-500 transition-colors hover:text-emerald-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-lg font-bold">1</span>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center text-slate-500 transition-colors hover:text-emerald-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Link
              to="/cart"
              className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-200 transition-all active:scale-95 hover:bg-emerald-600"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Truck className="h-4 w-4 text-emerald-500" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-10 border-b border-slate-200">
          <div className="flex gap-10">
            <button className="border-b-2 border-emerald-500 pb-4 text-lg font-bold text-emerald-600">
              Description
            </button>
            <button className="border-b-2 border-transparent pb-4 text-lg font-bold text-slate-400 transition-colors hover:text-slate-600">
              Feeding Guide
            </button>
            <button className="border-b-2 border-transparent pb-4 text-lg font-bold text-slate-400 transition-colors hover:text-slate-600">
              Reviews (1.2k)
            </button>
          </div>
        </div>
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Wholesome Nutrition for Your Best Friend
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Our Premium Grain-Free Salmon & Sweet Potato recipe is crafted for
              adult dogs of all breeds. We use sustainably sourced salmon as the
              single animal protein source, making it an excellent choice for
              dogs with food sensitivities.
            </p>
            <p className="text-lg leading-relaxed text-slate-600">
              Rich in Omega-3 fatty acids, this formula supports healthy skin
              and a shiny coat. Sweet potatoes provide highly digestible energy,
              while antioxidant-rich ingredients support immunity.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="rounded-[2.5rem] bg-orange-50 p-8">
                <h4 className="mb-2 font-bold text-orange-700">Omega 3 & 6</h4>
                <p className="text-sm text-slate-600">
                  For a healthy coat and vibrant skin health that glows from
                  within.
                </p>
              </div>
              <div className="rounded-[2.5rem] bg-emerald-50 p-8">
                <h4 className="mb-2 font-bold text-emerald-700">
                  Digestive Support
                </h4>
                <p className="text-sm text-slate-600">
                  Enriched with natural fiber and probiotics for a happy tummy.
                </p>
              </div>
            </div>
          </div>
          <aside className="h-fit rounded-[3rem] bg-slate-50 p-10">
            <h3 className="mb-6 text-xl font-bold">Specifications</h3>
            <div className="space-y-4">
              {[
                ['Pet Type', 'Dogs Only'],
                ['Life Stage', 'Adult (1-7 yrs)'],
                ['Flavor', 'Salmon'],
                ['Grain-Free', 'Yes'],
                ['Weight', '5 kg / 11 lbs'],
              ].map((spec, index) => (
                <div
                  key={spec[0]}
                  className={`flex justify-between ${
                    index < 4 ? 'border-b border-slate-200 pb-3' : ''
                  }`}
                >
                  <span className="text-slate-500">{spec[0]}</span>
                  <span className="font-bold text-slate-900">{spec[1]}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-32">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">You May Also Like</h2>
            <p className="text-slate-500">
              Recommended additions for a healthy pet lifestyle
            </p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-1 font-bold text-emerald-600 hover:underline"
          >
            View More <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <article
              key={item.slug}
              className="group rounded-[2.5rem] border border-slate-50 bg-white p-4 transition-all hover:shadow-2xl hover:shadow-emerald-100/50"
            >
              <div className="relative aspect-square overflow-hidden rounded-4xl bg-slate-100">
                <a href={`/shop/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </a>
                <div className="absolute inset-x-4 bottom-4 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-bold text-white shadow-lg transition-all hover:bg-emerald-600"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="mt-4 px-2">
                <div className="mb-1 flex items-start justify-between">
                  <h3 className="text-lg font-bold text-slate-800">
                    {item.title}
                  </h3>
                  <span className="text-lg font-bold text-emerald-600">
                    {item.price}
                  </span>
                </div>
                <p className="mb-2 text-sm text-slate-500">{item.category}</p>
                <div className="flex items-center gap-1 text-orange-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-xs font-bold text-slate-900">
                    {item.rating}
                  </span>
                  <span className="ml-1 text-xs font-medium text-slate-400">
                    {item.reviewCount}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {slug !== product.slug ? (
        <p className="mt-8 text-center text-sm text-slate-400">
          You are viewing placeholder content for slug: <b>{slug}</b>
        </p>
      ) : null}
    </main>
  )
}
