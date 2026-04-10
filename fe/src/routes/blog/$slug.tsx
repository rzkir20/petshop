import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Mailbox,
  MessageCircle,
  PawPrint,
  Reply,
  Share2,
} from 'lucide-react'

const createBlogSlugRoute = createFileRoute as any
export const Route = createBlogSlugRoute('/blog/$slug')({
  component: RouteComponent,
})

const article = {
  slug: 'complete-guide-to-dog-training-from-puppy-to-adult',
  category: 'Dog Care',
  title: 'Complete Guide to Dog Training: From Puppy to Adult',
  date: 'November 24, 2023',
  readTime: '8 min read',
  heroImage:
    'https://images.unsplash.com/photo-1541591044564-154b7359ca30?auto=format&fit=crop&w=1920&q=80',
  author: {
    name: 'Sarah Barksworth',
    role: 'Pet Training Expert',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&h=160&q=80',
    bio: 'Certified dog trainer with 10+ years experience helping pet parents build deep bonds through positive reinforcement and scientific behavior methods.',
  },
}

const relatedPosts = [
  {
    slug: 'top-5-nutrient-rich-foods-for-growing-pups',
    title: 'Top 5 Nutrient-Rich Foods for Growing Pups',
    date: 'Nov 12, 2023',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=200&q=80',
  },
  {
    slug: 'psychology-of-play-why-dogs-fetch',
    title: 'The Psychology of Play: Why Dogs Fetch',
    date: 'Oct 28, 2023',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=200&q=80',
  },
  {
    slug: 'how-to-safely-socialize-your-new-rescue',
    title: 'How to Safely Socialize Your New Rescue',
    date: 'Oct 15, 2023',
    readTime: '12 min read',
    image:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&q=80',
  },
  {
    slug: 'winter-care-protecting-paws-from-ice',
    title: 'Winter Care: Protecting Paws from Ice',
    date: 'Dec 01, 2023',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1541888941255-250181cf8728?auto=format&fit=crop&w=200&q=80',
  },
]

function RouteComponent() {
  const { slug } = Route.useParams()

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[600px] w-full overflow-hidden lg:h-[800px]">
        <img
          src={article.heroImage}
          alt={article.title}
          className="h-full w-full object-cover"
        />
        <div className="bg-linear-to-t absolute inset-0 flex items-end from-black/60 via-transparent to-transparent">
          <div className="mx-auto w-full max-w-full px-4 pb-16 sm:px-6 lg:px-8 xl:container">
            <div className="space-y-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md transition hover:bg-white/30"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Blog
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-black tracking-widest text-white uppercase">
                  {article.category}
                </span>
                <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                  <Clock3 className="h-3.5 w-3.5" />
                  {article.readTime}
                </div>
              </div>
              <h1 className="max-w-4xl text-4xl leading-[1.1] font-bold text-white md:text-6xl lg:text-7xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-full px-4 py-20 sm:px-6 lg:px-8 xl:container">
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex-1">
            <div className="mb-12 flex flex-col items-center gap-6 border-b border-slate-100 pb-12 md:flex-row md:items-start">
              <img
                src={article.author.image}
                alt={article.author.name}
                className="h-20 w-20 rounded-full border-4 border-emerald-50 object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-slate-900">
                  {article.author.name}
                </h3>
                <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
                  {article.author.role}
                </p>
                <p className="mb-4 max-w-lg leading-relaxed text-slate-500">
                  {article.author.bio}
                </p>
                <div className="flex justify-center gap-4 text-slate-400 md:justify-start">
                  <button
                    type="button"
                    className="transition-colors hover:text-emerald-500"
                    aria-label="Share to social"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <article className="space-y-8 text-lg leading-relaxed text-slate-600">
              <p className="text-xl font-medium text-slate-900">
                Mastering the basics of canine behavior does not have to be
                overwhelming. Whether you have just brought home an 8-week-old
                bundle of energy or are looking to refine the manners of your
                mature companion, understanding the journey is the first step.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-slate-900">
                Understanding Puppy Development Stages
              </h2>
              <p>
                A puppy&apos;s brain is like a sponge, but it goes through very
                specific developmental windows. Between 3 and 16 weeks,
                socialization is paramount. This is the time to introduce them
                to new sounds, surfaces, people, and other vaccinated dogs.
              </p>

              <h2 className="mt-12 text-3xl font-bold text-slate-900">
                Positive Reinforcement Techniques
              </h2>
              <p>
                Old-school dominance theory has been debunked by modern science.
                Dogs learn best when they are motivated by rewards rather than
                fear of punishment. Rewarding a desired behavior immediately
                makes it more likely to happen again.
              </p>

              <div className="my-12 overflow-hidden rounded-[2.5rem] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&h=600&q=80"
                  alt="Training session"
                  className="h-[400px] w-full object-cover lg:h-[600px]"
                />
              </div>

              <blockquote className="my-12 rounded-r-3xl border-l-8 border-emerald-500 bg-emerald-50/30 py-4 pl-8">
                <p className="text-2xl leading-relaxed font-bold text-slate-800 italic">
                  The key to successful dog training is patience and
                  consistency. A single perfect sit today is better than an hour
                  of frustrated repetitions.
                </p>
                <cite className="mt-4 block text-sm font-bold tracking-wider text-emerald-600 not-italic uppercase">
                  - Sarah Barksworth, Pawsome Wisdom
                </cite>
              </blockquote>

              <h3 className="mt-10 text-2xl font-bold text-slate-900">
                Common Challenges: Pulling on Leash
              </h3>
              <p>
                Leash pulling is often the top complaint among dog owners.
                Become a tree the moment the leash goes taut, and only move
                forward when tension disappears. Dogs quickly learn that pulling
                is the fastest way to stop moving.
              </p>
            </article>

            <div className="mt-16 flex flex-wrap gap-3 border-t border-slate-100 pt-12">
              {[
                '#DogTraining',
                '#PuppyCare',
                '#Behavior',
                '#PositiveReinforcement',
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-2xl bg-emerald-50 px-5 py-2 text-sm font-bold text-emerald-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <section className="mt-20 space-y-12">
              <h2 className="text-3xl font-bold text-slate-900">
                Comments (3)
              </h2>
              <div className="space-y-6">
                {[
                  {
                    name: 'John Peterson',
                    date: 'Nov 26, 2023',
                    text: 'Great article! The leash pulling technique worked within three days of consistent practice.',
                    image:
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
                  },
                  {
                    name: 'Maria Chen',
                    date: 'Nov 27, 2023',
                    text: 'I appreciate the focus on socialization windows. Very useful guidance for new pet parents.',
                    image:
                      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
                  },
                  {
                    name: 'David Thorne',
                    date: 'Nov 28, 2023',
                    text: "Wonderful insights. I'd love another article on senior dog training habits.",
                    image:
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
                  },
                ].map((comment) => (
                  <article
                    key={comment.name}
                    className="flex gap-6 rounded-4xl bg-slate-50 p-8"
                  >
                    <img
                      src={comment.image}
                      alt={comment.name}
                      className="h-12 w-12 rounded-full border-2 border-white object-cover"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-slate-900">
                          {comment.name}
                        </h4>
                        <span className="text-xs font-bold text-slate-400 uppercase">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-slate-600">{comment.text}</p>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-12 rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
                <h3 className="mb-8 text-2xl font-bold text-slate-900">
                  Leave a Comment
                </h3>
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="ml-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="ml-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="ml-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Comment
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Share your thoughts or questions..."
                      className="w-full rounded-3xl border border-slate-100 bg-slate-50 px-6 py-4 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-2xl bg-emerald-500 px-10 py-4 font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-600"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </section>
          </div>

          <aside className="w-full space-y-12 lg:w-[400px]">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 text-center text-white">
              <PawPrint className="absolute -top-6 -right-6 h-36 w-36 rotate-12 text-white/5" />
              <div className="relative z-10">
                <img
                  src={article.author.image}
                  alt={article.author.name}
                  className="mx-auto mb-6 h-24 w-24 rounded-full border-4 border-emerald-500 object-cover"
                />
                <h3 className="mb-1 text-2xl font-bold">
                  {article.author.name}
                </h3>
                <p className="mb-6 text-sm font-bold tracking-widest text-emerald-400 uppercase">
                  {article.author.role}
                </p>
                <p className="mb-8 text-sm leading-relaxed text-slate-400">
                  Specializing in canine psychology and holistic pet care. Join
                  my community for weekly pet hacks and training guides.
                </p>
                <button
                  type="button"
                  className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white shadow-lg shadow-orange-900/40 transition-all hover:bg-orange-600"
                >
                  Follow Sarah
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                <MessageCircle className="h-6 w-6 text-emerald-500" />
                Related Posts
              </h3>
              <div className="space-y-6">
                {relatedPosts.map((post) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex items-center gap-4"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="line-clamp-2 leading-snug font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
                        {post.title}
                      </h4>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                          {post.date}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6 rounded-[2.5rem] border border-orange-100 bg-orange-50 p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500 text-white shadow-lg shadow-orange-200">
                <Mailbox className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  Join the Pack
                </h3>
                <p className="text-slate-500">
                  Get the latest pet care tips and exclusive deals delivered to
                  your inbox.
                </p>
              </div>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-2xl border border-slate-100 bg-white px-6 py-4 outline-none transition-all focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white shadow-xl shadow-orange-100 transition-all hover:bg-orange-600"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {slug !== article.slug ? (
        <p className="pb-12 text-center text-sm text-slate-400">
          You are viewing placeholder content for slug: <b>{slug}</b>
        </p>
      ) : null}
    </main>
  )
}
