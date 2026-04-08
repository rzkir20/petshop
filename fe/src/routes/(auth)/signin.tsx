import { createFileRoute } from '@tanstack/react-router'

import {
  CheckCircle2,
  LockKeyhole,
  Mail,
  PawPrint,
  ShieldCheck,
} from 'lucide-react'

export const Route = createFileRoute('/(auth)/signin')({
  component: SignInPage,
})

function SignInPage() {
  const perks = [
    'Track your orders in real time',
    'Save favorites and repeat orders faster',
    'Get personalized pet care recommendations',
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto grid min-h-screen container grid-cols-1 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-16">
        <section className="hidden rounded-[2.5rem] bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <PawPrint className="h-4 w-4 text-emerald-400" />
              Welcome Back to PawsomeShop
            </div>
            <h1 className="font-display mb-4 text-5xl font-bold leading-tight">
              Sign in and continue caring better.
            </h1>
            <p className="mb-8 max-w-md text-slate-300">
              Manage orders, track deliveries, and keep all your pet essentials
              in one place.
            </p>
            <div className="space-y-3">
              {perks.map((perk) => (
                <p
                  key={perk}
                  className="flex items-center gap-2 text-slate-100"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  {perk}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-white/10 p-4">
            <p className="mb-1 text-sm font-semibold">Protected Checkout</p>
            <p className="flex items-center gap-2 text-sm text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Your account and transactions are encrypted end-to-end.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-md items-center">
          <div className="w-full rounded-4xl border border-slate-100 bg-white p-8 shadow-sm">
            <p className="mb-2 text-sm font-bold tracking-wider text-emerald-600 uppercase lg:hidden">
              Welcome Back
            </p>
            <h2 className="font-display mb-1 text-4xl font-bold">Sign In</h2>
            <p className="mb-6 text-slate-500">
              Use your email and password to access your account.
            </p>

            <form className="space-y-5">
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
                    placeholder="Enter your password"
                    className="w-full border-none bg-transparent px-3 py-3.5 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-emerald-500"
                  />
                  Remember me
                </label>
                <a
                  href="/help"
                  className="font-semibold text-emerald-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 py-3.5 font-bold text-white transition-colors hover:bg-emerald-600"
              >
                Sign In
              </button>
            </form>

            <a
              href="/"
              className="mt-8 block text-center text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-600 hover:underline"
            >
              Back to Home
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
