import { createFileRoute, useNavigate  } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query'

import { useId, useState } from 'react'

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
  getProduct,
  useProductEditFormState,
  productsQueryKeys,
  useProductsCrudMutations,
} from '#/services/products.service'

export const Route = createFileRoute('/dashboard/inventory/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const titleId = useId()
  const deleteTitleId = useId()

  const { update, remove } = useProductsCrudMutations()
  const productQuery = useQuery({
    queryKey: [...productsQueryKeys.all, 'detail', id],
    queryFn: () => getProduct(id),
    staleTime: 30_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
  })

  const p = productQuery.data ?? null
  const form = useProductEditFormState(p)

  const [confirmOpen, setConfirmOpen] = useState(false)


  return (
    <div className="space-y-6 p-8">
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent aria-labelledby={deleteTitleId} showClose={false}>
          <DialogHeader>
            <DialogTitle id={deleteTitleId}>Delete product?</DialogTitle>
            <DialogDescription>
              {p
                ? `Produk "${p.title}" akan dihapus permanen.`
                : 'Produk akan dihapus permanen.'}
            </DialogDescription>
            {remove.isError ? (
              <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                {remove.error instanceof Error
                  ? remove.error.message
                  : 'Gagal menghapus produk'}
              </p>
            ) : null}
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              disabled={remove.isPending}
              onClick={() => setConfirmOpen(false)}
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
                    setConfirmOpen(false)
                    void navigate({ to: '/dashboard/inventory' })
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
            <p className="text-xs font-semibold tracking-wide text-emerald-600">
              Inventory / Products
            </p>
            <h1
              id={titleId}
              className="mt-2 font-display text-3xl font-bold tracking-tight"
            >
              Edit Product
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Update data produk lalu simpan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void navigate({ to: '/dashboard/inventory' })}
              className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </header>

        {productQuery.isPending ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : productQuery.isError ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {productQuery.error instanceof Error
              ? productQuery.error.message
              : 'Gagal memuat produk'}
          </div>
        ) : p ? (
          <form
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault()
              update.mutate(
                {
                  id,
                  input: form.updateInput,
                },
                {
                  onSuccess: () => {
                    void navigate({ to: '/dashboard/inventory' })
                  },
                },
              )
            }}
          >
            {update.isError ? (
              <div className="md:col-span-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {update.error instanceof Error
                  ? update.error.message
                  : 'Gagal menyimpan perubahan'}
              </div>
            ) : null}

            <div className="md:col-span-2">
              <Label htmlFor="edit-product-title">Product title</Label>
              <Input
                id="edit-product-title"
                required
                value={form.title}
                onChange={(e) => form.setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="edit-product-slug">Slug</Label>
              <Input id="edit-product-slug" value={form.slug} readOnly />
            </div>

            <div>
              <Label htmlFor="edit-product-expired-at">Masa kadaluarsa</Label>
              <Input
                id="edit-product-expired-at"
                type="date"
                required
                value={form.expiredAt}
                onChange={(e) => form.setExpiredAt(e.target.value)}
                onClick={(e) => {
                  const input = e.currentTarget as HTMLInputElement & {
                    showPicker?: () => void
                  }
                  if (typeof input.showPicker === 'function') {
                    input.showPicker()
                  }
                }}
              />
            </div>

            <div>
              <Label htmlFor="edit-product-flavor">Flavor</Label>
              <Input
                id="edit-product-flavor"
                required
                value={form.flavor}
                onChange={(e) => form.setFlavor(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="edit-product-weight">Weight</Label>
              <Input
                id="edit-product-weight"
                required
                value={form.weight}
                onChange={(e) => form.setWeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="edit-product-category">Category</Label>
              <Select
                id="edit-product-category"
                value={form.category}
                disabled={form.categoriesQuery.isPending || form.categoryOptions.length === 0}
                onChange={(e) => form.setCategory(e.target.value)}
              >
                {form.categoryOptions.length === 0 ? (
                  <option value="">No active category available</option>
                ) : null}
                {form.categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-product-status">Stock status</Label>
              <Select
                id="edit-product-status"
                value={form.status}
                onChange={(e) =>
                  form.setStatus(e.target.value as typeof form.status)
                }
              >
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-product-price">Price</Label>
              <Input
                id="edit-product-price"
                type="number"
                min={0}
                required
                value={String(form.price)}
                onChange={(e) => form.setPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="edit-product-is-best-seller">Best seller</Label>
              <Select
                id="edit-product-is-best-seller"
                value={form.isBestSeller ? 'true' : 'false'}
                onChange={(e) => form.setIsBestSeller(e.target.value === 'true')}
              >
                <option value="false">False</option>
                <option value="true">True</option>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="edit-product-content">Content</Label>
              <QuillEditor
                value={form.content}
                onChange={form.setContent}
                placeholder="Deskripsi produk..."
              />
            </div>

            <div>
              <Label htmlFor="edit-product-stock-current">Stock current</Label>
              <Input
                id="edit-product-stock-current"
                type="number"
                min={0}
                required
                value={String(form.stockCurrent)}
                onChange={(e) => form.setStockCurrent(Number(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="edit-product-stock-max">Stock max</Label>
              <Input
                id="edit-product-stock-max"
                type="number"
                min={0}
                required
                value={String(form.stockMax)}
                onChange={(e) => form.setStockMax(Number(e.target.value))}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="edit-product-reorder">Reorder point</Label>
              <Input
                id="edit-product-reorder"
                required
                value={form.reorder}
                onChange={(e) => form.setReorder(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="edit-product-image-file">Product images</Label>
              <input
                ref={form.fileInputRef}
                id="edit-product-image-file"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  form.appendFiles(Array.from(e.target.files ?? []))
                  e.currentTarget.value = ''
                }}
              />
              <button
                type="button"
                onClick={() => form.fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  form.setDragOverUpload(true)
                }}
                onDragLeave={() => form.setDragOverUpload(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  form.setDragOverUpload(false)
                  form.appendFiles(Array.from(e.dataTransfer.files))
                }}
                className={`w-full rounded-xl border-2 border-dashed px-4 py-6 text-sm transition ${
                  form.dragOverUpload
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                    : 'border-emerald-200 bg-white text-gray-500 hover:bg-emerald-50'
                }`}
              >
                Drag & drop images here, atau klik untuk pilih file
              </button>
              <p className="mt-1 text-xs text-gray-400">
                Pilih satu atau lebih gambar untuk mengganti galeri.
              </p>
              {form.images.length > 0 ? (
                <div className="mt-3">
                  <p className="mb-2 text-xs font-semibold text-gray-500">Existing images</p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {form.images.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        draggable
                        onDragStart={() => form.setDraggedExistingIndex(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          if (form.draggedExistingIndex === null) return
                          form.moveExistingImage(form.draggedExistingIndex, index)
                          form.setDraggedExistingIndex(null)
                        }}
                        className="relative overflow-hidden rounded-xl border border-emerald-100 bg-white"
                      >
                        <img src={url} alt={`existing-${index + 1}`} className="h-24 w-full object-cover" />
                        <div className="px-2 py-1 text-[10px] text-gray-500">
                          {index === 0 ? 'Thumbnail' : `Image ${index + 1}`}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            form.setImages((prev) => prev.filter((_, i) => i !== index))
                          }
                          className="absolute top-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {form.imagePreviews.length > 0 ? (
                <div className="mt-3">
                  <p className="mb-2 text-xs font-semibold text-gray-500">New images</p>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {form.imagePreviews.map((item, index) => (
                      <div
                        key={`${item.file.name}-${index}`}
                        draggable
                        onDragStart={() => form.setDraggedNewIndex(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          if (form.draggedNewIndex === null) return
                          form.moveNewImage(form.draggedNewIndex, index)
                          form.setDraggedNewIndex(null)
                        }}
                        className="relative overflow-hidden rounded-xl border border-emerald-100 bg-white"
                      >
                        <img src={item.url} alt={item.file.name} className="h-24 w-full object-cover" />
                        <div className="px-2 py-1 text-[10px] text-gray-500">
                          {index === 0 ? 'Thumbnail (new)' : `New ${index + 1}`}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            form.setImageFiles((prev) => prev.filter((_, i) => i !== index))
                          }
                          className="absolute top-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="edit-product-thumbnail">Thumbnail</Label>
              <Input
                id="edit-product-thumbnail"
                value={form.thumbnail}
                onChange={(e) => form.setThumbnail(e.target.value)}
                placeholder={form.effectiveThumbnail || 'food / toy / groom / cat'}
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap justify-end gap-2 pt-2">
              <button
                type="submit"
                disabled={update.isPending || !form.category}
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {update.isPending ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-500">Product not found.</p>
        )}
      </section>
    </div>
  )
}
