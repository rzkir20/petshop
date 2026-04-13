import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Pencil, Plus, RefreshCw, Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '#/components/ui/button'
import { Empaty } from '#/components/ui/empaty'
import { Pagination } from '#/components/ui/pagination'
import { InventoryTableSkeleton } from '#/hooks/SkelatonUi'
import {
  useProductsCrudMutations,
  useProductsInventoryFiltersState,
  useProductsInventoryState,
} from '#/services/products.service'

export const Route = createFileRoute('/dashboard/inventory/')({
  component: InventoryPage,
})

const PAGE_SIZE = 10

function InventoryPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const filters = useProductsInventoryFiltersState()
  const { remove } = useProductsCrudMutations()
  const {
    products,
    total: totalItems,
    loading,
    error,
    refresh,
  } = useProductsInventoryState({
    category: filters.activeCategory,
    q: filters.searchQuery,
    page,
    limit: PAGE_SIZE,
  })

  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [filters.activeCategory, filters.searchQuery])

  useEffect(() => {
    if (totalPages === 0) return
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  return (
    <div className="p-8">
      <div className="min-w-0 space-y-8">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Inventory Management
            </h1>
            <p className="mt-1 text-gray-500">
              Monitor product catalog from compact products endpoint.
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
                    {[
                      'Product Title',
                      'Category',
                      'Price',
                      'Best Seller',
                      'Created At',
                      'Updated At',
                      'Action',
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50/50">
                  {products.map((p) => (
                    <tr key={`${p.id}-${p.slug}`} className="hover:bg-gray-50/80">
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-xl bg-emerald-50 p-1">
                            <img
                              src={
                                p.thumbnail.startsWith('http')
                                  ? p.thumbnail
                                  : `https://api.dicebear.com/7.x/shapes/svg?seed=${p.slug}`
                              }
                              alt=""
                              className="h-full w-full"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                              {p.title}
                            </p>
                            <p className="truncate text-xs text-gray-400">
                              /{p.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm font-medium text-gray-500">
                        {p.category || '-'}
                      </td>
                      <td className="px-4 py-5 text-sm font-bold text-[#173a40]">
                        Rp {p.price.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${
                            p.isBestSeller
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {p.isBestSeller ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-xs text-gray-500">
                        {p.createdAt}
                      </td>
                      <td className="px-4 py-5 text-xs text-gray-500">
                        {p.updated}
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              void navigate({
                                to: '/dashboard/inventory/$id',
                                params: { id: p.id },
                              })
                            }
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-100 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>
                          <button
                            type="button"
                            disabled={remove.isPending}
                            onClick={() => {
                              const ok = window.confirm(
                                `Hapus produk "${p.title}"?`,
                              )
                              if (!ok) return
                              remove.mutate(p.id)
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 size={13} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
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
    </div>
  )
}
