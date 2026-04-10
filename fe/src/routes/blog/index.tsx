import { Link, createFileRoute } from '@tanstack/react-router'

import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Gift,
  Mail,
  Newspaper,
  PawPrint,
  Tag,
} from 'lucide-react'

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

const featuredPost = {
  slug: 'complete-guide-to-dog-training-from-puppy-to-adult',
  title: 'Complete Guide to Dog Training: From Puppy to Adult',
  excerpt:
    "Mastering the basics of canine behavior doesn't have to be overwhelming. From potty training to leash manners, learn positive reinforcement techniques that build a lifelong bond.",
  image:
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
  author: 'Sarah Barksworth',
  authorImage:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=48&h=48&q=80',
  date: 'Nov 24, 2023',
  readTime: '8 min read',
}

const blogPosts = [
  {
    slug: 'ultimate-cat-nutrition-guide-grain-free-vs-traditional',
    title: 'The Ultimate Cat Nutrition Guide: Grain-Free vs Traditional',
    excerpt:
      'Is grain-free really better for your feline? We break down cat diet science and how to read those complicated labels.',
    category: 'Cat Care',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    author: 'James Whisker',
    authorImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&h=32&q=80',
    date: 'Nov 20, 2023',
    readTime: '5 min read',
  },
  {
    slug: 'setting-up-your-first-freshwater-aquarium',
    title: 'Setting Up Your First Freshwater Aquarium',
    excerpt:
      'Everything you need to know about tank cycling, water parameters, and choosing the perfect habitat for aquatic friends.',
    category: 'Fish Care',
    image:
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80',
    author: 'Aquatic Alex',
    authorImage:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=32&h=32&q=80',
    date: 'Nov 18, 2023',
    readTime: '6 min read',
  },
  {
    slug: 'common-bird-illnesses-what-to-watch-for',
    title: 'Common Bird Illnesses: What to Watch For',
    excerpt:
      'Birds are masters of hiding sickness. Learn subtle behavioral changes and physical signs your bird needs a vet.',
    category: 'Pet Health',
    image:
      'https://images.unsplash.com/photo-1552728089-57bdde30fc3a?auto=format&fit=crop&w=600&q=80',
    author: 'Dr. Feather',
    authorImage:
      'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=32&h=32&q=80',
    date: 'Nov 15, 2023',
    readTime: '4 min read',
  },
  {
    slug: 'best-chew-toys-for-teething-puppies-in-2023',
    title: 'Best Chew Toys for Teething Puppies in 2023',
    excerpt:
      "Save your furniture and soothe your pup's gums with top-rated chew toy recommendations for growing dogs.",
    category: 'Dog Care',
    image:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
    author: 'Sarah B.',
    authorImage:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=32&h=32&q=80',
    date: 'Nov 12, 2023',
    readTime: '5 min read',
  },
  {
    slug: 'understanding-cat-body-language-the-tail',
    title: 'Understanding Cat Body Language: The Tail',
    excerpt:
      'What is your cat trying to tell you when they twitch, puff, or wrap their tail? A deep dive into feline communication.',
    category: 'Cat Care',
    image:
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=600&q=80',
    author: 'Leo Paws',
    authorImage:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=32&h=32&q=80',
    date: 'Nov 10, 2023',
    readTime: '7 min read',
  },
  {
    slug: 'essential-grooming-tools-every-owner-needs',
    title: '5 Essential Grooming Tools Every Owner Needs',
    excerpt:
      "Professional results at home start with the right brush. See which grooming tools are worth the investment for your pet's coat.",
    category: 'Pet Nutrition',
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80',
    author: 'Bella Groom',
    authorImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=32&h=32&q=80',
    date: 'Nov 05, 2023',
    readTime: '4 min read',
  },
]

const recentPosts = [
  {
    slug: 'why-your-hamster-is-sleeping-all-day',
    title: 'Why Your Hamster is Sleeping All Day',
    date: 'Nov 22, 2023',
    image:
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=200&q=80',
  },
  {
    slug: 'top-10-fish-species-for-beginners',
    title: 'Top 10 Fish Species for Beginners',
    date: 'Nov 19, 2023',
    image:
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=200&q=80',
  },
  {
    slug: 'benefits-of-raw-pet-food',
    title: 'The Benefits of Raw Pet Food',
    date: 'Nov 15, 2023',
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=200&q=80',
  },
  {
    slug: 'how-to-travel-with-your-cat-stress-free',
    title: 'How to Travel with Your Cat Stress-Free',
    date: 'Nov 10, 2023',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80',
  },
  {
    slug: 'training-your-parrot-to-talk-like-a-pro',
    title: 'Training Your Parrot to Talk Like a Pro',
    date: 'Nov 05, 2023',
    image:
      'https://images.unsplash.com/photo-1552728089-57bdde30fc3a?auto=format&fit=crop&w=200&q=80',
  },
]

const categories = [
  'Dog Care',
  'Cat Care',
  'Fish Care',
  'Bird Care',
  'Pet Health',
  'Pet Nutrition',
]

function BlogPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-emerald-50/50 pt-20 pb-12">
        <div className="mx-auto w-full max-w-full px-4 text-center sm:px-6 lg:px-8 xl:container">
          <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold tracking-widest text-emerald-700 uppercase">
            Pawsome Wisdom
          </span>
          <h1 className="font-display mb-6 text-5xl font-bold text-slate-900 md:text-7xl">
            Pet Care <span className="text-emerald-600">Tips & Stories</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-600">
            Your daily dose of pet happiness. Discover expert advice on
            nutrition, training, and heartwarming stories from the pet
            community.
          </p>
        </div>
        <PawPrint className="absolute -top-10 -right-10 h-72 w-72 rotate-12 text-emerald-500/5" />
        <PawPrint className="absolute -bottom-4 -left-10 h-52 w-52 -rotate-12 text-orange-500/5" />
      </section>

      <section className="mx-auto w-full max-w-full px-4 py-16 sm:px-6 lg:px-8 xl:container">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1 space-y-16">
            <article className="group overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl">
              <div className="flex flex-col xl:flex-row">
                <div className="overflow-hidden xl:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full min-h-[350px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-10 xl:w-1/2">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="rounded-lg bg-orange-100 px-3 py-1 text-xs font-black tracking-widest text-orange-600 uppercase">
                      Featured
                    </span>
                    <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold tracking-tight text-slate-500 uppercase">
                      <Clock3 className="h-3.5 w-3.5 text-emerald-500" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <h2 className="mb-4 text-3xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-emerald-600 md:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-8 leading-relaxed text-slate-600">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        className="h-10 w-10 rounded-full border-2 border-emerald-500 object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold tracking-tight text-slate-900">
                          {featuredPost.author}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase">
                          {featuredPost.date}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`/blog/${featuredPost.slug}`}
                      className="rounded-2xl bg-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-600"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {blogPosts.map((post) => (
                <article
                  key={post.title}
                  className="group overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-100/50"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="mb-4 flex items-center gap-3 text-xs font-bold tracking-tight text-slate-400 uppercase">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                        {post.date}
                      </div>
                      <span className="text-slate-200">|</span>
                      <div className="flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5 text-emerald-500" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="mb-3 line-clamp-2 text-2xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                      {post.title}
                    </h3>
                    <p className="mb-6 line-clamp-3 leading-relaxed text-slate-500">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="h-8 w-8 rounded-full border border-emerald-50 object-cover"
                        />
                        <span className="text-sm font-bold text-slate-700">
                          {post.author}
                        </span>
                      </div>
                      <a
                        href={`/blog/${post.slug}`}
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all hover:bg-emerald-500 hover:text-white"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                type="button"
                className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-slate-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    page === 1
                      ? 'flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-100'
                      : 'flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-white font-bold text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500'
                  }
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-white text-slate-600 transition-all hover:border-emerald-500 hover:text-emerald-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <aside className="w-full shrink-0 space-y-12 lg:w-96">
            <section className="rounded-[2.5rem] border border-slate-100 bg-white p-8">
              <h3 className="mb-8 flex items-center gap-2 text-xl font-bold text-slate-900">
                <Newspaper className="h-5 w-5 text-emerald-500" />
                Recent Posts
              </h3>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <a
                    key={post.title}
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-4"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="line-clamp-2 font-bold leading-snug text-slate-800 transition-colors group-hover:text-emerald-600">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                        {post.date}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-[2.5rem] bg-slate-900 p-8 text-white">
              <h3 className="mb-8 flex items-center gap-2 text-xl font-bold">
                <Tag className="h-5 w-5 text-emerald-400" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold transition-all hover:bg-emerald-500"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[2.5rem] border border-orange-100 bg-orange-50 p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-100">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-slate-900">
                Subscribe to Pet Tips
              </h3>
              <p className="mb-8 text-sm leading-relaxed text-slate-500">
                Get the latest pet care hacks and exclusive discounts delivered
                to your inbox every week.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-2xl border border-slate-100 bg-white px-6 py-4 font-medium outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white shadow-xl shadow-orange-100 transition-all hover:bg-orange-600"
                >
                  Subscribe Now
                </button>
              </form>
            </section>

            <section className="relative overflow-hidden rounded-[2.5rem] bg-emerald-500 p-8 text-white">
              <Gift className="absolute -right-6 -bottom-6 h-28 w-28 rotate-12 text-white/20" />
              <p className="mb-2 text-[10px] font-black tracking-[0.2em] uppercase opacity-80">
                Exclusive Offer
              </p>
              <h3 className="relative z-10 mb-4 text-2xl leading-tight font-bold">
                First Order? Get 15% Off Grooming!
              </h3>
              <Link
                to="/deals"
                className="relative z-10 inline-block rounded-xl bg-white px-6 py-2 text-sm font-bold text-emerald-600 transition-colors hover:bg-emerald-50"
              >
                Claim Now
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  )
}
