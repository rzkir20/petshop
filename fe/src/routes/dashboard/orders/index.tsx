import { createFileRoute } from '@tanstack/react-router'
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  Mail,
  MoreVertical,
  Package,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/dashboard/orders/')({
  component: OrdersPage,
})

type OrderStatus = 'completed' | 'processing' | 'pending' | 'shipped' | 'cancelled'

type PaymentState = 'paid' | 'pending' | 'refunded'

type OrderRow = {
  id: string
  customer: string
  avatarSeed: string
  avatarBg: string
  primaryItem: string
  extraItems?: string
  date: string
  amount: string
  payment: PaymentState
  status: OrderStatus
}

const ordersData: OrderRow[] = [
  {
    id: '#PS-8492',
    customer: 'Sarah Jenkins',
    avatarSeed: 'Sarah',
    avatarBg: 'bg-emerald-50',
    primaryItem: 'Puppy Feast Mix',
    extraItems: '+2 other items',
    date: 'Oct 26, 2023',
    amount: 'Rp 245.000',
    payment: 'paid',
    status: 'completed',
  },
  {
    id: '#PS-8491',
    customer: 'Budi Santoso',
    avatarSeed: 'Budi',
    avatarBg: 'bg-orange-50',
    primaryItem: 'Cat Tower XL',
    date: 'Oct 26, 2023',
    amount: 'Rp 1.120.000',
    payment: 'paid',
    status: 'processing',
  },
  {
    id: '#PS-8490',
    customer: 'Kevin Lie',
    avatarSeed: 'Kevin',
    avatarBg: 'bg-emerald-50',
    primaryItem: 'Aqua Clean 500ml',
    date: 'Oct 25, 2023',
    amount: 'Rp 85.000',
    payment: 'pending',
    status: 'pending',
  },
  {
    id: '#PS-8489',
    customer: 'Ani Wijaya',
    avatarSeed: 'Ani',
    avatarBg: 'bg-emerald-50',
    primaryItem: 'Bird Cage XL',
    date: 'Oct 24, 2023',
    amount: 'Rp 450.000',
    payment: 'paid',
    status: 'shipped',
  },
  {
    id: '#PS-8488',
    customer: 'Dodi Kusuma',
    avatarSeed: 'Dodi',
    avatarBg: 'bg-red-50',
    primaryItem: 'Fish Food Premium',
    date: 'Oct 24, 2023',
    amount: 'Rp 35.000',
    payment: 'refunded',
    status: 'cancelled',
  },
]

const tabs: { id: string; label: string; match: OrderStatus | 'all' | 'delivered' }[] = [
  { id: 'all', label: 'All Orders', match: 'all' },
  { id: 'pending', label: 'Pending', match: 'pending' },
  { id: 'processing', label: 'Processing', match: 'processing' },
  { id: 'shipped', label: 'Shipped', match: 'shipped' },
  { id: 'delivered', label: 'Delivered', match: 'delivered' },
  { id: 'cancelled', label: 'Cancelled', match: 'cancelled' },
]

function statusBadgeClass(status: OrderStatus) {
  switch (status) {
    case 'completed':
      return 'bg-emerald-100 text-emerald-600'
    case 'processing':
      return 'bg-orange-100 text-[#ff6b35]'
    case 'pending':
      return 'bg-yellow-100 text-yellow-600'
    case 'shipped':
      return 'bg-blue-100 text-blue-600'
    case 'cancelled':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

function statusLabel(status: OrderStatus) {
  switch (status) {
    case 'completed':
      return 'Completed'
    case 'processing':
      return 'Processing'
    case 'pending':
      return 'Pending'
    case 'shipped':
      return 'Shipped'
    case 'cancelled':
      return 'Cancelled'
    default:
      return status
  }
}

function PaymentCell({ payment }: { payment: PaymentState }) {
  if (payment === 'paid') {
    return (
      <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
        <CheckCircle size={12} />
        Paid
      </span>
    )
  }
  if (payment === 'pending') {
    return (
      <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
        <Clock size={12} />
        Pending
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-400">
      <XCircle size={12} />
      Refunded
    </span>
  )
}

function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filteredOrders = useMemo(() => {
    const tab = tabs.find((t) => t.id === activeTab)
    if (!tab || tab.match === 'all') return ordersData
    if (tab.match === 'delivered') {
      return ordersData.filter((o) => o.status === 'completed')
    }
    return ordersData.filter((o) => o.status === tab.match)
  }, [activeTab])

  const visibleIds = filteredOrders.map((o) => o.id)
  const selectedCount = selected.size
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selected.has(id))

  function toggleRow(id: string) {
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
      if (allVisibleSelected) {
        visibleIds.forEach((id) => next.delete(id))
      } else {
        visibleIds.forEach((id) => next.add(id))
      }
      return next
    })
  }

  function clearSelection() {
    setSelected(new Set())
  }

  return (
    <div className="relative space-y-8 p-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#173a40]">
            Orders Management
          </h1>
          <p className="mt-1 text-gray-500">
            Track, manage, and process all incoming pet supply orders.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2.5 text-sm font-medium transition-all hover:bg-emerald-50"
          >
            <Download size={18} className="text-emerald-500" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-600"
          >
            <Plus size={18} />
            <span>New Order</span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6">
        <div className="space-y-6 rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-1 overflow-x-auto rounded-full bg-emerald-50 p-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap rounded-full px-6 py-2 text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-500 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Order ID or Customer..."
                  className="w-64 rounded-full border border-emerald-100 bg-emerald-50/30 py-2.5 pr-4 pl-12 text-sm transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="rounded-full bg-emerald-50 p-2.5 text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[40px] border border-emerald-50 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="py-5 pr-4 pl-8">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected && visibleIds.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                  />
                </th>
                {['Order ID', 'Customer', 'Items', 'Date', 'Amount', 'Payment', 'Status', 'Actions'].map(
                  (heading) => (
                    <th
                      key={heading}
                      className={`px-4 py-5 text-[10px] font-bold tracking-widest text-gray-400 uppercase ${
                        heading === 'Status' ? 'text-center' : ''
                      } ${heading === 'Actions' ? 'pr-8 text-right' : ''}`}
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((row) => (
                <tr
                  key={row.id}
                  className="group cursor-pointer transition-all hover:bg-emerald-50/20"
                >
                  <td className="py-5 pr-4 pl-8">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-4 py-5 text-sm font-bold text-[#173a40]">{row.id}</td>
                  <td className="px-4 py-5 text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.avatarSeed}`}
                        alt=""
                        className={`h-8 w-8 rounded-full ${row.avatarBg}`}
                      />
                      <span>{row.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-500">
                    {row.extraItems ? (
                      <div className="flex flex-col">
                        <span className="font-medium">{row.primaryItem}</span>
                        <span className="text-[10px]">{row.extraItems}</span>
                      </div>
                    ) : (
                      <span className="font-medium">{row.primaryItem}</span>
                    )}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-500">{row.date}</td>
                  <td className="px-4 py-5 text-sm font-bold">{row.amount}</td>
                  <td className="px-4 py-5">
                    <PaymentCell payment={row.payment} />
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold ${statusBadgeClass(row.status)}`}
                    >
                      {statusLabel(row.status)}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-[#ff6b35] transition-all hover:bg-[#ff6b35] hover:text-white"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-50 bg-gray-50/20 p-8">
          <div className="text-sm font-medium text-gray-500">
            Showing <span className="font-bold text-[#173a40]">1-10</span> of{' '}
            <span className="font-bold text-[#173a40]">152</span> orders
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-gray-400 transition-all hover:bg-emerald-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white shadow-sm"
            >
              1
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-sm font-bold text-gray-600 transition-all hover:bg-emerald-50"
            >
              2
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-sm font-bold text-gray-600 transition-all hover:bg-emerald-50"
            >
              3
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-gray-400 transition-all hover:bg-emerald-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <div
        className={`fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-8 rounded-full bg-[#173a40] px-8 py-4 text-white shadow-2xl transition-all duration-500 ${
          selectedCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold">
            {selectedCount}
          </span>
          <span className="text-sm font-medium">Orders Selected</span>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-bold transition-all hover:text-emerald-400"
          >
            <Package size={16} />
            Mark as Shipped
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-bold transition-all hover:text-emerald-400"
          >
            <Mail size={16} />
            Notify Customers
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-bold text-red-300 transition-all hover:text-red-400"
          >
            <Trash2 size={16} />
            Cancel Orders
          </button>
        </div>
        <button
          type="button"
          onClick={clearSelection}
          className="text-white/40 transition-colors hover:text-white"
          aria-label="Close bulk actions"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}
