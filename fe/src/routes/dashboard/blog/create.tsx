import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useId } from 'react'

import { Input } from '#/components/ui/input'

import { Label } from '#/components/ui/label'

import { QuillEditor } from '#/components/ui/QuillEditor'

import { Select } from '#/components/ui/select'

import { useBlogCreateFormState, useBlogCrudMutations } from '#/services/blog.service'

export const Route = createFileRoute('/dashboard/blog/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const titleId = useId()
  const { create } = useBlogCrudMutations()
  const form = useBlogCreateFormState()

  return (
    <div className="space-y-6 p-8">
      <section className="rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm">
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-wide text-emerald-600">Blog / Posts</p>
          <h1
            id={titleId}
            className="mt-2 font-display text-3xl font-bold tracking-tight"
          >
            New Post
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Penulis diambil dari akun yang login. Judul, slug, kategori aktif, dan konten wajib
            diisi.
          </p>
        </header>

        {form.categoriesQuery.isPending ? (
          <p className="text-sm text-gray-500">Memuat kategori…</p>
        ) : (
          <form
            className="flex flex-col space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              if (!form.canSubmit || !form.category || !form.createPayload) return
              create.mutate(form.createPayload, {
                onSuccess: () => {
                  void navigate({ to: '/dashboard/blog' })
                },
              })
            }}
          >
            {create.isError ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {create.error instanceof Error
                  ? create.error.message
                  : 'Gagal membuat post'}
              </div>
            ) : null}

            {!form.authorFromSession ? (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Tidak bisa menentukan penulis: pastikan Anda login dan profil memiliki nama.
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm">
                <span className="font-medium text-emerald-900">Penulis</span>
                <span className="text-gray-700">{form.authorFromSession.name}</span>
                {form.authorFromSession.pictures ? (
                  <img
                    src={form.authorFromSession.pictures}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : null}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="blog-title">Title</Label>
                <Input
                  id="blog-title"
                  required
                  value={form.title}
                  onChange={(e) => form.setTitle(e.target.value)}
                  placeholder="Judul artikel"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="blog-slug">Slug</Label>
                <Input
                  id="blog-slug"
                  value={form.slug}
                  readOnly
                  placeholder="auto-dari-judul"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="blog-category">Category</Label>
                <Select
                  id="blog-category"
                  required
                  value={form.category}
                  disabled={form.categoryOptions.length === 0}
                  onChange={(e) => form.setCategory(e.target.value)}
                >
                  <option value="">
                    {form.categoryOptions.length === 0
                      ? 'Tidak ada kategori aktif — buat di Blog categories'
                      : 'Pilih kategori'}
                  </option>
                  {form.categoryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="blog-status">Status</Label>
                <Select
                  id="blog-status"
                  value={form.status}
                  onChange={(e) => form.setStatus(e.target.value as BlogPostStatus)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="blog-thumbnail-file">Thumbnail</Label>
              <input
                ref={form.thumbInputRef}
                id="blog-thumbnail-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null
                  form.setThumbnailFile(f)
                  e.target.value = ''
                }}
              />
              <button
                type="button"
                onClick={() => form.thumbInputRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-emerald-200 bg-white px-4 py-4 text-left text-sm text-gray-600 transition hover:border-emerald-400 hover:bg-emerald-50/50"
              >
                {form.thumbnailFile ? form.thumbnailFile.name : 'Pilih gambar (opsional)'}
              </button>
              {form.thumbnailPreviewUrl ? (
                <div className="relative mt-2 inline-block">
                  <img
                    src={form.thumbnailPreviewUrl}
                    alt="Pratinjau thumbnail"
                    className="max-h-40 rounded-xl border border-emerald-100 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => form.setThumbnailFile(null)}
                    className="mt-2 text-xs font-semibold text-red-600 hover:underline"
                  >
                    Hapus gambar
                  </button>
                </div>
              ) : null}
              <p className="text-xs text-gray-400">
                Unggah ke ImageKit lewat server. Kosongkan jika tidak perlu thumbnail.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="blog-description">Description</Label>
              <Input
                id="blog-description"
                value={form.description}
                onChange={(e) => form.setDescription(e.target.value)}
                placeholder="Ringkasan singkat"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <QuillEditor
                value={form.content}
                onChange={form.setContent}
                placeholder="Isi artikel…"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => void navigate({ to: '/dashboard/blog' })}
                className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  create.isPending ||
                  !form.canSubmit ||
                  form.categoryOptions.length === 0
                }
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {create.isPending ? 'Saving…' : 'Create post'}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
