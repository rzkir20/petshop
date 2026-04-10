import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Award,
  BadgeCheck,
  Calendar,
  Facebook,
  Heart,
  Leaf,
  Lightbulb,
  Linkedin,
  Medal,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Star,
  Twitter,
  Users,
} from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const values = [
  {
    title: 'Premium Quality',
    description:
      'We curate only the finest nutrition and durable supplies for long-term pet wellness.',
    icon: <BadgeCheck className="h-9 w-9" />,
    iconWrap: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Unwavering Trust',
    description:
      'Every product is vetted by experts and backed by thousands of verified reviews.',
    icon: <ShieldCheck className="h-9 w-9" />,
    iconWrap: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Furry Community',
    description:
      'We foster a space where pet lovers share stories, advice, and daily joy.',
    icon: <Users className="h-9 w-9" />,
    iconWrap: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Smart Innovation',
    description:
      'We embrace technology to bring smarter, safer, and easier pet care.',
    icon: <Lightbulb className="h-9 w-9" />,
    iconWrap: 'bg-purple-50 text-purple-600',
  },
]

const team = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO & Founder',
    bio: 'Lifelong dog enthusiast with 15+ years in organic pet nutrition.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Product Lead',
    bio: 'Ensures every toy and accessory meets the highest safety standards.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Customer Care Manager',
    bio: 'Committed to solving every pet parent concern with empathy.',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    name: 'David Thorne',
    role: 'Sustainability Officer',
    bio: 'Leading our mission for eco-friendly and plastic-free packaging.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=800&q=80',
  },
]

function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-emerald-50/50 pt-24 pb-20">
        <div className="relative z-10 mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                <Heart className="h-4 w-4 fill-current" />
                Our Heart for Your Pets
              </div>
              <h1 className="text-5xl leading-[1.1] font-bold text-slate-900 lg:text-7xl">
                Empowering <span className="text-emerald-600">Pet Lovers</span>{' '}
                Everywhere
              </h1>
              <p className="mx-auto max-w-xl text-xl leading-relaxed text-slate-600 lg:mx-0">
                PawsomeShop is your trusted destination for premium pet
                supplies. We do not just sell products, we cultivate a community
                built on love, quality, and well-being.
              </p>
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <a
                  href="#story"
                  className="rounded-2xl bg-emerald-500 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-600"
                >
                  Our Story
                </a>
                <a
                  href="#team"
                  className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-500"
                >
                  Meet the Team
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-emerald-200/30 blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80"
                alt="Pet lovers"
                className="relative h-[500px] w-full rounded-[3rem] border-8 border-white object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
        <PawPrint className="absolute top-10 right-10 h-52 w-52 rotate-12 text-emerald-500/5" />
        <PawPrint className="absolute bottom-10 left-10 h-40 w-40 -rotate-12 text-orange-500/5" />
      </section>

      <section className="py-24">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="mx-auto mb-20 max-w-3xl space-y-4 text-center">
            <h2 className="text-4xl font-bold text-slate-900 lg:text-5xl">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-500">
              Everything we do is guided by principles that keep your pets
              healthier and happier.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <article
                key={item.title}
                className="rounded-[2.5rem] border border-slate-100 bg-white p-10 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-100/50"
              >
                <div
                  className={`mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-4xl ${item.iconWrap}`}
                >
                  {item.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="story" className="bg-slate-50 py-24">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div className="space-y-12">
              <div>
                <h2 className="mb-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                  Our Journey From{' '}
                  <span className="text-emerald-600">Heart to Home</span>
                </h2>
                <p className="text-lg leading-relaxed text-slate-600">
                  What started in a small garage with a big dream has grown into
                  a nationwide community of pet enthusiasts.
                </p>
              </div>
              <div className="space-y-10">
                {[
                  [
                    '2014',
                    'The Spark',
                    'Founded by Sarah Jenkins with a mission to bring organic treats to neighborhood pets.',
                  ],
                  [
                    '2018',
                    'Going Digital',
                    'Launched our first online shop and expanded our product range to more families.',
                  ],
                  [
                    'Today',
                    'Nationwide Impact',
                    'Serving over 100,000 customers with multi-hub distribution and sustainable products.',
                  ],
                ].map((step, index) => (
                  <div key={step[0]} className="flex gap-6">
                    <div
                      className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-black shadow-sm ${
                        index === 2
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white text-emerald-600'
                      }`}
                    >
                      {step[0]}
                    </div>
                    <div className="pt-1">
                      <h4 className="mb-2 text-xl font-bold text-slate-900">
                        {step[1]}
                      </h4>
                      <p className="text-slate-500">{step[2]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <img
                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80"
                className="aspect-4/5 rounded-4xl object-cover"
              />
              <div className="space-y-6 pt-12">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80"
                  className="aspect-square rounded-4xl object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80"
                  className="aspect-square rounded-4xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="py-24">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="mx-auto mb-20 max-w-3xl space-y-4 text-center">
            <h2 className="text-4xl font-bold text-slate-900 lg:text-5xl">
              Meet the Alpha Pack
            </h2>
            <p className="text-lg text-slate-500">
              The passionate humans behind the platform who work tirelessly for
              your pets.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article key={member.name} className="group">
                <div className="relative mb-6 overflow-hidden rounded-[2.5rem]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-96 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="bg-linear-to-t absolute inset-0 flex items-end from-emerald-900/80 to-transparent p-8 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex gap-4 text-white">
                      <Linkedin className="h-5 w-5" />
                      <Twitter className="h-5 w-5" />
                      <Facebook className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {member.name}
                </h3>
                <p className="mb-3 font-bold text-emerald-600">{member.role}</p>
                <p className="text-sm text-slate-500">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-600 py-24">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Words from Our Pack
            </h2>
            <p className="text-emerald-50 opacity-90">
              See what our amazing community of pet parents has to say.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              [
                '“PawsomeShop changed how I shop for my golden retriever. The quality is unmatched.”',
                'Amanda G.',
              ],
              [
                '“Their customer service is incredible. They solved my order issue overnight.”',
                'Robert L.',
              ],
              [
                '“I love the eco-friendly focus. It feels better for my cat and the planet.”',
                'Jessica M.',
              ],
            ].map((item, index) => (
              <article key={item[1]} className="space-y-6 rounded-[2.5rem] bg-white p-10">
                <div className="flex text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="italic text-slate-600">{item[0]}</p>
                <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                  <img
                    src={
                      [
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80',
                      ][index]
                    }
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-900">{item[1]}</p>
                    <p className="text-xs text-slate-400">Verified Customer</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-50 py-16">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="grid grid-cols-2 items-center justify-items-center gap-8 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <Award className="h-7 w-7" />
              <span className="text-xs font-black tracking-widest uppercase">
                Certified Pet Provider
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="h-7 w-7" />
              <span className="text-xs font-black tracking-widest uppercase">
                Eco-Friendly Packing
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-7 w-7" />
              <span className="text-xs font-black tracking-widest uppercase">
                10+ Years Experience
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Medal className="h-7 w-7" />
              <span className="text-xs font-black tracking-widest uppercase">
                Award-Winning Care
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8 xl:container">
          <div className="relative overflow-hidden rounded-[3rem] bg-orange-500 p-12 text-center text-white shadow-2xl shadow-orange-200 lg:p-24">
            <Sparkles className="absolute top-0 left-0 h-40 w-40 -translate-x-1/4 -translate-y-1/4 text-white/10" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl font-bold lg:text-6xl">
                Want to join our Furry Family?
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-orange-50 opacity-90">
                Whether you need expert advice or partnership opportunities, we
                would love to hear from you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="rounded-3xl bg-white px-12 py-5 text-lg font-bold text-orange-600 shadow-xl transition-all hover:bg-orange-50"
                >
                  Get In Touch
                </Link>
                <Link
                  to="/shop"
                  className="rounded-3xl border border-orange-400/30 bg-orange-600 px-12 py-5 text-lg font-bold text-white transition-all hover:bg-orange-700"
                >
                  Browse Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
