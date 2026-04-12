import { createFileRoute } from '@tanstack/react-router'

import {
  ArrowRight,
  Heart,
  History,
  Layout,
  Plus,
  Search,
  TrendingUp,
  Zap,
} from 'lucide-react'

import { useMemo, useState } from 'react'

import toast from 'react-hot-toast'

import { Button } from '#/components/ui/button'

import { cn } from '#/lib/utils'

export const Route = createFileRoute('/dashboard/template-whatsapp')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'WhatsApp Templates | Pawsome Shop' },
      {
        name: 'description',
        content:
          'Koleksi template pesan WhatsApp siap pakai untuk komunikasi dengan pelanggan Pawsome Shop.',
      },
    ],
  }),
})

type TemplateCategory =
  | 'marketing'
  | 'customer-service'
  | 'promo'
  | 'order-updates'
  | 'inventory'

type TabId = 'all' | TemplateCategory

type WaTemplate = {
  id: string
  category: TemplateCategory
  badgeLabel: string
  badgeClass: string
  usageLabel: string
  title: string
  body: string
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'all', label: 'All Templates' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'customer-service', label: 'Customer Service' },
  { id: 'promo', label: 'Promo' },
  { id: 'order-updates', label: 'Order Updates' },
  { id: 'inventory', label: 'Inventory' },
]

const TEMPLATES: WaTemplate[] = [
  {
    id: '1',
    category: 'marketing',
    badgeLabel: 'Marketing',
    badgeClass: 'bg-orange-100 text-orange-600',
    usageLabel: '1.2k Kali Pakai',
    title: 'New Product Launch',
    body: '🎉 Produk Baru! [Product Name] sudah tersedia di Pawsome Shop. Dapatkan diskon khusus 15% untuk 100 pembeli pertama. Pesan sekarang: [link]',
  },
  {
    id: '2',
    category: 'customer-service',
    badgeLabel: 'Customer Service',
    badgeClass: 'bg-blue-100 text-blue-600',
    usageLabel: '850 Kali Pakai',
    title: 'Store Hours Information',
    body: '⏰ Jam Layanan Pawsome Shop: Senin-Jumat: 09:00-18:00. Sabtu: 10:00-15:00. Minggu: Tutup. Ada yang bisa dibantu?',
  },
  {
    id: '3',
    category: 'order-updates',
    badgeLabel: 'Order Updates',
    badgeClass: 'bg-green-100 text-green-600',
    usageLabel: '2.4k Kali Pakai',
    title: 'Shipping Update',
    body: '📦 Update Pengiriman! Pesanan Anda sudah dalam perjalanan dengan kurir [courier]. No. Resi: [tracking]. Lacak status: [link]',
  },
  {
    id: '4',
    category: 'promo',
    badgeLabel: 'Promo',
    badgeClass: 'bg-purple-100 text-purple-600',
    usageLabel: '540 Kali Pakai',
    title: 'Seasonal Sale Alert',
    body: '🛍️ MUSIMAN SALE! Rayakan musim liburan dengan diskon hingga 60% untuk semua kategori produk. Stok terbatas! Belanja: [link]',
  },
  {
    id: '5',
    category: 'inventory',
    badgeLabel: 'Inventory',
    badgeClass: 'bg-yellow-100 text-yellow-600',
    usageLabel: '320 Kali Pakai',
    title: 'Stock Alert (Low Stock)',
    body: '⚠️ STOK MENIPIS! [Product Name] hanya tersisa [qty] unit. Jangan sampai kehabisan, pesan sekarang: [link]',
  },
]

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function copyToClipboard(text: string) {
  void navigator.clipboard.writeText(text).then(() => {
    toast.success('Pesan berhasil disalin ke clipboard!')
  })
}

function openWhatsAppWithText(text: string) {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

function RouteComponent() {
  const [tab, setTab] = useState<TabId>('all')
  const [heroSearch, setHeroSearch] = useState('')

  const filtered = useMemo(() => {
    const q = heroSearch.trim().toLowerCase()
    return TEMPLATES.filter((t) => {
      const catOk = tab === 'all' || t.category === tab
      if (!catOk) return false
      if (!q) return true
      return (
        t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q)
      )
    })
  }, [tab, heroSearch])

  return (
    <div className="p-6 md:p-8">
      <header className="mb-8 rounded-[48px] border border-emerald-50 bg-linear-to-br from-emerald-50 to-white p-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="max-w-xl text-center md:text-left">
            <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
              Marketing Toolkit
            </span>
            <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-[#173a40]">
              WhatsApp Message Templates
            </h1>
            <p className="text-sm text-gray-500">
              Koleksi template pesan siap pakai untuk mempermudah komunikasi
              dengan customer Anda di Pawsome Shop.
            </p>
          </div>
          <div className="group relative w-full md:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500" />
            <input
              type="search"
              id="searchTemplates"
              placeholder="Cari template pesan…"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              className="w-full rounded-2xl border border-emerald-100 bg-white py-4 pr-4 pl-12 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
            />
          </div>
        </div>
      </header>

      <nav className="mb-8 flex gap-8 overflow-x-auto border-b border-gray-100 px-2 whitespace-nowrap [scrollbar-width:thin]">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                'shrink-0 px-2 pb-4 text-sm font-bold transition-all',
                active
                  ? 'border-b-2 border-emerald-500 text-emerald-500'
                  : 'text-gray-400',
              )}
            >
              {t.label}
            </button>
          )
        })}
      </nav>

      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        <div className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-2">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-[32px] border border-emerald-50 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-emerald-500 hover:shadow-[0_12px_24px_-10px_rgba(16,185,129,0.15)]"
            >
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-[10px] font-bold uppercase',
                      item.badgeClass,
                    )}
                  >
                    {item.badgeLabel}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
                    <History className="size-3" />
                    {item.usageLabel}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-[#173a40]">
                  {item.title}
                </h3>
                <div className="mb-6 rounded-2xl border border-emerald-50/50 bg-emerald-50/30 p-4">
                  <p className="line-clamp-3 text-xs leading-relaxed text-gray-600 italic">
                    {item.body}
                  </p>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4 text-[10px]"
                    onClick={() => copyToClipboard(item.body)}
                  >
                    Copy Message
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="rounded-full px-4 text-[10px] text-white"
                    onClick={() => openWhatsAppWithText(item.body)}
                  >
                    <WhatsAppGlyph className="size-3.5" />
                    Gunakan di WA
                  </Button>
                </div>
                <button
                  type="button"
                  className="text-[10px] font-bold text-emerald-600 hover:underline"
                  onClick={() =>
                    toast('Penyesuaian template akan segera tersedia.')
                  }
                >
                  Customize
                </button>
              </div>
            </article>
          ))}

          <button
            type="button"
            onClick={() => toast('Buat template custom — fitur menyusul.')}
            className="group flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-emerald-100 bg-emerald-50/10 p-6 transition-all duration-300 hover:bg-emerald-50/20"
          >
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-500 transition-transform group-hover:scale-110">
              <Plus className="size-6" />
            </div>
            <p className="text-sm font-bold text-emerald-500">
              Buat Template Custom
            </p>
          </button>
        </div>

        <aside className="w-full shrink-0 space-y-6 xl:w-80">
          <div className="relative overflow-hidden rounded-[40px] bg-[#173a40] p-8 text-white shadow-xl">
            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/5" />
            <h3 className="relative z-10 mb-6 text-lg font-bold">
              Most Used Template
            </h3>
            <div className="relative z-10 mb-6 rounded-3xl border border-white/10 bg-white/10 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded px-2 py-0.5 text-[8px] font-bold tracking-widest text-green-400 uppercase">
                  Order Update
                </span>
              </div>
              <p className="mb-4 text-xs text-gray-300 italic">
                &ldquo;Pesanan Anda [order_id] sedang diproses. Terima kasih!
                ✨&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400">
                  Used 4,210 times
                </span>
                <ArrowRight className="size-4 text-emerald-400" />
              </div>
            </div>
            <Button
              type="button"
              className="relative z-10 w-full rounded-full py-3 text-xs font-bold shadow-lg"
              onClick={() => toast('Pembuatan template baru — fitur menyusul.')}
            >
              Create New Template
            </Button>
          </div>

          <div className="rounded-[40px] border border-emerald-50 bg-white p-8 shadow-sm">
            <h4 className="mb-6 text-sm font-bold text-[#173a40]">
              Template Insights
            </h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                    <Layout className="size-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Total Templates
                  </span>
                </div>
                <span className="text-sm font-bold">48</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                    <TrendingUp className="size-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Share Growth
                  </span>
                </div>
                <span className="text-sm font-bold text-emerald-500">
                  +12.4%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                    <Zap className="size-5" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    Active Today
                  </span>
                </div>
                <span className="text-sm font-bold">152</span>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-emerald-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
                Favorite
              </h4>
              <Heart className="size-4 text-emerald-400" />
            </div>
            <ul className="space-y-3">
              {[
                'Flash Sale Alert',
                'Order Confirmation',
                'Refund Process Info',
              ].map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-2 text-[11px] font-medium text-emerald-700"
                >
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
