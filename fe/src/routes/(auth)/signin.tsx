import {
  Navigate,
  createFileRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router'

import {
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  PawPrint,
  ShieldCheck,
} from 'lucide-react'
import React, { useId, useState } from 'react'

import { useAuth } from '../../context/AuthContext'

import {
  getSession,
  usePasswordFieldVisibility,
} from '../../services/auth.service'

export const Route = createFileRoute('/(auth)/signin')({
  validateSearch: (search: Record<string, unknown>) => ({
    reauth: search.reauth === '1' ? ('1' as const) : undefined,
  }),
  beforeLoad: async ({ search }) => {
    // After password change we force re-login; skip "already logged in" redirect.
    if (search.reauth === '1') return
    try {
      await getSession()
    } catch {
      // No active session, stay on auth page.
      return
    }
    throw redirect({ to: '/dashboard' })
  },
  component: SignInPage,
})

function SignInPage() {
  const navigate = useNavigate()
  const { signin, status } = useAuth()
  const errorId = useId()
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const passwordField = usePasswordFieldVisibility()

  if (status === 'loading') return null
  if (status === 'authenticated') return <Navigate to="/dashboard" />

  const perks = [
    'Track your orders in real time',
    'Save favorites and repeat orders faster',
    'Get personalized pet care recommendations',
  ]

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await signin({
        email: form.email.trim(),
        password: form.password.trim(),
      })
      await navigate({ to: '/dashboard' })
    } catch {
      // Pesan error dari AuthContext (react-hot-toast)
    } finally {
      setSubmitting(false)
    }
  }

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

            <form className="space-y-5" onSubmit={onSubmit}>
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
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    autoComplete="email"
                    required
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
                <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-4">
                  <LockKeyhole className="h-4 w-4 shrink-0 text-slate-400" />
                  <input
                    id="password"
                    type={passwordField.inputType}
                    placeholder="Enter your password"
                    className="min-w-0 flex-1 border-none bg-transparent px-2 py-3.5 outline-none"
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="shrink-0 p-1 text-slate-400 hover:text-slate-600"
                    onClick={passwordField.toggleVisibility}
                    aria-label={
                      passwordField.visible
                        ? 'Sembunyikan kata sandi'
                        : 'Tampilkan kata sandi'
                    }
                  >
                    {passwordField.visible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-emerald-500"
                    checked={form.remember}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        remember: e.target.checked,
                      }))
                    }
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

              {error ? (
                <p
                  id={errorId}
                  role="alert"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 py-3.5 font-bold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={submitting}
                aria-describedby={error ? errorId : undefined}
              >
                {submitting ? 'Signing in…' : 'Sign In'}
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
