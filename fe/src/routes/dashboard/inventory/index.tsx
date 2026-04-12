import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  ChevronDown,
  Edit2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react'

import { Fragment, useEffect, useState } from 'react'

import { Button } from '#/components/ui/button'

import { Empaty } from '#/components/ui/empaty'

import { Pagination } from '#/components/ui/pagination'

import { InventoryTableSkeleton } from '#/hooks/SkelatonUi'

import {
  useProductsInventoryFiltersState,
  useProductsCrudMutations,
  useProductsInventoryState,
  useProductsInventoryUiState,
} from '#/services/products.service'

export const Route = createFileRoute('/dashboard/inventory/')({
  component: InventoryPage,
})

const PAGE_SIZE = 10

function statusPillClass(s: StockStatus) {
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

function statusLabel(s: StockStatus) {
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

function InventoryPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const filters = useProductsInventoryFiltersState()
  const { products, total: totalItems, loading, error, refresh } =
    useProductsInventoryState({
      category: filters.activeCategory,
      q: filters.searchQuery,
      page,
      limit: PAGE_SIZE,
    })

  const totalPages =
    totalItems === 0 ? 0 : Math.ceil(totalItems / PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [filters.activeCategory, filters.searchQuery])

  useEffect(() => {
    if (totalPages === 0) return
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  const ui = useProductsInventoryUiState(products)
  const {
    expandedId,
    detailsOpen,
    detailProduct,
    selected,
    selectedCount,
    allVisibleSelected,
    visibleIds,
    toggleExpand,
    closeDetails,
    toggleSelect,
    toggleSelectAll,
    deselectAll,
    deselectOne,
  } = ui
  const { remove } = useProductsCrudMutations()

  async function deleteSelectedRows() {
    if (selected.size === 0 || remove.isPending) return
    const ok = window.confirm(`Hapus ${selected.size} produk terpilih?`)
    if (!ok) return
    const ids = Array.from(selected)
    try {
      await Promise.all(ids.map((id) => remove.mutateAsync(id)))
      deselectAll()
      if (expandedId && ids.includes(expandedId)) {
        closeDetails()
      }
    } catch {
      // Error handled by query refresh state.
    }
  }

  async function deleteRow(id: string, title: string) {
    if (remove.isPending) return
    const ok = window.confirm(`Hapus produk "${title}"?`)
    if (!ok) return
    try {
      await remove.mutateAsync(id)
      deselectOne(id)
      if (expandedId === id) {
        closeDetails()
      }
    } catch {
      // Error handled by query refresh state.
    }
  }

  function stockDisplay(p: ProductRow) {
    const cur = p.stockCurrent
    const tone =
      cur === 0
        ? 'text-red-500'
        : cur <= 25
          ? 'text-[#ff6b35]'
          : 'text-[#173a40]'
    return (
      <span className="text-sm font-bold">
        <span className={tone}>{cur}</span> / {p.stockMax}
      </span>
    )
  }

  return (
    <div className="flex flex-col gap-8 p-8 xl:flex-row">
      <div className="min-w-0 flex-1 space-y-8">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Inventory Management
            </h1>
            <p className="mt-1 text-gray-500">
              Monitor and optimize your product stock levels.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() =>
                void navigate({ to: '/dashboard/inventory/create' })
              }
              className="px-6 font-bold"
            >
              <Plus size={18} />
              <span>Add New Product</span>
            </Button>
          </div>
        </section>

        {error ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-800">
            <span>{error}</span>
            <Button
              onClick={() => void refresh()}
              variant="outline"
              size="sm"
              className="bg-white text-red-700 ring-1 ring-red-100 hover:bg-red-50"
            >
              <RefreshCw size={14} />
              Coba lagi
            </Button>
          </div>
        ) : null}

        <section className="space-y-6 rounded-[32px] border border-emerald-50 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-2">
              {filters.categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => filters.setActiveCategory(tab.id)}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                    filters.activeCategory === tab.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-emerald-50 text-gray-500 hover:bg-emerald-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search
                size={16}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => filters.setSearchQuery(e.target.value)}
                placeholder="Search by product title..."
                className="w-full rounded-full border-none bg-emerald-50 py-2.5 pr-4 pl-12 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:outline-none md:w-72"
              />
            </div>
          </div>

          {selectedCount > 0 ? (
            <div className="flex items-center justify-between rounded-2xl bg-[#173a40] px-4 py-3 text-white">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xs font-medium">
                  {selectedCount} items selected
                </span>
                <div className="hidden h-4 w-px bg-white/20 sm:block" />
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    disabled={remove.isPending}
                    onClick={() => void deleteSelectedRows()}
                    variant="ghost"
                    size="sm"
                    className="rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                  >
                    <Trash2 size={12} />
                    {remove.isPending ? 'Deleting…' : 'Delete'}
                  </Button>
                </div>
              </div>
              <Button
                onClick={deselectAll}
                variant="ghost"
                size="sm"
                className="text-[11px] font-bold text-white underline opacity-70 hover:bg-transparent hover:text-white hover:opacity-100"
              >
                Deselect All
              </Button>
            </div>
          ) : null}

          <div className="overflow-x-auto">
            {loading ? (
              <InventoryTableSkeleton rows={8} />
            ) : products.length === 0 ? (
              <Empaty
                title="Produk tidak ditemukan"
                description="Coba ubah kata kunci pencarian atau pilih kategori lain."
              />
            ) : (
              <table className="w-full text-left">
                <thead className="border-b border-emerald-50">
                  <tr>
                    <th className="w-12 py-4 pl-6" />
                    <th className="w-10 px-4 py-4">
                      <input
                        type="checkbox"
                        checked={allVisibleSelected && visibleIds.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded accent-emerald-500"
                      />
                    </th>
                    {[
                      'Product Title',
                      'Stock Level',
                      'Reorder Point',
                      'Status',
                      'Last Updated',
                      'Actions',
                    ].map((h) => (
                      <th
                        key={h}
                        className={`px-4 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase ${
                          h === 'Actions' ? 'text-right' : ''
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50/50">
                  {products.map((p) => (
                    <Fragment key={p.id}>
                      <tr className="group hover:bg-gray-50/80">
                        <td className="py-5 pl-6">
                          <button
                            type="button"
                            onClick={() => toggleExpand(p.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-all hover:bg-emerald-50"
                            aria-expanded={expandedId === p.id}
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-300 ${expandedId === p.id ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </td>
                        <td className="px-4 py-5">
                          <input
                            type="checkbox"
                            checked={selected.has(p.id)}
                            onChange={() => toggleSelect(p.id)}
                            className="h-4 w-4 rounded accent-emerald-500"
                          />
                        </td>
                        <td className="px-4 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-xl bg-emerald-50 p-1">
                              <img
                                src={
                                  (p.images[0] ?? '').startsWith('http')
                                    ? p.images[0]
                                    : p.thumbnail.startsWith('http')
                                      ? p.thumbnail
                                      : `https://api.dicebear.com/7.x/shapes/svg?seed=${p.thumbnail}`
                                }
                                alt=""
                                className="h-full w-full"
                              />
                            </div>
                            <span className="text-sm font-bold">{p.title}</span>
                          </div>
                        </td>
                        <td className="px-4 py-5">{stockDisplay(p)}</td>
                        <td className="px-4 py-5 text-sm font-medium text-gray-400">
                          {p.reorder}
                        </td>
                        <td className="px-4 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${statusPillClass(p.status)}`}
                          >
                            {statusLabel(p.status)}
                          </span>
                        </td>
                        <td className="px-4 py-5 text-xs text-gray-400">
                          {p.updated}
                        </td>
                        <td className="px-4 py-5 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              void navigate({
                                to: '/dashboard/inventory/$id',
                                params: { id: p.id },
                              })
                            }
                            className="p-1 text-gray-400 hover:text-emerald-500"
                            aria-label="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            type="button"
                            disabled={remove.isPending}
                            onClick={() => void deleteRow(p.id, p.title)}
                            className="ml-2 p-1 text-gray-400 hover:text-red-500 disabled:opacity-50"
                            aria-label="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                      {expandedId === p.id ? (
                        <tr className="bg-emerald-50/20">
                          <td
                            colSpan={8}
                            className="border-b border-emerald-50 p-0"
                          >
                            <div className="px-8 pt-4 pb-8">
                              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                <h5 className="text-xs font-bold tracking-widest text-[#173a40] uppercase">
                                  Product Content
                                </h5>
                              </div>
                              <div className="rounded-2xl border border-emerald-50 bg-white p-6">
                                <div
                                  className="prose prose-sm max-w-none text-gray-600"
                                  dangerouslySetInnerHTML={{
                                    __html: p.content || '<p>-</p>',
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {!loading && products.length > 0 ? (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              itemLabel="products"
            />
          ) : null}
        </section>
      </div>

      {detailsOpen && detailProduct ? (
        <aside className="w-full shrink-0 transition-all duration-300 ease-in-out xl:ml-8 xl:w-[350px] xl:max-w-[350px]">
          <div className="sticky top-8 flex w-full min-w-[300px] max-w-[350px] flex-col rounded-[40px] border border-emerald-50 bg-white shadow-sm xl:w-[350px]">
            <div className="flex items-center justify-between rounded-t-[40px] border-b border-emerald-50 bg-emerald-50/50 p-6">
              <h3 className="font-bold text-[#173a40]">Product Details</h3>
              <button
                type="button"
                onClick={closeDetails}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white"
                aria-label="Close"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="space-y-2">
                <h4 className="text-xl font-bold tracking-tight text-[#173a40]">
                  {detailProduct.title}
                </h4>
                <p className="font-mono text-xs text-gray-400">
                  ID: {detailProduct.id}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-50 bg-white p-6">
                <div
                  className="prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: detailProduct.content || '<p>-</p>',
                  }}
                />
              </div>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  )
}
