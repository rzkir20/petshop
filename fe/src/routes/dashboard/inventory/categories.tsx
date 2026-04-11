import { createFileRoute } from '@tanstack/react-router'

import { useId } from 'react'

import {
  ChevronRight,
  FolderTree,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'

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

import { Select } from '#/components/ui/select'

import { CategoriesTableSkeleton } from '#/hooks/SkelatonUi'

import { useCategoriesCrudState } from '#/services/categories.service'

import { formatUpdatedAt } from '#/hooks/format-date'

export const Route = createFileRoute('/dashboard/inventory/categories')({
  component: InventoryCategoriesPage,
})

function InventoryCategoriesPage() {
  const addTitleId = useId()
  const editTitleId = useId()
  const deleteTitleId = useId()

  const {
    items,
    loading,
    loadError,
    search,
    setSearch,
    filtered,
    refresh,
    addOpen,
    setAddOpen,
    openAdd,
    addFormKey,
    addSubmitting,
    addError,
    onAddSubmit,
    addName,
    setAddName,
    addDescription,
    setAddDescription,
    addSlug,
    editing,
    setEditing,
    editSubmitting,
    editError,
    onEditSubmit,
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    editSlug,
    deleting,
    setDeleting,
    deleteSubmitting,
    deleteError,
    confirmDelete,
    resetEditError,
  } = useCategoriesCrudState()

  return (
    <div className="space-y-6 p-8">
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent aria-labelledby={addTitleId}>
          <DialogHeader>
            <DialogTitle id={addTitleId}>Tambah kategori</DialogTitle>
            <DialogDescription>
              Slug dibuat otomatis dari nama (huruf kecil, pakai tanda hubung).
              Status bisa Anda pilih.
            </DialogDescription>
          </DialogHeader>
          <form
            key={addFormKey}
            className="space-y-4"
            onSubmit={(e) => void onAddSubmit(e)}
          >
            {addError ? (
              <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                {addError}
              </p>
            ) : null}
            <div>
              <Label htmlFor="category-name">Nama kategori</Label>
              <Input
                id="category-name"
                name="name"
                required
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder="Contoh: Makanan kucing"
              />
            </div>
            <div>
              <Label htmlFor="category-slug">Slug</Label>
              <input type="hidden" name="slug" value={addSlug} />
              <Input
                id="category-slug"
                readOnly
                value={addSlug}
                placeholder="otomatis-dari-nama"
                className="cursor-not-allowed bg-emerald-50/60 text-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="category-description">Deskripsi</Label>
              <Input
                id="category-description"
                name="description"
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                placeholder="Contoh: Semua kebutuhan makanan untuk kucing"
              />
            </div>
            <div>
              <Label htmlFor="category-status">Status</Label>
              <Select id="category-status" name="status" defaultValue="active">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
            <DialogFooter>
              <button
                type="button"
                disabled={addSubmitting}
                onClick={() => setAddOpen(false)}
                className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={addSubmitting || addSlug.length === 0}
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {addSubmitting ? 'Menyimpan…' : 'Simpan'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={editing != null}
        onOpenChange={(o) => {
          if (!o) setEditing(null)
        }}
      >
        <DialogContent aria-labelledby={editTitleId}>
          {editing ? (
            <>
              <DialogHeader>
                <DialogTitle id={editTitleId}>Edit kategori</DialogTitle>
                <DialogDescription>
                  Slug mengikuti nama secara otomatis. Pastikan nama sudah benar
                  sebelum menyimpan.
                </DialogDescription>
              </DialogHeader>
              <form
                key={editing._id}
                className="space-y-4"
                onSubmit={(e) => void onEditSubmit(e)}
              >
                {editError ? (
                  <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {editError}
                  </p>
                ) : null}
                <div>
                  <Label htmlFor="edit-category-name">Nama kategori</Label>
                  <Input
                    id="edit-category-name"
                    name="name"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Contoh: Makanan kucing"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category-slug">Slug</Label>
                  <input type="hidden" name="slug" value={editSlug} />
                  <Input
                    id="edit-category-slug"
                    readOnly
                    value={editSlug}
                    placeholder="otomatis-dari-nama"
                    className="cursor-not-allowed bg-emerald-50/60 text-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category-description">Deskripsi</Label>
                  <Input
                    id="edit-category-description"
                    name="description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Contoh: Semua kebutuhan makanan untuk kucing"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category-status">Status</Label>
                  <Select
                    id="edit-category-status"
                    name="status"
                    defaultValue={editing.status}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </div>
                <DialogFooter>
                  <button
                    type="button"
                    disabled={editSubmitting}
                    onClick={() => setEditing(null)}
                    className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50 disabled:opacity-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={editSubmitting || editSlug.length === 0}
                    className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600 disabled:opacity-50"
                  >
                    {editSubmitting ? 'Menyimpan…' : 'Simpan perubahan'}
                  </button>
                </DialogFooter>
              </form>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleting != null}
        onOpenChange={(o) => {
          if (!o) setDeleting(null)
        }}
      >
        <DialogContent aria-labelledby={deleteTitleId} showClose={false}>
          <DialogHeader>
            <DialogTitle id={deleteTitleId}>Hapus kategori?</DialogTitle>
            <DialogDescription>
              {deleting
                ? `Kategori "${deleting.name}" akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.`
                : null}
            </DialogDescription>
            {deleteError ? (
              <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
                {deleteError}
              </p>
            ) : null}
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              disabled={deleteSubmitting}
              onClick={() => setDeleting(null)}
              className="rounded-full border border-emerald-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-emerald-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={deleteSubmitting}
              onClick={() => void confirmDelete()}
              className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {deleteSubmitting ? 'Menghapus…' : 'Hapus'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-600">
            <FolderTree size={14} />
            Inventory
            <ChevronRight size={12} />
            Categories
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
            Product Categories
          </h1>
          <p className="mt-1 text-gray-500">
            Kelola kategori produk supaya pencarian dan grouping lebih rapi.
            {!loading && items.length > 0 ? (
              <span className="mt-2 block text-sm text-[#173a40]">
                <span className="font-semibold text-emerald-600">
                  {items.length}
                </span>{' '}
                kategori
                {search.trim() ? (
                  <>
                    {' '}
                    ·{' '}
                    <span className="font-semibold text-emerald-600">
                      {filtered.length}
                    </span>{' '}
                    cocok filter
                  </>
                ) : null}
              </span>
            ) : null}
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-colors hover:bg-emerald-600"
        >
          <Plus size={16} />
          Add Category
        </button>
      </section>

      {loadError ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
          <span>{loadError}</span>
          <button
            type="button"
            onClick={() => void refresh()}
            className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-red-700 shadow-sm ring-1 ring-red-100"
          >
            Coba lagi
          </button>
        </div>
      ) : null}

      <section className="rounded-[32px] border border-emerald-50 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category name..."
              aria-label="Cari nama kategori"
              className="rounded-full py-2 pr-4 pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <CategoriesTableSkeleton rows={8} />
          ) : (
            <table className="w-full min-w-[680px] text-left">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  <th className="px-4 py-3">Category Name</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 tabular-nums">Products</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-sm text-gray-500"
                    >
                      {items.length === 0
                        ? 'Belum ada kategori. Klik Add Category untuk menambahkan.'
                        : 'Tidak ada kategori yang cocok dengan pencarian.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((category) => (
                    <tr
                      key={category._id}
                      className="border-t border-emerald-50 text-sm text-gray-700"
                    >
                      <td className="px-4 py-4 font-semibold text-[#173a40]">
                        {category.name}
                      </td>
                      <td className="max-w-xs px-4 py-4 text-gray-500">
                        <p className="truncate">
                          {category.description || '-'}
                        </p>
                      </td>
                      <td className="px-4 py-4 tabular-nums">
                        <span className="inline-flex min-w-10 justify-end font-semibold text-[#173a40]">
                          {Number(category.count).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-500">
                        {category.slug}
                      </td>
                      <td className="px-4 py-4 text-gray-500">
                        {formatUpdatedAt(category.updatedAt)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            category.status === 'active'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {category.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            type="button"
                            aria-label={`Edit kategori ${category.name}`}
                            onClick={() => {
                              resetEditError()
                              setEditing(category)
                            }}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <Pencil size={18} strokeWidth={2} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Hapus kategori ${category.name}`}
                            onClick={() => setDeleting(category)}
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={18} strokeWidth={2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
