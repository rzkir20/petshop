import { createFileRoute, Link } from '@tanstack/react-router'

import type { ReactNode } from 'react'

import type { LucideIcon } from 'lucide-react'

import {
  AtSign,
  BookOpen,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Package,
  Phone,
  PhoneCall,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Video,
} from 'lucide-react'

import { useMemo, useState } from 'react'

import toast from 'react-hot-toast'

import { Button } from '#/components/ui/button'

import {
  fieldInputClassName,
  settingsCardClassName,
} from '#/components/ui/helper'

import { cn } from '#/lib/utils'

const FAQ_ITEMS: Array<{
  id: string
  question: string
  answer: string
  icon: LucideIcon
  iconWrap: string
}> = [
  {
    id: 'bulk-stock',
    question: 'Bagaimana cara memperbarui stok inventaris secara massal?',
    answer:
      'Anda dapat menggunakan fitur impor CSV di halaman Manajemen Inventaris untuk memperbarui ribuan item sekaligus. Cukup unduh template kami, masukkan data terbaru, dan unggah kembali.',
    icon: Package,
    iconWrap: 'bg-emerald-50 text-emerald-500',
  },
  {
    id: 'refund',
    question: 'Berapa lama proses pengembalian dana untuk pelanggan?',
    answer:
      'Proses pengembalian dana biasanya memakan waktu 3–5 hari kerja tergantung pada metode pembayaran awal yang digunakan oleh pelanggan Anda.',
    icon: ShoppingBag,
    iconWrap: 'bg-orange-50 text-[#ff6b35]',
  },
  {
    id: '2fa',
    question: 'Bagaimana cara mengaktifkan Otentikasi Dua Faktor (2FA)?',
    answer:
      'Buka halaman Pengaturan > Keamanan, lalu pilih "Aktifkan 2FA". Anda akan diminta untuk memindai kode QR menggunakan aplikasi autentikator seperti Google Authenticator.',
    icon: ShieldCheck,
    iconWrap: 'bg-blue-50 text-blue-500',
  },
]

type TicketStatus = 'processing' | 'done'

const TICKETS: Array<{
  id: string
  subject: string
  status: TicketStatus
  updated: string
}> = [
  {
    id: '#SUP-1024',
    subject: 'Integrasi API RajaOngkir Terkendala',
    status: 'processing',
    updated: '2 jam yang lalu',
  },
  {
    id: '#SUP-1021',
    subject: 'Pertanyaan Mengenai Laporan Bulanan',
    status: 'done',
    updated: 'Kemarin',
  },
]

const KB_ARTICLES = [
  {
    tag: 'Panduan',
    tagClass: 'bg-emerald-50 text-emerald-600',
    title: 'Memulai dengan Pawsome Shop',
    desc: 'Pelajari langkah-langkah awal untuk mengatur toko hewan peliharaan Anda…',
    views: '1.2k Views',
    to: '/dashboard' as const,
  },
  {
    tag: 'Inventaris',
    tagClass: 'bg-orange-50 text-[#ff6b35]',
    title: 'Optimasi Manajemen Stok',
    desc: 'Cara mengatur peringatan stok rendah dan strategi restock otomatis…',
    views: '845 Views',
    to: '/dashboard/inventory' as const,
  },
  {
    tag: 'Pembayaran',
    tagClass: 'bg-blue-50 text-blue-600',
    title: 'Memahami Dashboard Keuangan',
    desc: 'Penjelasan mendalam mengenai metrik pendapatan dan laporan pajak…',
    views: '512 Views',
    to: '/dashboard/analytics' as const,
  },
] as const

export const Route = createFileRoute('/dashboard/support')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Support Center | Pawsome Shop' },
      {
        name: 'description',
        content:
          'Pusat bantuan Pawsome Shop: FAQ, tiket dukungan, jam layanan, dan knowledge base.',
      },
    ],
  }),
})

function RouteComponent() {
  const [faqOpenId, setFaqOpenId] = useState<string | null>(null)
  const [faqQuery, setFaqQuery] = useState('')
  const [ticketTab, setTicketTab] = useState<'all' | 'open' | 'processing'>(
    'all',
  )

  const filteredFaq = useMemo(() => {
    const q = faqQuery.trim().toLowerCase()
    if (!q) return FAQ_ITEMS
    return FAQ_ITEMS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    )
  }, [faqQuery])

  const filteredTickets = useMemo(() => {
    if (ticketTab === 'all') return TICKETS
    if (ticketTab === 'processing')
      return TICKETS.filter((t) => t.status === 'processing')
    return TICKETS.filter((t) => t.status !== 'done')
  }, [ticketTab])

  return (
    <div className="p-6 pb-12 md:p-8">
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        <div className="min-w-0 flex-1 space-y-8">
          <header>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[#173a40]">
              Pusat Bantuan
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kami siap membantu Anda mengelola toko hewan peliharaan Anda
              dengan lebih baik.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <ChannelCard
              icon={MessageSquare}
              iconClass="bg-emerald-100 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
              title="Live Chat"
              subtitle={
                <span className="mt-1 flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-500">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Online
                </span>
              }
              onClick={() => toast('Live chat segera hadir.')}
            />
            <ChannelCard
              icon={Mail}
              iconClass="bg-orange-100 text-[#ff6b35] group-hover:bg-[#ff6b35] group-hover:text-white"
              title="Kirim Email"
              subtitle={
                <p className="mt-1 text-[10px] text-gray-400">
                  Respon &lt; 24 jam
                </p>
              }
              onClick={() => window.open('mailto:support@pawsomeshop.com')}
            />
            <ChannelCard
              icon={Phone}
              iconClass="bg-blue-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
              title="Telepon"
              subtitle={
                <p className="mt-1 text-[10px] text-gray-400">
                  09:00 – 18:00 WIB
                </p>
              }
              onClick={() =>
                toast('Hubungi hotline dari kartu kontak di samping.')
              }
            />
            <ChannelCard
              icon={Ticket}
              iconClass="bg-purple-100 text-purple-500 group-hover:bg-purple-500 group-hover:text-white"
              title="Ajukan Tiket"
              subtitle={
                <p className="mt-1 text-[10px] text-gray-400">Masalah teknis</p>
              }
              onClick={() => toast('Form tiket segera hadir.')}
            />
          </div>

          <section className={settingsCardClassName('rounded-[40px]!')}>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#173a40]">
                  Pertanyaan Umum (FAQ)
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Temukan jawaban cepat untuk pertanyaan Anda.
                </p>
              </div>
              <div className="relative w-full sm:max-w-xs">
                <Search
                  className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-gray-400"
                  aria-hidden
                />
                <input
                  type="search"
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  placeholder="Cari bantuan…"
                  className={cn(
                    fieldInputClassName(),
                    'w-full py-2 pl-11 text-xs',
                  )}
                  aria-label="Cari FAQ"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredFaq.length === 0 ? (
                <p className="text-center text-sm text-gray-500">
                  Tidak ada hasil.
                </p>
              ) : (
                filteredFaq.map((item) => {
                  const open = faqOpenId === item.id
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setFaqOpenId((id) => (id === item.id ? null : item.id))
                      }
                      className={cn(
                        'group w-full rounded-[24px] border border-emerald-50 p-5 text-left transition-colors hover:bg-emerald-50/20',
                        open && 'bg-emerald-50/10',
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-4">
                          <div
                            className={cn(
                              'flex size-8 shrink-0 items-center justify-center rounded-xl',
                              item.iconWrap,
                            )}
                          >
                            <Icon className="size-4" aria-hidden />
                          </div>
                          <h3 className="text-sm font-bold text-[#173a40]">
                            {item.question}
                          </h3>
                        </div>
                        <ChevronDown
                          className={cn(
                            'size-5 shrink-0 text-gray-400 transition-transform',
                            open && 'rotate-180',
                          )}
                          aria-hidden
                        />
                      </div>
                      <div
                        className={cn(
                          'overflow-hidden text-sm leading-relaxed text-gray-500 transition-[max-height,opacity,padding] duration-300 ease-out',
                          open
                            ? 'max-h-80 pt-4 opacity-100'
                            : 'max-h-0 opacity-0',
                        )}
                      >
                        {item.answer}
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </section>

          <section
            className={cn(
              settingsCardClassName('overflow-hidden rounded-[40px]! p-0!'),
            )}
          >
            <div className="flex flex-col gap-4 border-b border-gray-50 p-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#173a40]">
                  Tiket Bantuan Anda
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Pantau status permohonan bantuan Anda.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex w-fit items-center gap-1 rounded-full bg-emerald-50 p-1">
                  {(
                    [
                      ['all', 'Semua'],
                      ['open', 'Buka'],
                      ['processing', 'Diproses'],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTicketTab(key)}
                      className={cn(
                        'rounded-full px-4 py-1.5 text-[10px] font-bold transition-colors',
                        ticketTab === key
                          ? 'bg-emerald-500 text-white'
                          : 'text-gray-500 hover:bg-white',
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <Button
                  type="button"
                  className="gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-bold hover:bg-emerald-600"
                  onClick={() => toast('Buat tiket baru segera hadir.')}
                >
                  <Plus className="size-4" />
                  Buat Tiket Baru
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left">
                <thead className="bg-gray-50/50">
                  <tr>
                    {[
                      'ID Tiket',
                      'Subjek',
                      'Status',
                      'Terakhir Diupdate',
                      'Aksi',
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={cn(
                          'px-8 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase',
                          i === 4 && 'text-right',
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredTickets.map((row) => (
                    <tr
                      key={row.id}
                      className="transition-colors hover:bg-emerald-50/10"
                    >
                      <td className="px-8 py-5 text-sm font-bold">{row.id}</td>
                      <td className="px-8 py-5 text-sm font-medium">
                        {row.subject}
                      </td>
                      <td className="px-8 py-5">
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 text-[10px] font-bold',
                            row.status === 'processing'
                              ? 'bg-orange-100 text-[#ff6b35]'
                              : 'bg-emerald-100 text-emerald-600',
                          )}
                        >
                          {row.status === 'processing'
                            ? 'Sedang Diproses'
                            : 'Selesai'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-xs text-gray-500">
                        {row.updated}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          type="button"
                          className="rounded-full border border-emerald-100 px-4 py-1.5 text-[10px] font-bold text-emerald-600 transition-colors hover:bg-emerald-50"
                          onClick={() => toast(`Detail ${row.id}`)}
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="px-2 text-xl font-bold tracking-tight text-[#173a40]">
              Knowledge Base & Sumber Daya
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {KB_ARTICLES.map((article) => (
                <article
                  key={article.title}
                  className={settingsCardClassName(
                    'flex h-full flex-col rounded-[32px]! py-6!',
                  )}
                >
                  <span
                    className={cn(
                      'mb-4 w-fit rounded-full px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase',
                      article.tagClass,
                    )}
                  >
                    {article.tag}
                  </span>
                  <h3 className="mb-2 text-sm font-bold text-[#173a40]">
                    {article.title}
                  </h3>
                  <p className="mb-6 flex-1 text-xs text-gray-500">
                    {article.desc}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="text-[10px] font-medium text-gray-400">
                      {article.views}
                    </span>
                    <Link
                      to={article.to}
                      className="text-[10px] font-bold text-emerald-600 hover:underline"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full shrink-0 space-y-6 xl:w-80">
          <div className="relative overflow-hidden rounded-[40px] bg-[#173a40] p-8 text-white shadow-sm">
            <div className="pointer-events-none absolute -top-4 -right-4 size-24 rounded-full bg-white/5" />
            <h3 className="mb-6 text-lg font-bold">Jam Layanan</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-sm font-bold">Kami Buka</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Senin – Jumat</span>
                  <span className="font-medium">09:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sabtu</span>
                  <span className="font-medium">10:00 – 15:00</span>
                </div>
                <div className="flex justify-between opacity-50">
                  <span className="text-gray-400">Minggu</span>
                  <span className="font-medium">Tutup</span>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-[10px] text-gray-400">
                  Zona waktu: WIB (Jakarta)
                </p>
              </div>
            </div>
          </div>

          <div className={settingsCardClassName('rounded-[40px]!')}>
            <h3 className="mb-6 text-lg font-bold text-[#173a40]">
              Informasi Kontak
            </h3>
            <div className="space-y-6">
              <ContactRow
                icon={AtSign}
                iconWrap="bg-emerald-50 text-emerald-500"
                label="Email"
                value="support@pawsomeshop.com"
              />
              <ContactRow
                icon={PhoneCall}
                iconWrap="bg-orange-50 text-[#ff6b35]"
                label="Hotline"
                value="+62 21-555-0123"
              />
              <ContactRow
                icon={MapPin}
                iconWrap="bg-blue-50 text-blue-500"
                label="Kantor"
                value="Green Office Park 9, BSD City"
              />
            </div>
            <div className="mt-8 rounded-3xl bg-emerald-50/50 p-4">
              <div className="mb-2 flex items-center gap-2 text-emerald-600">
                <Clock3 className="size-4 shrink-0" aria-hidden />
                <span className="text-[10px] font-bold uppercase">
                  SLA Respon
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-gray-500">
                Tiket bantuan teknis biasanya diselesaikan dalam waktu kurang
                dari 4 jam kerja.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] bg-emerald-50 p-6">
            <h4 className="mb-4 text-xs font-bold text-emerald-800">
              Link berguna
            </h4>
            <ul className="space-y-3 text-[10px] text-emerald-700">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 hover:underline"
                >
                  <BookOpen className="size-3.5 shrink-0" aria-hidden />
                  Dokumentasi API
                </Link>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <MessageCircle className="size-3.5 shrink-0" aria-hidden />
                  Forum Komunitas
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:underline">
                  <Video className="size-3.5 shrink-0" aria-hidden />
                  Video Tutorial
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ChannelCard({
  icon: Icon,
  iconClass,
  title,
  subtitle,
  onClick,
}: {
  icon: LucideIcon
  iconClass: string
  title: string
  subtitle: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-[32px] border border-emerald-50 bg-white p-5 text-center shadow-sm transition-all hover:border-emerald-500"
    >
      <div
        className={cn(
          'mx-auto flex size-12 items-center justify-center rounded-2xl transition-colors',
          iconClass,
        )}
      >
        <Icon className="size-7" aria-hidden />
      </div>
      <div className="mt-4">
        <p className="text-sm font-bold text-[#173a40]">{title}</p>
        {subtitle}
      </div>
    </button>
  )
}

function ContactRow({
  icon: Icon,
  iconWrap,
  label,
  value,
}: {
  icon: LucideIcon
  iconWrap: string
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-2xl',
          iconWrap,
        )}
      >
        <Icon className="size-5" aria-hidden />
      </div>
      <div>
        <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          {label}
        </p>
        <p className="mt-0.5 text-xs font-bold text-[#173a40]">{value}</p>
      </div>
    </div>
  )
}
