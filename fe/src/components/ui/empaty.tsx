import { Inbox } from 'lucide-react'

export function Empaty({
  title = 'Data tidak tersedia',
  description = 'Belum ada data untuk ditampilkan.',
}: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/40 px-6 py-14 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-500 shadow-sm">
        <Inbox size={20} />
      </div>
      <h4 className="text-sm font-bold text-[#173a40]">{title}</h4>
      <p className="mt-1 max-w-md text-xs text-gray-500">{description}</p>
    </div>
  )
}
