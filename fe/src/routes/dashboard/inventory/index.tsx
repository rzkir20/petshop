import { createFileRoute } from '@tanstack/react-router'
import {
  AlertTriangle,
  Archive,
  Box,
  ChevronDown,
  ChevronRight,
  Edit2,
  FileDown,
  FileUp,
  History,
  MoreVertical,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Settings2,
  ShoppingCart,
  Trash2,
  TrendingDown,
  X,
  XCircle,
} from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'

export const Route = createFileRoute('/dashboard/inventory/')({
  component: InventoryPage,
})

type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

type SubVariant = {
  name: string
  sku: string
  info: string
  stock: string
  stockTone?: 'default' | 'orange' | 'red'
  variantStatus: StockStatus
}

type ExpansionKind = 'variants' | 'sizes' | 'formula' | 'empty'

type ProductRow = {
  id: string
  name: string
  sku: string
  imageSeed: string
  stockCurrent: number
  stockMax: number
  reorder: string
  status: StockStatus
  updated: string
  category: 'food' | 'toys' | 'accessories' | 'grooming'
  expansionTitle: string
  expansionFilterLabel: string
  expansionFilterOptions: string[]
  expansionKind: ExpansionKind
  subRows: SubVariant[]
  detailTitle: string
  detailBadge: string
}

const products: ProductRow[] = [
  {
    id: 'p1',
    name: 'Premium Salmon Mix 5kg',
    sku: 'PS-FD-001',
    imageSeed: 'food',
    stockCurrent: 12,
    stockMax: 200,
    reorder: '25 units',
    status: 'low-stock',
    updated: '2 hours ago',
    category: 'food',
    expansionTitle: 'Product Variants',
    expansionFilterLabel: 'FILTER:',
    expansionFilterOptions: ['All Sizes', 'Small Pack', 'Large Pack'],
    expansionKind: 'variants',
    subRows: [
      {
        name: 'Premium Salmon Mix 1kg',
        sku: 'PS-FD-001-A',
        info: 'Small pack',
        stock: '45',
        variantStatus: 'in-stock',
      },
      {
        name: 'Premium Salmon Mix 2.5kg',
        sku: 'PS-FD-001-B',
        info: 'Medium pack',
        stock: '8',
        stockTone: 'orange',
        variantStatus: 'low-stock',
      },
      {
        name: 'Premium Salmon Mix 10kg',
        sku: 'PS-FD-001-C',
        info: 'Value pack',
        stock: '12',
        variantStatus: 'in-stock',
      },
    ],
    detailTitle: 'Premium Salmon Mix 1kg',
    detailBadge: 'Food',
  },
  {
    id: 'p2',
    name: 'Rubber Bone Chew Toy',
    sku: 'PS-TY-042',
    imageSeed: 'toy',
    stockCurrent: 84,
    stockMax: 150,
    reorder: '20 units',
    status: 'in-stock',
    updated: 'Yesterday',
    category: 'toys',
    expansionTitle: 'Sizes Available',
    expansionFilterLabel: 'TYPE:',
    expansionFilterOptions: ['All Types', 'Tough Rubber', 'Soft Squeaky'],
    expansionKind: 'sizes',
    subRows: [
      {
        name: 'Rubber Bone Chew - Small',
        sku: 'PS-TY-042-S',
        info: 'Puppies & Small Breeds',
        stock: '24',
        variantStatus: 'in-stock',
      },
      {
        name: 'Rubber Bone Chew - Medium',
        sku: 'PS-TY-042-M',
        info: 'Standard Pack',
        stock: '0',
        stockTone: 'red',
        variantStatus: 'out-of-stock',
      },
    ],
    detailTitle: 'Rubber Bone - Small',
    detailBadge: 'Toys',
  },
  {
    id: 'p3',
    name: 'Organic Pet Shampoo 500ml',
    sku: 'PS-GR-102',
    imageSeed: 'groom',
    stockCurrent: 0,
    stockMax: 50,
    reorder: '10 units',
    status: 'out-of-stock',
    updated: '5 days ago',
    category: 'grooming',
    expansionTitle: 'Formula Types',
    expansionFilterLabel: '',
    expansionFilterOptions: [],
    expansionKind: 'formula',
    subRows: [
      {
        name: 'Organic Shampoo - Normal Hair',
        sku: 'PS-GR-102-N',
        info: 'Frequent washing',
        stock: '0',
        stockTone: 'red',
        variantStatus: 'out-of-stock',
      },
    ],
    detailTitle: 'Item Variant',
    detailBadge: 'General',
  },
  {
    id: 'p4',
    name: 'Sisal Cat Scratcher XL',
    sku: 'PS-AC-215',
    imageSeed: 'cat',
    stockCurrent: 128,
    stockMax: 150,
    reorder: '15 units',
    status: 'in-stock',
    updated: 'Oct 20, 2023',
    category: 'accessories',
    expansionTitle: 'Variants',
    expansionFilterLabel: '',
    expansionFilterOptions: [],
    expansionKind: 'empty',
    subRows: [],
    detailTitle: 'Item Variant',
    detailBadge: 'General',
  },
]

const categoryTabs: { id: string; label: string; match: ProductRow['category'] | 'all' }[] = [
  { id: 'all', label: 'All Categories', match: 'all' },
  { id: 'food', label: 'Food', match: 'food' },
  { id: 'toys', label: 'Toys', match: 'toys' },
  { id: 'accessories', label: 'Accessories', match: 'accessories' },
  { id: 'grooming', label: 'Grooming', match: 'grooming' },
]

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
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [detailProduct, setDetailProduct] = useState<ProductRow | null>(null)
  const [detailTab, setDetailTab] = useState<'post' | 'category'>('post')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filteredProducts = useMemo(() => {
    const tab = categoryTabs.find((t) => t.id === activeCategory)
    if (!tab || tab.match === 'all') return products
    return products.filter((p) => p.category === tab.match)
  }, [activeCategory])

  const visibleIds = filteredProducts.map((p) => p.id)
  const selectedCount = selected.size
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selected.has(id))

  function toggleExpand(id: string) {
    if (expandedId === id) {
      setExpandedId(null)
      setDetailsOpen(false)
      setDetailProduct(null)
    } else {
      setExpandedId(id)
      const p = products.find((x) => x.id === id) ?? null
      setDetailProduct(p)
      setDetailsOpen(true)
    }
  }

  function closeDetails() {
    setDetailsOpen(false)
    setDetailProduct(null)
    setExpandedId(null)
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allVisibleSelected) visibleIds.forEach((id) => next.delete(id))
      else visibleIds.forEach((id) => next.add(id))
      return next
    })
  }

  function deselectAll() {
    setSelected(new Set())
  }

  function stockDisplay(p: ProductRow) {
    const cur = p.stockCurrent
    const tone =
      cur === 0 ? 'text-red-500' : cur <= 25 ? 'text-[#ff6b35]' : 'text-[#173a40]'
    return (
      <span className="text-sm font-bold">
        <span className={tone}>{cur}</span> / {p.stockMax}
      </span>
    )
  }

  function subStockClass(tone?: SubVariant['stockTone']) {
    if (tone === 'red') return 'text-red-500'
    if (tone === 'orange') return 'text-[#ff6b35]'
    return 'text-[#173a40]'
  }

  return (
    <div className="flex flex-col gap-8 p-8 xl:flex-row">
      <div className="min-w-0 flex-1 space-y-8">
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="mt-1 text-gray-500">Monitor and optimize your product stock levels.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2.5 text-sm font-medium transition-all hover:bg-emerald-50"
            >
              <FileUp size={18} className="text-emerald-500" />
              <span>Import</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2.5 text-sm font-medium transition-all hover:bg-emerald-50"
            >
              <FileDown size={18} className="text-emerald-500" />
              <span>Export</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-600"
            >
              <Plus size={18} />
              <span>Add New Product</span>
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-[24px] border border-orange-100 bg-orange-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#ff6b35] shadow-[0_4px_14px_0_rgba(16,185,129,0.15)]">
              <AlertTriangle size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold">Urgent: 5 items out of stock</h4>
              <p className="text-xs text-orange-600">Immediate restock required for high-demand items.</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full bg-[#ff6b35] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-orange-600"
            >
              Restock All
            </button>
          </div>
          <div className="flex items-center gap-4 rounded-[24px] border border-emerald-100 bg-emerald-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-500 shadow-[0_4px_14px_0_rgba(16,185,129,0.15)]">
              <RefreshCw size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold">Weekly stock check complete</h4>
              <p className="text-xs text-emerald-600">Last verified on Oct 26, 2023 at 09:15 AM.</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-emerald-600"
            >
              Re-Verify
            </button>
          </div>
        </section>

        <section className="space-y-6 rounded-[32px] border border-emerald-50 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                    activeCategory === tab.id
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
                placeholder="Search by product name or SKU..."
                className="w-full rounded-full border-none bg-emerald-50 py-2.5 pr-4 pl-12 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:outline-none md:w-72"
              />
            </div>
          </div>

          {selectedCount > 0 ? (
            <div className="flex items-center justify-between rounded-2xl bg-[#173a40] px-4 py-3 text-white">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-xs font-medium">{selectedCount} items selected</span>
                <div className="hidden h-4 w-px bg-white/20 sm:block" />
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-bold transition-all hover:bg-white/20"
                  >
                    <ShoppingCart size={12} />
                    Mark for Reorder
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-bold transition-all hover:bg-white/20"
                  >
                    <Archive size={12} />
                    Archive Selected
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg bg-red-500/20 px-3 py-1.5 text-[11px] font-bold text-red-400 transition-all hover:bg-red-500/30"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={deselectAll}
                className="text-[11px] font-bold underline opacity-70 hover:opacity-100"
              >
                Deselect All
              </button>
            </div>
          ) : null}

          <div className="overflow-x-auto">
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
                  {['Product Name', 'SKU', 'Stock Level', 'Reorder Point', 'Status', 'Last Updated', 'Actions'].map(
                    (h) => (
                      <th
                        key={h}
                        className={`px-4 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase ${
                          h === 'Actions' ? 'text-right' : ''
                        }`}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50/50">
                {filteredProducts.map((p) => (
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
                              src={`https://api.dicebear.com/7.x/shapes/svg?seed=${p.imageSeed}`}
                              alt=""
                              className="h-full w-full"
                            />
                          </div>
                          <span className="text-sm font-bold">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5 font-mono text-xs text-gray-500">{p.sku}</td>
                      <td className="px-4 py-5">{stockDisplay(p)}</td>
                      <td className="px-4 py-5 text-sm font-medium text-gray-400">{p.reorder}</td>
                      <td className="px-4 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${statusPillClass(p.status)}`}
                        >
                          {statusLabel(p.status)}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-xs text-gray-400">{p.updated}</td>
                      <td className="px-4 py-5 text-right">
                        <button
                          type="button"
                          className="p-1 text-gray-400 hover:text-emerald-500"
                          aria-label="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          type="button"
                          className="ml-2 p-1 text-gray-400 hover:text-[#ff6b35]"
                          aria-label="More"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                    {expandedId === p.id ? (
                      <tr className="bg-emerald-50/20">
                        <td colSpan={9} className="border-b border-emerald-50 p-0">
                          <div className="px-8 pt-4 pb-8">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                              <h5 className="text-xs font-bold tracking-widest text-[#173a40] uppercase">
                                {p.expansionTitle}
                              </h5>
                              {p.expansionFilterOptions.length > 0 ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold text-gray-400">
                                    {p.expansionFilterLabel}
                                  </span>
                                  <select className="rounded-full border border-emerald-100 bg-white px-3 py-1 text-[10px] font-bold focus:outline-none">
                                    {p.expansionFilterOptions.map((o) => (
                                      <option key={o}>{o}</option>
                                    ))}
                                  </select>
                                </div>
                              ) : null}
                            </div>
                            {p.expansionKind === 'empty' ? (
                              <div className="rounded-2xl border border-emerald-50 bg-white p-8">
                                <p className="text-center text-xs font-medium text-gray-400 italic">
                                  No standard variants defined for this item.
                                </p>
                              </div>
                            ) : (
                              <div className="overflow-hidden rounded-2xl border border-emerald-50 bg-white">
                                <table className="w-full">
                                  <thead className="bg-emerald-50/30">
                                    <tr>
                                      {['Product Name', 'SKU', 'Variant Info', 'Stock', 'Status'].map((c) => (
                                        <th
                                          key={c}
                                          className={`px-6 py-3 text-[9px] font-bold text-gray-400 uppercase ${
                                            c === 'Status' ? 'text-right' : ''
                                          }`}
                                        >
                                          {c}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-emerald-50/50">
                                    {p.subRows.map((s) => (
                                      <tr
                                        key={s.sku}
                                        className="transition-colors hover:bg-emerald-50/40"
                                      >
                                        <td className="px-6 py-3 text-xs font-medium">{s.name}</td>
                                        <td className="px-6 py-3 font-mono text-[10px] text-gray-400">
                                          {s.sku}
                                        </td>
                                        <td className="px-6 py-3 text-xs text-gray-500">{s.info}</td>
                                        <td
                                          className={`px-6 py-3 text-xs font-bold ${subStockClass(s.stockTone)}`}
                                        >
                                          {s.stock}
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                          <span
                                            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${statusPillClass(s.variantStatus)}`}
                                          >
                                            {statusLabel(s.variantStatus)}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <aside className="w-full shrink-0 space-y-6 xl:w-80">
        <div className="rounded-[40px] bg-[#173a40] p-8 text-white shadow-sm">
          <h3 className="mb-6 text-xl font-bold">Inventory Summary</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                  Total Products
                </p>
                <h4 className="mt-1 text-3xl font-bold">1,892</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Box size={20} className="text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                  Low Stock Items
                </p>
                <h4 className="mt-1 text-3xl font-bold text-[#ff6b35]">24</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <TrendingDown size={20} className="text-[#ff6b35]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                  Out of Stock
                </p>
                <h4 className="mt-1 text-3xl font-bold text-red-400">5</h4>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <XCircle size={20} className="text-red-400" />
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-8">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-emerald-300">Warehouse Capacity</span>
              <span className="font-bold">82% Full</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[82%] bg-emerald-500" />
            </div>
          </div>
          <button
            type="button"
            className="mt-8 w-full rounded-full bg-white py-4 text-sm font-bold text-[#173a40] transition-all hover:bg-emerald-50"
          >
            Request Full Report
          </button>
        </div>

        <div className="rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold">Quick Tools</h3>
          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl bg-emerald-50 p-3 text-xs font-bold transition-all hover:bg-emerald-100"
            >
              <QrCode size={18} className="text-emerald-500" />
              Print SKU Labels
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl bg-emerald-50 p-3 text-xs font-bold transition-all hover:bg-emerald-100"
            >
              <History size={18} className="text-emerald-500" />
              View Audit Logs
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl bg-emerald-50 p-3 text-xs font-bold transition-all hover:bg-emerald-100"
            >
              <Settings2 size={18} className="text-emerald-500" />
              Reorder Settings
            </button>
          </div>
        </div>
      </aside>

      {detailsOpen && detailProduct ? (
        <aside className="w-full shrink-0 transition-all duration-300 ease-in-out xl:ml-8 xl:w-[350px] xl:max-w-[350px]">
          <div className="sticky top-8 flex w-full min-w-[300px] max-w-[350px] flex-col rounded-[40px] border border-emerald-50 bg-white shadow-sm xl:w-[350px]">
            <div className="flex items-center justify-between rounded-t-[40px] border-b border-emerald-50 bg-emerald-50/50 p-6">
              <h3 className="font-bold text-[#173a40]">Sub-Item Details</h3>
              <button
                type="button"
                onClick={closeDetails}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white"
                aria-label="Close"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="flex gap-2 p-4">
              <button
                type="button"
                onClick={() => setDetailTab('post')}
                className={`flex-1 rounded-2xl py-2.5 text-xs font-bold shadow-sm transition-all ${
                  detailTab === 'post'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-50 text-gray-500 hover:bg-emerald-100'
                }`}
              >
                Post
              </button>
              <button
                type="button"
                onClick={() => setDetailTab('category')}
                className={`flex-1 rounded-2xl py-2.5 text-xs font-bold transition-all ${
                  detailTab === 'category'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-50 text-gray-500 hover:bg-emerald-100'
                }`}
              >
                Category
              </button>
            </div>

            <div className="space-y-6 p-6">
              {detailTab === 'post' ? (
                <>
                  <div className="space-y-2">
                    <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-600 uppercase">
                      {detailProduct.detailBadge}
                    </span>
                    <h4 className="text-xl font-bold tracking-tight text-[#173a40]">
                      {detailProduct.detailTitle}
                    </h4>
                    <p className="font-mono text-xs text-gray-400">
                      SKU:{' '}
                      {detailProduct.subRows[0]?.sku ?? `${detailProduct.sku}-A`}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                      <p className="text-[9px] font-bold text-gray-400 uppercase">In Stock</p>
                      <p className="text-sm font-bold text-emerald-600">45</p>
                    </div>
                    <div className="rounded-2xl bg-orange-50 p-3 text-center">
                      <p className="text-[9px] font-bold text-gray-400 uppercase">Reserved</p>
                      <p className="text-sm font-bold text-[#ff6b35]">12</p>
                    </div>
                    <div className="rounded-2xl bg-red-50 p-3 text-center">
                      <p className="text-[9px] font-bold text-gray-400 uppercase">Damaged</p>
                      <p className="text-sm font-bold text-red-500">2</p>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl bg-emerald-50/30 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">Unit Price</span>
                      <span className="text-sm font-bold">Rp 45.000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">Bulk Price (10+)</span>
                      <span className="text-sm font-bold text-emerald-600">Rp 42.000</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-emerald-100/50 pt-3">
                      <span className="text-xs font-medium text-gray-500">Last Restock</span>
                      <span className="text-[10px] font-bold text-gray-400">Oct 24, 2023</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-orange-100/50 bg-orange-50/50 p-4">
                    <p className="mb-2 text-[10px] font-bold tracking-wider text-[#ff6b35] uppercase">
                      Recommendation
                    </p>
                    <p className="mb-4 text-xs text-gray-600">
                      Stock levels are dropping faster than average. Consider ordering 50 more units.
                    </p>
                    <button
                      type="button"
                      className="w-full rounded-xl bg-[#ff6b35] py-3 text-xs font-bold text-white transition-all hover:bg-orange-600"
                    >
                      Create Purchase Order
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-[#173a40]">Pet Food Category</h4>
                    <p className="text-xs leading-relaxed text-gray-500">
                      Premium nutrition products including dry food, wet food, and specialized diet mixes
                      for all pet types.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-emerald-50 bg-white p-4">
                      <p className="text-[9px] font-bold text-gray-400 uppercase">Variants</p>
                      <p className="text-lg font-bold">124 Items</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-50 bg-white p-4">
                      <p className="text-[9px] font-bold text-gray-400 uppercase">Total Stock</p>
                      <p className="text-lg font-bold">4,280</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Top Related Products</p>
                    <div className="space-y-2">
                      {[
                        { name: 'Puppy Feast Mix', stock: '420' },
                        { name: 'Adult Dog Kibble', stock: '152' },
                      ].map((item) => (
                        <button
                          key={item.name}
                          type="button"
                          className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-transparent p-2 transition-all hover:border-emerald-100 hover:bg-emerald-50"
                        >
                          <div className="h-8 w-8 rounded-lg bg-emerald-100" />
                          <div className="min-w-0 flex-1 text-left">
                            <p className="text-xs font-bold">{item.name}</p>
                            <p className="text-[9px] text-gray-400">In Stock: {item.stock}</p>
                          </div>
                          <ChevronRight size={16} className="shrink-0 text-gray-300" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-2xl border-2 border-dashed border-emerald-100 py-4 text-xs font-bold text-emerald-500 transition-all hover:bg-emerald-50"
                  >
                    View Category Analytics
                  </button>
                </>
              )}
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  )
}
