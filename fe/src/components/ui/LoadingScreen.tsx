import { PawPrint } from 'lucide-react'

import { cn } from '#/lib/utils'

type LoadingScreenProps = {
  className?: string
  message?: string
  subMessage?: string
}

export function LoadingScreen({
  className,
  message = 'Loading…',
  subMessage = 'Getting everything ready for you and your pets',
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white text-slate-900',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="pointer-events-none absolute -top-40 left-[10%] h-112 w-mdrounded-full bg-emerald-200/45 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -bottom-32 h-88 w-88 rounded-full bg-orange-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 hero-gradient"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center gap-20 px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-200/90">
            <PawPrint size={28} strokeWidth={2.2} aria-hidden />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-display text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Pawsome<span className="text-emerald-500">Shop</span>
            </p>
            <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              Premium pet supplies & care
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div
            className="relative flex h-18 w-18 items-center justify-center"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full border-[3px] border-emerald-100" />
            <div className="absolute inset-0 animate-[spin_0.85s_linear_infinite] rounded-full border-[3px] border-transparent border-t-emerald-500 border-r-orange-400" />
            <div className="absolute inset-2 rounded-full border-2 border-emerald-50/80" />
            <div className="absolute inset-2 animate-[spin_1.25s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-teal-400/70 border-l-emerald-300/50" />
          </div>

          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500 delay-150" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-orange-400 delay-300" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="font-display text-lg font-semibold text-slate-800">
            {message}
          </p>
          <p className="text-sm leading-relaxed text-slate-500">{subMessage}</p>
        </div>
      </div>
    </div>
  )
}
