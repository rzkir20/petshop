import { createFileRoute } from '@tanstack/react-router'
import {
  CheckCircle2,
  LockKeyhole,
  Mail,
  PawPrint,
  UserRound,
} from 'lucide-react'

export const Route = createFileRoute('/(auth)/signup')({
  component: SignUpPage,
})

function SignUpPage() {
  const benefits = [
    'Get member-only discounts and coupons',
    'Save multiple pet profiles for recommendations',
    'Faster checkout with saved preferences',
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-16">
        <section className="hidden rounded-[2.5rem] bg-emerald-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <PawPrint className="h-4 w-4" />
              Become a Pawsome Member
            </div>
            <h1 className="font-display mb-4 text-5xl font-bold leading-tight">
              Create your account in minutes.
            </h1>
            <p className="mb-8 max-w-md text-emerald-50">
              Unlock personalized pet care, promotions, and a faster shopping
              experience.
            </p>
            <div className="space-y-3">
              {benefits.map((item) => (
                <p key={item} className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="h-5 w-5" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-md items-center">
          <div className="w-full rounded-4xl border border-slate-100 bg-white p-8 shadow-sm">
            <p className="mb-2 text-sm font-bold tracking-wider text-emerald-600 uppercase lg:hidden">
              Join PawsomeShop
            </p>
            <h2 className="font-display mb-1 text-4xl font-bold">
              Create Account
            </h2>
            <p className="mb-6 text-slate-500">
              Set up your account to get started.
            </p>

            <form className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="fullname"
                  className="text-sm font-bold text-slate-700"
                >
                  Full Name
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                  <UserRound className="h-4 w-4 text-slate-400" />
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Your full name"
                    className="w-full border-none bg-transparent px-3 py-3.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700"
                >
                  Email Address
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border-none bg-transparent px-3 py-3.5 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700"
                >
                  Password
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                  <LockKeyhole className="h-4 w-4 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    className="w-full border-none bg-transparent px-3 py-3.5 outline-none"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Use at least 8 characters with letters and numbers.
                </p>
              </div>

              <label className="flex items-start gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-500"
                />
                I agree to the Terms of Service and Privacy Policy.
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 py-3.5 font-bold text-white transition-colors hover:bg-emerald-600"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <a
                href="/signin"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
