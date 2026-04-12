import { Lightbulb, PawPrint, Sparkles } from 'lucide-react'

import { useLayoutEffect, useRef, useState } from 'react'

import {
  LOADING_SCREEN_DOCUMENT_TITLE,
  LOADING_SCREEN_PROGRESS_MS,
} from '#/lib/loading-screen'

import { defaultTip, DecorativePaws, STATUS_STAGES } from './helper'

import { cn } from '#/lib/utils'

const LAST_STAGE = STATUS_STAGES[STATUS_STAGES.length - 1]

const LAST_STAGE_INDEX = STATUS_STAGES.length - 1

export function LoadingScreen({
  className,
  message = 'Dashboard is waking up',
  subMessage,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)

  useLayoutEffect(() => {
    const previousTitle = document.title
    document.title = LOADING_SCREEN_DOCUMENT_TITLE

    const start = performance.now()
    const durationMs = LOADING_SCREEN_PROGRESS_MS

    const tick = () => {
      const elapsed = performance.now() - start
      const linear = Math.min(1, elapsed / durationMs)
      const eased = 1 - (1 - linear) ** 2.4
      setProgress(linear >= 1 ? 100 : eased * 100)
      if (linear < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.title = previousTitle
    }
  }, [])

  const complete = progress >= 100
  const stageIndex = Math.min(
    LAST_STAGE_INDEX,
    Math.floor((Math.min(progress, 99.99) / 100) * LAST_STAGE_INDEX),
  )
  const status = complete
    ? { label: 'Ready!' as const, detail: LAST_STAGE.detail }
    : STATUS_STAGES[stageIndex]

  const pct = Math.floor(progress)

  const cardClass =
    'relative w-full max-w-md overflow-hidden rounded-[48px] border border-white/40 bg-white/60 p-12 text-center shadow-[0_20px_40px_-10px_rgba(16,185,129,0.1)] backdrop-blur-md'

  return (
    <div
      className={cn(
        'flex min-h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#f3faf5] to-[#e7f0e8] p-6 font-sans text-[#173a40]',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div className={cardClass}>
        <DecorativePaws />

        <div className="relative mx-auto flex flex-col items-center space-y-8">
          <div className="relative shrink-0">
            <div className="loading-paw-bounce flex h-24 w-24 items-center justify-center rounded-[32px] bg-white shadow-xl shadow-emerald-500/10">
              <PawPrint
                className="size-12 text-emerald-500"
                strokeWidth={2}
                aria-hidden
              />
            </div>
            <Sparkles
              className="absolute -top-2 -right-2 size-7 text-[#ff6b35] animate-pulse"
              aria-hidden
            />
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#173a40]">
              Pawsome Shop
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-medium text-gray-400">
                {message}
              </span>
              <div className="flex gap-1" aria-hidden>
                <span className="loading-dot-bounce loading-dot-bounce-delay-1" />
                <span className="loading-dot-bounce loading-dot-bounce-delay-2" />
                <span className="loading-dot-bounce" />
              </div>
            </div>
          </div>

          <div className="w-full space-y-4 pt-4">
            <div className="flex items-end justify-between px-1">
              <span
                className={cn(
                  'text-[11px] font-bold tracking-widest uppercase transition-colors duration-500',
                  complete ? 'text-[#ff6b35]' : 'text-emerald-500',
                )}
              >
                {status.label}
              </span>
              <span className="text-lg font-bold text-[#173a40]">{pct}%</span>
            </div>

            <div className="mx-auto h-2 w-[min(100%,300px)] overflow-hidden rounded-full bg-emerald-500/10">
              <div
                className="relative h-full w-full origin-left rounded-full bg-emerald-500 will-change-transform"
                style={{
                  transform: `scaleX(${Math.max(0.02, pct / 100)})`,
                  transition: 'transform 120ms ease-out',
                }}
              >
                <span
                  className="loading-shine pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                  aria-hidden
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 italic transition-opacity duration-300">
              {status.detail}
            </p>
          </div>

          <div className="w-full pt-4">
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100/50 bg-emerald-50 px-6 py-3 text-left">
              <Lightbulb
                className="size-5 shrink-0 text-[#ff6b35]"
                aria-hidden
              />
              <p className="text-[10px] leading-tight font-medium text-emerald-800">
                {subMessage ?? defaultTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
