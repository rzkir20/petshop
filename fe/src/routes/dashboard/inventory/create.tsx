import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useId, useState } from 'react'

import { Input } from '#/components/ui/input'

import { Label } from '#/components/ui/label'

import { QuillEditor } from '#/components/ui/QuillEditor'

import { Select } from '#/components/ui/select'

import { ProductCreateFormSkeleton } from '#/hooks/SkelatonUi'

import {
  useProductCreateFormState,
  useProductsCrudMutations,
} from '#/services/products.service'

export const Route = createFileRoute('/dashboard/inventory/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const titleId = useId()
  const [imageUrlDraft, setImageUrlDraft] = useState('')
  const { create } = useProductsCrudMutations()
  const form = useProductCreateFormState()
  const categoriesLoading = form.categoriesQuery.isPending
  const imageSlotsFull = form.imageEntries.length >= 10

  return (
    <div className="space-y-6 p-8">
      <section className="rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm">
        <header className="mb-6">
          <p className="text-xs font-semibold tracking-wide text-emerald-600">
            Inventory / Products
          </p>
          <h1
            id={titleId}
            className="mt-2 font-display text-3xl font-bold tracking-tight"
          >
            Add New Product
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Isi data produk utama lalu simpan.
          </p>
        </header>

        {categoriesLoading ? (
          <ProductCreateFormSkeleton />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              create.mutate(form.createInput, {
                onSuccess: () => {
                  void navigate({ to: '/dashboard/inventory' })
                },
              })
            }}
            className="flex flex-col space-y-6"
          >
            {create.isError ? (
              <div className="md:col-span-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {create.error instanceof Error
                  ? create.error.message
                  : 'Gagal membuat produk'}
              </div>
            ) : null}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="product-title">Product title</Label>
                <Input
                  id="product-title"
                  required
                  value={form.title}
                  onChange={(e) => form.setTitle(e.target.value)}
                  placeholder="Contoh: Premium Salmon Mix 5kg"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="product-slug">Slug</Label>
                <Input id="product-slug" value={form.slug} readOnly />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="product-category">Category</Label>
                <Select
                  id="product-category"
                  value={form.category}
                  disabled={form.categoryOptions.length === 0}
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="product-is-best-seller">Best seller</Label>
                <Select
                  id="product-is-best-seller"
                  value={form.isBestSeller ? 'true' : 'false'}
                  onChange={(e) =>
                    form.setIsBestSeller(e.target.value === 'true')
                  }
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="product-status">Stock status</Label>
                <Select
                  id="product-status"
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
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="product-price">Price</Label>
                <Input
                  id="product-price"
                  type="number"
                  min={0}
                  required
                  value={String(form.price)}
                  onChange={(e) => form.setPrice(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="product-reorder">Reorder point</Label>
                <Input
                  id="product-reorder"
                  required
                  value={form.reorder}
                  onChange={(e) => form.setReorder(e.target.value)}
                  placeholder="Contoh: 25 units"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="product-weight">Weight</Label>
                <Input
                  id="product-weight"
                  required
                  value={form.weight}
                  onChange={(e) => form.setWeight(e.target.value)}
                  placeholder="1kg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="product-expired-at">Masa kadaluarsa</Label>
                <Input
                  id="product-expired-at"
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="product-flavor">Flavor</Label>
                <Input
                  id="product-flavor"
                  required
                  value={form.flavor}
                  onChange={(e) => form.setFlavor(e.target.value)}
                  placeholder="Chicken"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="product-stock-current">Stock current</Label>
                <Input
                  id="product-stock-current"
                  type="number"
                  min={0}
                  required
                  value={String(form.stockCurrent)}
                  onChange={(e) => form.setStockCurrent(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="product-stock-max">Stock max</Label>
                <Input
                  id="product-stock-max"
                  type="number"
                  min={0}
                  required
                  value={String(form.stockMax)}
                  onChange={(e) => form.setStockMax(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="product-content">Content</Label>
              <QuillEditor
                value={form.content}
                onChange={form.setContent}
                placeholder="Deskripsi produk..."
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="product-highlights">Highlights</Label>
              <textarea
                id="product-highlights"
                value={form.highlightsText}
                onChange={(e) => form.setHighlightsText(e.target.value)}
                placeholder={'Satu highlight per baris\nContoh: Real Tuna #1 Ingredient'}
                className="mt-2 min-h-28 w-full rounded-xl border border-emerald-100 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="md:col-span-2 space-y-4">
              <div>
                <Label htmlFor="product-image-url">Gambar dari URL</Label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="product-image-url"
                    type="url"
                    inputMode="url"
                    autoComplete="off"
                    placeholder="https://contoh.com/gambar.jpg"
                    value={imageUrlDraft}
                    disabled={imageSlotsFull}
                    onChange={(e) => setImageUrlDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== 'Enter') return
                      e.preventDefault()
                      form.appendImageUrl(imageUrlDraft)
                      setImageUrlDraft('')
                    }}
                    className="sm:flex-1"
                  />
                  <button
                    type="button"
                    disabled={imageSlotsFull || !imageUrlDraft.trim()}
                    onClick={() => {
                      form.appendImageUrl(imageUrlDraft)
                      setImageUrlDraft('')
                    }}
                    className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
                  >
                    Tambah URL
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  URL harus http atau https. Maks. 10 gambar total (URL + file).
                </p>
              </div>

              <div>
                <Label htmlFor="product-image-file">Unggah gambar dari file</Label>
                <input
                  ref={form.fileInputRef}
                  id="product-image-file"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  disabled={imageSlotsFull}
                  onChange={(e) => {
                    form.appendFiles(Array.from(e.target.files ?? []))
                    e.currentTarget.value = ''
                  }}
                />
                <button
                  type="button"
                  disabled={imageSlotsFull}
                  onClick={() => form.fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    if (!imageSlotsFull) form.setDragOverUpload(true)
                  }}
                  onDragLeave={() => form.setDragOverUpload(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    form.setDragOverUpload(false)
                    if (imageSlotsFull) return
                    form.appendFiles(Array.from(e.dataTransfer.files))
                  }}
                  className={`mt-2 w-full rounded-xl border-2 border-dashed px-4 py-6 text-sm transition ${
                    form.dragOverUpload
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                      : 'border-emerald-200 bg-white text-gray-500 hover:bg-emerald-50'
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  Drag & drop di sini, atau klik untuk pilih file
                </button>
                <p className="mt-1 text-xs text-gray-400">
                  Boleh campur URL dan file; urutan di bawah = urutan di toko
                  (yang pertama = thumbnail).
                </p>
              </div>

              {form.imagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {form.imagePreviews.map((item, index) => (
                    <div
                      key={
                        item.kind === 'file'
                          ? `${item.file.name}-${index}`
                          : `${item.url}-${index}`
                      }
                      draggable
                      onDragStart={() => form.setDraggedImageIndex(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (form.draggedImageIndex === null) return
                        form.moveImage(form.draggedImageIndex, index)
                        form.setDraggedImageIndex(null)
                      }}
                      className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-white"
                    >
                      <img
                        src={item.url}
                        alt={item.label}
                        className="h-24 w-full object-cover"
                      />
                      <div className="flex items-center justify-between gap-1 px-2 py-1 text-[10px] text-gray-500">
                        <span>
                          {index === 0 ? 'Thumbnail' : `#${index + 1}`}
                        </span>
                        <span className="shrink-0 rounded bg-emerald-50 px-1 text-emerald-700">
                          {item.kind === 'url' ? 'URL' : 'File'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          form.setImageEntries((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="absolute top-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="md:col-span-2 flex flex-wrap justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => void navigate({ to: '/dashboard/inventory' })}
                className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={create.isPending || !form.category}
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {create.isPending ? 'Saving…' : 'Create Product'}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}
