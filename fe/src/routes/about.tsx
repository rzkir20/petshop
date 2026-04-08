import { createFileRoute } from '@tanstack/react-router'
import { HeartHandshake, Leaf, ShieldCheck, Users } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  const values = [
    {
      title: 'Pet-First Quality',
      description:
        'Every product is selected for safety, comfort, and long-term health outcomes.',
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Care With Empathy',
      description:
        'We treat every customer like a fellow pet parent and every pet like family.',
      icon: <HeartHandshake className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Sustainable Choices',
      description:
        'We prioritize eco-friendly packaging and responsible sourcing when possible.',
      icon: <Leaf className="h-6 w-6 text-emerald-600" />,
    },
  ]

  return (
    <>
      <section className="bg-emerald-50/50 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-bold tracking-wider text-emerald-600 uppercase">
            About PawsomeShop
          </p>
          <h1 className="font-display mb-4 text-5xl font-bold">
            Built by Pet Lovers, for Pet Lovers
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            Our mission is simple: make premium pet care products easier to
            access, understand, and trust for every pet parent.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-full xl:container space-y-12 px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 items-center gap-8 rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm lg:grid-cols-2 lg:p-10">
          <div>
            <h2 className="font-display mb-4 text-3xl font-bold">Our Story</h2>
            <p className="mb-4 leading-relaxed text-slate-600">
              PawsomeShop started as a small community project helping local pet
              owners find safer food and better essentials. What began as a
              curated list of recommendations quickly grew into a trusted
              destination for pet care.
            </p>
            <p className="leading-relaxed text-slate-600">
              Today, we continue to combine expert guidance, quality products,
              and friendly support so every pet can live a healthier and happier
              life.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1516734212186-65266f7f59ee?auto=format&fit=crop&w=1200&q=80"
            alt="Pet team"
            className="h-full min-h-[280px] w-full rounded-3xl object-cover"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3">
                {value.icon}
              </div>
              <h3 className="font-display mb-2 text-xl font-bold">
                {value.title}
              </h3>
              <p className="text-slate-600">{value.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[2.5rem] bg-slate-900 p-8 text-white md:p-10">
          <h2 className="font-display mb-6 text-3xl font-bold">
            Growing with Our Community
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
                Happy Pet Parents
              </p>
              <p className="text-3xl font-black text-emerald-400">24k+</p>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
                Products Curated
              </p>
              <p className="text-3xl font-black text-orange-400">3,500+</p>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold tracking-widest text-slate-400 uppercase">
                Support Satisfaction
              </p>
              <p className="text-3xl font-black text-emerald-400">98%</p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 font-bold text-white transition-colors hover:bg-emerald-600"
          >
            <Users className="h-5 w-5" />
            Meet Our Team
          </a>
        </section>
      </main>
    </>
  )
}
