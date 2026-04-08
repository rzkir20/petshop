import { createFileRoute } from '@tanstack/react-router'

import { ArrowRight, Clock3 } from 'lucide-react'

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
})

const posts = [
  {
    title: 'How to Choose the Right Food for Your Dog',
    excerpt:
      'A practical guide to understanding labels, ingredients, and portion sizes for different life stages.',
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
    category: 'Nutrition',
    readTime: '6 min read',
  },
  {
    title: 'Indoor Enrichment Ideas for Cats',
    excerpt:
      'Keep your cats mentally active with simple toys, climbing zones, and feeding games at home.',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
    category: 'Cat Care',
    readTime: '5 min read',
  },
  {
    title: 'Beginner Tips for Setting Up a Healthy Aquarium',
    excerpt:
      'Learn water cycling basics, fish compatibility, and filtration essentials before your first setup.',
    image:
      'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=80',
    category: 'Aquatic',
    readTime: '7 min read',
  },
]

function BlogPage() {
  return (
    <>
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            PawsomeShop Blog
          </p>
          <h1 className="font-display mb-4 text-5xl font-bold">
            Pet Care Stories & Tips
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Helpful articles from our team to keep your pets healthy, happy, and
            active.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-full xl:container space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="h-full min-h-[280px] w-full object-cover"
            />
            <div className="p-8 lg:p-10 flex justify-between flex-col">
              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wider text-emerald-600 uppercase">
                  Featured
                </span>
                <h2 className="font-display mt-4 mb-3 text-3xl font-bold">
                  {posts[0].title}
                </h2>
                <p className="mb-5 leading-relaxed text-slate-600">
                  {posts[0].excerpt}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                  <Clock3 size={16} />
                  {posts[0].readTime}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-bold text-emerald-600 hover:underline"
                >
                  Read Article
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.slice(1).map((post) => (
            <article
              key={post.title}
              className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-52 w-full rounded-2xl object-cover"
              />
              <div className="pt-5">
                <p className="mb-2 text-xs font-bold tracking-widest text-emerald-600 uppercase">
                  {post.category}
                </p>
                <h3 className="font-display mb-2 text-2xl font-bold">
                  {post.title}
                </h3>
                <p className="mb-4 text-slate-600">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                    <Clock3 size={15} />
                    {post.readTime}
                  </p>
                  <a
                    href="#"
                    className="font-semibold text-emerald-600 hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-[2.5rem] container mx-auto bg-slate-900 p-8 text-white md:p-10">
          <h2 className="font-display mb-3 text-3xl font-bold">
            Get Weekly Pet Tips
          </h2>
          <p className="mb-6 max-w-2xl text-slate-300">
            Subscribe for trusted advice, product picks, and seasonal care
            checklists.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-2xl border-none bg-white px-6 py-4 text-slate-900 outline-none"
            />
            <button
              type="submit"
              className="rounded-2xl bg-emerald-500 px-8 py-4 font-bold text-white transition-colors hover:bg-emerald-600"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>
    </>
  )
}
