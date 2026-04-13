import { cn } from '#/lib/utils.ts'

import { Bird, Cat, Dog, Fish, PawPrint } from 'lucide-react'

// ================================ Dashboard Settings Helper Functions ================================ //
export function settingsCardClassName(extra?: string) {
  return cn(
    'rounded-[32px] border border-emerald-50 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.12)]',
    extra,
  )
}

export function fieldInputClassName() {
  return 'rounded-2xl border border-emerald-100/80 bg-emerald-500/[0.05] px-5 py-3 text-sm transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
}

// ================================ Loading Screen Helper Functions ================================ //
export const STATUS_STAGES = [
  { label: 'Connecting…', detail: 'Establishing secure gateway…' },
  { label: 'Fetching data…', detail: 'Retrieving latest order reports…' },
  { label: 'Initializing…', detail: 'Synchronizing inventory levels…' },
  { label: 'Almost ready…', detail: 'Finalizing dashboard widgets…' },
  { label: 'Welcome!', detail: 'Redirecting to your workspace…' },
] as const

export const defaultTip = (
  <>
    Tip: You can set low stock alerts in the{' '}
    <span className="font-bold">Inventory Settings</span> to never miss a
    restock!
  </>
)

export function DecorativePaws() {
  return (
    <>
      <PawPrint
        className="pointer-events-none absolute -top-10 -right-10 size-[200px] rotate-12 text-emerald-500/6"
        strokeWidth={1}
        aria-hidden
      />
      <PawPrint
        className="pointer-events-none absolute -bottom-10 -left-10 size-[180px] -rotate-12 text-[#ff6b35]/6"
        strokeWidth={1}
        aria-hidden
      />
    </>
  )
}

// ================================ Stock Status Helper Functions ================================ //
export function statusPillClass(s: StockStatus) {
  switch (s) {
    case 'in-stock':
      return 'bg-emerald-50 text-emerald-600'
    case 'low-stock':
      return 'bg-orange-50 text-[#ff6b35]'
    case 'out-of-stock':
      return 'bg-red-50 text-red-500'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

export function statusLabel(s: StockStatus) {
  switch (s) {
    case 'in-stock':
      return 'In Stock'
    case 'low-stock':
      return 'Low Stock'
    case 'out-of-stock':
      return 'Out of Stock'
    default:
      return ''
  }
}

// ================================ Status Blog Helper Functions ================================ //
export function statusLabelBlog(s: BlogPostStatus): string {
  return s === 'published' ? 'Published' : 'Draft'
}

export function publishedAtDisplay(post: BlogPost): string {
  if (post.status !== 'published') return '—'
  const d = new Date(post.createdAt)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ================================ Category Helper Functions ================================ //
export const CARD_STYLES = [
  {
    cardClass: 'bg-orange-50 border-orange-100/50',
    chipClass: 'text-orange-600',
    textClass: 'text-orange-600',
  },
  {
    cardClass: 'bg-emerald-50 border-emerald-100/50',
    chipClass: 'text-emerald-600',
    textClass: 'text-emerald-600',
  },
  {
    cardClass: 'bg-blue-50 border-blue-100/50',
    chipClass: 'text-blue-600',
    textClass: 'text-blue-600',
  },
  {
    cardClass: 'bg-yellow-50 border-yellow-100/50',
    chipClass: 'text-yellow-600',
    textClass: 'text-yellow-600',
  },
] as const

export function CategoryIcon({ kind }: { kind: string }) {
  if (kind === 'dog') return <Dog size={16} />
  if (kind === 'cat') return <Cat size={16} />
  if (kind === 'fish') return <Fish size={16} />
  return <Bird size={16} />
}

export function inferIconKind(name: string): string {
  const v = name.toLowerCase()
  if (v.includes('dog') || v.includes('anjing')) return 'dog'
  if (v.includes('cat') || v.includes('kucing')) return 'cat'
  if (v.includes('fish') || v.includes('ikan')) return 'fish'
  return 'bird'
}
