import { createFileRoute } from '@tanstack/react-router'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  Loader2,
  MessageCircle,
  Pencil,
  Plus,
  Star,
  StarHalf,
  Trash2,
} from 'lucide-react'

import type { ReactNode } from 'react'

import { useEffect, useMemo, useState } from 'react'

import toast from 'react-hot-toast'

import { Button } from '#/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'

import { Input } from '#/components/ui/input'

import { Label } from '#/components/ui/label'

import {
  fieldInputClassName,
  settingsCardClassName,
} from '#/components/ui/helper'

import { Empaty } from '#/components/ui/empaty'

import { cn } from '#/lib/utils'

import {
  createTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  updateTestimonial,
} from '#/services/testimonials.service'

export const Route = createFileRoute('/dashboard/testimonials')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Customer Testimonials | Pawsome Shop' },
      {
        name: 'description',
        content:
          'Kelola testimonial pelanggan Pawsome Shop: unggah avatar, rating, dan sorotan.',
      },
    ],
  }),
})

function formatTestimonialDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function roleLine(t: TestimonialDto): string {
  const y = t.yearOfExperience
  if (y > 0) return `${t.role} • ${y} tahun`
  return t.role
}

function computeRatingBreakdown(items: TestimonialDto[]) {
  const buckets = [0, 0, 0, 0, 0]
  for (const t of items) {
    const star = Math.min(5, Math.max(1, Math.round(Number(t.rating) || 0)))
    buckets[star - 1] += 1
  }
  const n = items.length
  if (n === 0) {
    return [5, 4, 3, 2, 1].map((stars) => ({ stars, pct: 0 }))
  }
  return [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    pct: Math.round((buckets[5 - stars] / n) * 100),
  }))
}

function RouteComponent() {
  const qc = useQueryClient()
  const [sortBy, setSortBy] = useState<'newest' | 'rating'>('newest')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create')
  const [editing, setEditing] = useState<TestimonialDto | null>(null)

  const listQuery = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  })

  const createMut = useMutation({
    mutationFn: (p: { fields: TestimonialFormFields; file: File }) =>
      createTestimonial(p.fields, p.file),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['testimonials'] })
      toast.success('Testimonial ditambahkan')
      setDialogOpen(false)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const updateMut = useMutation({
    mutationFn: (p: {
      id: string
      fields: TestimonialFormFields
      file: File | null
    }) => updateTestimonial(p.id, p.fields, p.file),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['testimonials'] })
      toast.success('Testimonial diperbarui')
      setDialogOpen(false)
      setEditing(null)
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['testimonials'] })
      toast.success('Testimonial dihapus')
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const items = listQuery.data ?? []
  const featured = useMemo(() => items.filter((t) => t.isFeatured), [items])
  const nonFeatured = useMemo(() => items.filter((t) => !t.isFeatured), [items])

  const sortedRegular = useMemo(() => {
    const list = [...nonFeatured]
    if (sortBy === 'rating') {
      list.sort(
        (a, b) =>
          b.rating - a.rating ||
          +new Date(b.updatedAt) - +new Date(a.updatedAt),
      )
    } else {
      list.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    }
    return list
  }, [nonFeatured, sortBy])

  const stats = useMemo(() => {
    const n = items.length
    if (n === 0) {
      return { avg: '0.0', breakdown: computeRatingBreakdown([]) }
    }
    const sum = items.reduce((s, t) => s + Number(t.rating || 0), 0)
    return {
      avg: (sum / n).toFixed(1),
      breakdown: computeRatingBreakdown(items),
    }
  }, [items])

  const isSaving = createMut.isPending || updateMut.isPending

  function openCreate() {
    setDialogMode('create')
    setEditing(null)
    setDialogOpen(true)
  }

  function openEdit(t: TestimonialDto) {
    setDialogMode('edit')
    setEditing(t)
    setDialogOpen(true)
  }

  async function handleFormSubmit(
    fields: TestimonialFormFields,
    avatarFile: File | null,
  ) {
    if (dialogMode === 'create') {
      if (!avatarFile) {
        toast.error('Pilih gambar avatar (maks. 5 MB)')
        return
      }
      await createMut.mutateAsync({ fields, file: avatarFile })
      return
    }
    if (!editing) return
    await updateMut.mutateAsync({
      id: editing._id,
      fields,
      file: avatarFile,
    })
  }

  return (
    <div className="relative space-y-20 p-6 md:p-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#173a40]">
            Testimonials Management
          </h1>
          <p className="mt-1 text-gray-500">
            Kelola testimonial: unggah avatar ke ImageKit, rating, dan sorotan
            di halaman depan.
          </p>
        </div>

        <Button
          type="button"
          className="gap-2 rounded-full px-6 shadow-[0_4px_14px_0_rgba(16,185,129,0.15)]"
          onClick={openCreate}
        >
          <Plus size={18} />
          Testimonial baru
        </Button>
      </section>

      {listQuery.isPending ? (
        <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
          <Loader2
            className="size-8 animate-spin text-emerald-500"
            aria-hidden
          />
          <span>Memuat testimonial…</span>
        </div>
      ) : listQuery.isError ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
          {listQuery.error instanceof Error
            ? listQuery.error.message
            : 'Gagal memuat data'}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="ml-3"
            onClick={() => void listQuery.refetch()}
          >
            Coba lagi
          </Button>
        </div>
      ) : items.length === 0 ? (
        <Empaty
          title="Belum ada testimonial"
          description="Tambahkan testimonial pertama dengan tombol Testimonial baru di atas."
        />
      ) : (
        <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
          <div className="min-w-0 flex-1 space-y-12">
            <section>
              <div className="mb-8 flex items-center gap-3">
                <div
                  className="h-8 w-1.5 rounded-full bg-[#ff6b35]"
                  aria-hidden
                />
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#173a40]">
                  Pilihan teratas
                </h2>
              </div>
              {featured.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Belum ada testimonial dengan status sorotan. Centang
                  &ldquo;Sorotan&rdquo; saat menambah atau mengedit.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                  {featured.map((item) => (
                    <TestimonialFeaturedCard
                      key={item._id}
                      item={item}
                      onEdit={() => openEdit(item)}
                      onDelete={() => {
                        if (confirm(`Hapus testimonial dari "${item.name}"?`))
                          void deleteMut.mutateAsync(item._id)
                      }}
                      deleting={deleteMut.isPending}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-1.5 rounded-full bg-emerald-500"
                    aria-hidden
                  />
                  <h2 className="font-display text-2xl font-bold tracking-tight text-[#173a40]">
                    Semua testimonial
                  </h2>
                </div>
                <label className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                  <span className="font-medium">Urutkan berdasarkan:</span>
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value === 'rating' ? 'rating' : 'newest',
                      )
                    }
                    className="rounded-full border-0 bg-white px-4 py-1.5 text-xs font-bold text-[#173a40] shadow-sm ring-1 ring-emerald-100/80 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                  >
                    <option value="newest">Terbaru</option>
                    <option value="rating">Rating tertinggi</option>
                  </select>
                </label>
              </div>

              {sortedRegular.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Belum ada testimonial lain. Tambahkan lewat tombol
                  &ldquo;Testimonial baru&rdquo;.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {sortedRegular.map((item) => (
                    <TestimonialGridCard
                      key={item._id}
                      item={item}
                      onEdit={() => openEdit(item)}
                      onDelete={() => {
                        if (confirm(`Hapus testimonial dari "${item.name}"?`))
                          void deleteMut.mutateAsync(item._id)
                      }}
                      deleting={deleteMut.isPending}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="w-full shrink-0 space-y-6 xl:sticky xl:top-24 xl:w-80">
            <div className="rounded-[40px] bg-[#173a40] p-8 text-center text-white shadow-xl">
              <h3 className="mb-6 text-sm font-bold tracking-widest text-emerald-400 uppercase">
                Rating keseluruhan
              </h3>
              <div className="mb-2 flex items-baseline justify-center gap-1">
                <span className="text-6xl font-bold">{stats.avg}</span>
                <span className="text-xl font-medium text-emerald-400">/5</span>
              </div>
              <Stars
                value={Math.min(5, Number(stats.avg) || 0)}
                size="lg"
                className="mb-4 justify-center"
              />
              <p className="text-xs text-gray-400">
                Berdasarkan {items.length} testimonial di database
              </p>
            </div>

            <div className={settingsCardClassName('rounded-[40px]!')}>
              <h4 className="mb-6 text-sm font-bold text-[#173a40]">
                Rincian rating
              </h4>
              <div className="space-y-4">
                {stats.breakdown.map((row) => (
                  <div key={row.stars} className="flex items-center gap-3">
                    <span className="w-4 text-[10px] font-bold">
                      {row.stars}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-[10px] font-bold text-gray-400">
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-[40px] bg-[#ff6b35] p-8 text-white">
              <MessageCircle
                className="pointer-events-none absolute -bottom-4 -right-4 size-36 text-white/10 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1}
                aria-hidden
              />
              <div className="relative z-10">
                <h3 className="mb-2 text-xl font-bold">Bagikan pengalaman</h3>
                <p className="mb-6 text-xs text-white/80">
                  Tambahkan testimonial baru untuk ditampilkan di dashboard.
                </p>
                <button
                  type="button"
                  id="leave-review-btn"
                  className="w-full rounded-full bg-white py-3 text-xs font-bold text-[#ff6b35] shadow-lg transition-colors hover:bg-emerald-50"
                  onClick={openCreate}
                >
                  Berikan ulasan
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      <TestimonialFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={dialogMode}
        initial={editing}
        isPending={isSaving}
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}

function TestimonialFeaturedCard({
  item,
  onEdit,
  onDelete,
  deleting,
}: {
  item: TestimonialDto
  onEdit: () => void
  onDelete: () => void
  deleting: boolean
}) {
  return (
    <article
      className={cn(
        'relative rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm transition-all duration-300 ease-out',
        'hover:-translate-y-2 hover:scale-[1.02] hover:border-emerald-500/20 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.1)]',
      )}
    >
      <span className="absolute top-6 right-6 rounded-full bg-[#ff6b35] px-3 py-1 text-[9px] font-bold text-white uppercase">
        Featured
      </span>
      <div className="absolute top-6 left-6 flex gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full border border-emerald-100 bg-white/90 p-2 text-emerald-600 shadow-sm hover:bg-emerald-50"
          aria-label="Edit"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={deleting}
          className="rounded-full border border-red-100 bg-white/90 p-2 text-red-600 shadow-sm hover:bg-red-50 disabled:opacity-50"
          aria-label="Hapus"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
      <div className="flex flex-col items-center px-2 pt-10 text-center">
        <img
          src={item.avatar}
          alt=""
          className="mb-4 size-20 rounded-full border-4 border-white object-cover shadow-sm"
        />
        <h3 className="text-base font-bold text-[#173a40]">{item.name}</h3>
        <p className="mb-3 text-[11px] text-gray-400">{roleLine(item)}</p>
        <Stars value={item.rating} size="md" className="mb-4 justify-center" />
        <p className="text-sm leading-relaxed text-gray-600 italic">
          &ldquo;{item.description}&rdquo;
        </p>
        <span className="mt-6 text-[10px] text-gray-400">
          {formatTestimonialDate(item.updatedAt)}
        </span>
      </div>
    </article>
  )
}

function TestimonialGridCard({
  item,
  onEdit,
  onDelete,
  deleting, 
}: {
  item: TestimonialDto
  onEdit: () => void
  onDelete: () => void
  deleting: boolean
}) {
  return (
    <article
      className={cn(
        'rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm transition-all duration-300 ease-out',
        'hover:-translate-y-2 hover:scale-[1.02] hover:border-emerald-500/20 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.1)]',
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <img
            src={item.avatar}
            alt=""
            className="size-12 shrink-0 rounded-2xl object-cover ring-1 ring-emerald-100"
          />
          <div className="min-w-0">
            <h4 className="truncate text-sm font-bold text-[#173a40]">
              {item.name}
            </h4>
            <p className="text-[10px] text-gray-400">{roleLine(item)}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full p-1.5 text-emerald-600 hover:bg-emerald-50"
            aria-label="Edit"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="rounded-full p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
            aria-label="Hapus"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
      <Stars value={item.rating} size="sm" className="mb-3" />
      <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-gray-500 italic">
        &ldquo;{item.description}&rdquo;
      </p>
      <span className="text-[9px] text-gray-300">
        {formatTestimonialDate(item.updatedAt)}
      </span>
    </article>
  )
}

function TestimonialFormDialog({
  open,
  onOpenChange,
  mode,
  initial,
  isPending,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  mode: 'create' | 'edit'
  initial: TestimonialDto | null
  isPending: boolean
  onSubmit: (
    fields: TestimonialFormFields,
    avatarFile: File | null,
  ) => void | Promise<void>
}) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [description, setDescription] = useState('')
  const [yearOfExperience, setYearOfExperience] = useState('0')
  const [rating, setRating] = useState('5')
  const [isFeatured, setIsFeatured] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  useEffect(() => {
    if (!open) return
    if (mode === 'edit' && initial) {
      setName(initial.name)
      setRole(initial.role)
      setDescription(initial.description)
      setYearOfExperience(String(initial.yearOfExperience))
      setRating(String(initial.rating))
      setIsFeatured(Boolean(initial.isFeatured))
      setAvatarFile(null)
    } else if (mode === 'create') {
      setName('')
      setRole('')
      setDescription('')
      setYearOfExperience('0')
      setRating('5')
      setIsFeatured(false)
      setAvatarFile(null)
    }
  }, [open, mode, initial])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const y = Math.max(0, Math.floor(Number(yearOfExperience) || 0))
    const r = Math.min(5, Math.max(0, Number(rating) || 0))
    const fields: TestimonialFormFields = {
      name,
      role,
      description,
      isFeatured,
      yearOfExperience: y,
      rating: r,
    }
    await onSubmit(fields, avatarFile)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <form onSubmit={(e) => void handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Testimonial baru' : 'Edit testimonial'}
            </DialogTitle>
            <DialogDescription>
              Unggah foto (field avatar, maks. 5 MB). Data dikirim ke{' '}
              <code className="rounded bg-emerald-50 px-1 text-xs">
                /testimonials
              </code>
              .
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tm-name">Nama / bisnis</Label>
              <Input
                id="tm-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={fieldInputClassName()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tm-role">Peran</Label>
              <Input
                id="tm-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                placeholder="mis. Pemilik toko"
                className={fieldInputClassName()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tm-desc">Isi testimonial</Label>
              <textarea
                id="tm-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className={cn(
                  fieldInputClassName(),
                  'min-h-24 w-full resize-y',
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tm-year">Tahun pengalaman</Label>
                <Input
                  id="tm-year"
                  type="number"
                  min={0}
                  value={yearOfExperience}
                  onChange={(e) => setYearOfExperience(e.target.value)}
                  className={fieldInputClassName()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tm-rating">Rating (0–5)</Label>
                <Input
                  id="tm-rating"
                  type="number"
                  min={0}
                  max={5}
                  step={0.5}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className={fieldInputClassName()}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="tm-featured"
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="size-4 rounded border-emerald-200 text-emerald-600"
              />
              <Label htmlFor="tm-featured" className="font-normal">
                Sorotan (featured)
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tm-avatar">
                Foto avatar{' '}
                {mode === 'create'
                  ? '(wajib)'
                  : '(opsional — kosongkan jika tidak diganti)'}
              </Label>
              <Input
                id="tm-avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null
                  setAvatarFile(f)
                }}
                className={cn(fieldInputClassName(), 'cursor-pointer')}
              />
              {mode === 'edit' && initial && !avatarFile ? (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-2">
                  <img
                    src={initial.avatar}
                    alt=""
                    className="size-12 rounded-lg object-cover"
                  />
                  <span className="text-xs text-gray-500">Avatar saat ini</span>
                </div>
              ) : null}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending} className="gap-2">
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Menyimpan…
                </>
              ) : mode === 'create' ? (
                'Simpan'
              ) : (
                'Perbarui'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Stars({
  value,
  size = 'md',
  className,
}: {
  value: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const icon = size === 'sm' ? 'size-3.5' : size === 'lg' ? 'size-6' : 'size-4'
  const nodes: ReactNode[] = []
  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      nodes.push(
        <Star
          key={i}
          className={cn(icon, 'fill-amber-400 text-amber-400')}
          aria-hidden
        />,
      )
    } else if (value >= i - 0.5) {
      nodes.push(
        <StarHalf
          key={i}
          className={cn(icon, 'fill-amber-400 text-amber-400')}
          aria-hidden
        />,
      )
    } else {
      nodes.push(
        <Star key={i} className={cn(icon, 'text-gray-200')} aria-hidden />,
      )
    }
  }
  return <div className={cn('flex gap-0.5', className)}>{nodes}</div>
}
