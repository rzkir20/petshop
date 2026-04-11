import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useId } from 'react'

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
import { QuillEditor } from '#/components/ui/QuillEditor'
import { Select } from '#/components/ui/select'
import {
  blogQueryKeys,
  getBlog,
  useBlogCrudMutations,
  useBlogEditFormState,
} from '#/services/blog.service'

export const Route = createFileRoute('/dashboard/blog/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const titleId = useId()
  const deleteTitleId = useId()

  const { update, remove } = useBlogCrudMutations()

  const postQuery = useQuery({
    queryKey: blogQueryKeys.detail(id),
    queryFn: () => getBlog(id),
    staleTime: 30_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
  })

  const p = postQuery.data ?? null
  const form = useBlogEditFormState(id, p)

  return (
    <div className="space-y-6 p-8">
      <Dialog open={form.confirmOpen} onOpenChange={form.setConfirmOpen}>
        <DialogContent aria-labelledby={deleteTitleId} showClose={false}>
          <DialogHeader>
            <DialogTitle id={deleteTitleId}>Hapus post?</DialogTitle>
            <DialogDescription>
              {p ? `Artikel "${p.title}" akan dihapus permanen.` : 'Post akan dihapus permanen.'}
            </DialogDescription>
            {remove.isError ? (
              <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                {remove.error instanceof Error
                  ? remove.error.message
                  : 'Gagal menghapus post'}
              </p>
            ) : null}
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              disabled={remove.isPending}
              onClick={() => form.setConfirmOpen(false)}
              className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={remove.isPending}
              onClick={() => {
                remove.mutate(id, {
                  onSuccess: () => {
                    form.setConfirmOpen(false)
                    void navigate({ to: '/dashboard/blog' })
                  },
                })
              }}
              className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {remove.isPending ? 'Deleting…' : 'Delete'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className="rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-emerald-600">Blog / Posts</p>
            <h1
              id={titleId}
              className="mt-2 font-display text-3xl font-bold tracking-tight"
            >
              Edit Post
            </h1>
            <p className="mt-1 text-sm text-gray-500">Perbarui artikel lalu simpan.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void navigate({ to: '/dashboard/blog' })}
              className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => form.setConfirmOpen(true)}
              className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </header>

        {postQuery.isPending ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : postQuery.isError ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {postQuery.error instanceof Error
              ? postQuery.error.message
              : 'Gagal memuat post'}
          </div>
        ) : p ? (
          <form
            className="flex flex-col space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              if (!form.updateVariables) return
              update.mutate(form.updateVariables, {
                onSuccess: () => {
                  form.clearThumbnailFile()
                  void postQuery.refetch()
                },
              })
            }}
          >
            {update.isError ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {update.error instanceof Error
                  ? update.error.message
                  : 'Gagal menyimpan perubahan'}
              </div>
            ) : null}

            {!form.authorFromSession ? (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Tidak bisa menyimpan: pastikan Anda login dan profil memiliki nama.
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm">
                <span className="font-medium text-emerald-900">Penulis (akun ini)</span>
                <span className="text-gray-700">{form.authorFromSession.name}</span>
                {form.authorFromSession.pictures ? (
                  <img
                    src={form.authorFromSession.pictures}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : null}
                <span className="text-xs text-gray-500">
                  Tersimpan sebelumnya: {p.author.name}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-blog-title">Title</Label>
                <Input
                  id="edit-blog-title"
                  required
                  value={form.title}
                  onChange={(e) => form.setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-blog-slug">Slug</Label>
                <Input
                  id="edit-blog-slug"
                  required
                  value={form.slug}
                  onChange={(e) => form.setSlug(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-blog-category">Category</Label>
                <Select
                  id="edit-blog-category"
                  required
                  value={form.category}
                  disabled={
                    form.categoriesQuery.isPending ||
                    (form.categorySelectOptions.length === 0 && !form.category)
                  }
                  onChange={(e) => form.setCategory(e.target.value)}
                >
                  {form.categorySelectOptions.length === 0 ? (
                    <option value="">Tidak ada kategori</option>
                  ) : null}
                  {form.categorySelectOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-blog-status">Status</Label>
                <Select
                  id="edit-blog-status"
                  value={form.status}
                  onChange={(e) => form.setStatus(e.target.value as BlogPostStatus)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-blog-thumbnail-file">Thumbnail</Label>
              <input
                ref={form.thumbInputRef}
                id="edit-blog-thumbnail-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  form.setThumbnailFile(e.target.files?.[0] ?? null)
                  e.target.value = ''
                }}
              />
              <button
                type="button"
                onClick={() => form.thumbInputRef.current?.click()}
                className="w-full rounded-xl border-2 border-dashed border-emerald-200 bg-white px-4 py-4 text-left text-sm text-gray-600 transition hover:border-emerald-400 hover:bg-emerald-50/50"
              >
                {form.thumbnailFile
                  ? form.thumbnailFile.name
                  : form.thumbnail
                    ? 'Ganti gambar (thumbnail saat ini di bawah)'
                    : 'Pilih gambar'}
              </button>
              {form.newThumbPreviewUrl ? (
                <div className="mt-2">
                  <p className="mb-1 text-xs text-gray-500">Pratinjau baru</p>
                  <img
                    src={form.newThumbPreviewUrl}
                    alt=""
                    className="max-h-40 rounded-xl border border-emerald-100 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => form.setThumbnailFile(null)}
                    className="mt-2 text-xs font-semibold text-red-600 hover:underline"
                  >
                    Batalkan gambar baru
                  </button>
                </div>
              ) : form.thumbnail.trim() ? (
                <img
                  src={form.thumbnail}
                  alt=""
                  className="mt-2 max-h-40 rounded-xl border border-emerald-100 object-cover"
                />
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-blog-description">Description</Label>
              <Input
                id="edit-blog-description"
                value={form.description}
                onChange={(e) => form.setDescription(e.target.value)}
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
                type="submit"
                disabled={update.isPending || !form.canSubmit}
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {update.isPending ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        ) : null}
      </section>
    </div>
  )
}
