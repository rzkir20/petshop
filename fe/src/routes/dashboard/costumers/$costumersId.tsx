import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle,
  ChevronRight,
  Circle,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UserCog,
  Wallet,
} from 'lucide-react'

import { getCustomerBySlug } from './-data'

export const Route = createFileRoute('/dashboard/costumers/$costumersId')({
  component: CustomerDetailPage,
})

function orderStatusClass(status: 'completed' | 'returned' | 'processing') {
  switch (status) {
    case 'completed':
      return 'bg-emerald-100 text-emerald-500'
    case 'returned':
      return 'bg-red-100 text-red-500'
    default:
      return 'bg-orange-100 text-[#ff6b35]'
  }
}

function orderStatusLabel(status: 'completed' | 'returned' | 'processing') {
  switch (status) {
    case 'completed':
      return 'Completed'
    case 'returned':
      return 'Returned'
    default:
      return 'Processing'
  }
}

function CustomerDetailPage() {
  const { costumersId } = Route.useParams()
  const customer = getCustomerBySlug(costumersId)

  if (!customer) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Customer not found.</p>
        <Link to="/dashboard/costumers" className="mt-4 inline-block text-sm font-bold text-emerald-600 hover:underline">
          Back to customers
        </Link>
      </div>
    )
  }

  const tierLabel = customer.memberTier.replace(' Member', '')

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/dashboard" className="transition-colors hover:text-emerald-500">
              Dashboard
            </Link>
            <ChevronRight size={14} className="text-xs" />
            <Link to="/dashboard/costumers" className="transition-colors hover:text-emerald-500">
              Customers
            </Link>
            <ChevronRight size={14} className="text-xs" />
            <span className="font-medium text-emerald-500">Customer Details</span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">{customer.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2.5 text-sm font-medium transition-all hover:bg-emerald-50"
          >
            <Mail size={18} className="text-emerald-500" />
            <span>Send Message</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-600"
          >
            <UserCog size={18} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[40px] border border-emerald-50 bg-white shadow-sm">
        <div className="flex flex-col items-center gap-8 p-8 md:flex-row">
          <div className="relative shrink-0">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.avatarSeed}`}
              alt={customer.name}
              className="h-32 w-32 rounded-[32px] border-4 border-emerald-50 bg-emerald-50 object-cover"
            />
            <div className="absolute -right-2 -bottom-2 rounded-xl border-2 border-white bg-[#ff6b35] p-2 text-white shadow-lg">
              <ShieldCheck size={22} />
            </div>
          </div>
          <div className="min-w-0 flex-1 text-center md:text-left">
            <div className="mb-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${customer.memberTierClass}`}
              >
                {customer.memberTier}
              </span>
              {customer.isActive ? (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-500 uppercase">
                  Active
                </span>
              ) : null}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center justify-center gap-3 text-gray-500 md:justify-start">
                <Mail size={18} className="shrink-0 text-emerald-500" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-500 md:justify-start">
                <Phone size={18} className="shrink-0 text-emerald-500" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-500 md:justify-start">
                <MapPin size={18} className="shrink-0 text-emerald-500" />
                <span className="text-sm">{customer.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center gap-5 rounded-[32px] border border-emerald-50 bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-500">
            <ShoppingCart size={26} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Orders</p>
            <h3 className="mt-1 text-2xl font-bold">{customer.totalOrders}</h3>
          </div>
        </div>
        <div className="flex items-center gap-5 rounded-[32px] border border-emerald-50 bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-[#ff6b35]">
            <Wallet size={26} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Total Spending</p>
            <h3 className="mt-1 text-2xl font-bold">{customer.totalSpending}</h3>
          </div>
        </div>
        <div className="flex items-center gap-5 rounded-[32px] border border-emerald-50 bg-white p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#173a40]">
            <CalendarCheck size={26} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Member Since</p>
            <h3 className="mt-1 text-2xl font-bold">{customer.memberSince}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-[40px] border border-emerald-50 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-50 p-8">
            <h3 className="font-display text-xl font-bold">Purchase History</h3>
            <button
              type="button"
              className="flex items-center gap-2 text-xs font-bold text-emerald-500"
            >
              <span>View Detailed Report</span>
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  {['Order ID', 'Items', 'Date', 'Status', 'Amount'].map((h) => (
                    <th
                      key={h}
                      className={`px-8 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase ${
                        h === 'Amount' ? 'text-right' : ''
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customer.orders.map((o) => (
                  <tr key={o.id} className="cursor-pointer transition-all hover:bg-emerald-50/20">
                    <td className="px-8 py-4 text-sm font-bold">{o.id}</td>
                    <td className="px-8 py-4 text-sm">{o.items}</td>
                    <td className="px-8 py-4 text-sm text-gray-500">{o.date}</td>
                    <td className="px-8 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold ${orderStatusClass(o.status)}`}
                      >
                        {orderStatusLabel(o.status)}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right text-sm font-bold">{o.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="rounded-[40px] bg-linear-to-br from-[#173a40] to-[#0d2327] p-8 text-white"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">{tierLabel} Perks</h3>
              <Sparkles size={24} className="text-[#ff6b35]" />
            </div>
            <ul className="space-y-4">
              {customer.perks.map((p) => (
                <li
                  key={p.text}
                  className={`flex items-center gap-3 text-sm ${p.locked ? 'opacity-50' : ''}`}
                >
                  {p.locked ? (
                    <Circle size={18} className="shrink-0 text-emerald-400/60" />
                  ) : (
                    <CheckCircle size={18} className="shrink-0 text-emerald-400" />
                  )}
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-8 w-full rounded-full bg-emerald-500 py-3 text-xs font-bold text-white transition-all hover:bg-emerald-600"
            >
              Manage Membership
            </button>
          </div>

          <div className="rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">Monthly Spending</h3>
            <div className="flex h-40 items-end justify-between gap-2">
              {customer.monthlySpending.map((bar) => (
                <div
                  key={bar.label}
                  title={bar.title}
                  className={`w-4 cursor-help rounded-full transition-colors hover:bg-emerald-500 ${
                    bar.highlight ? 'bg-[#ff6b35]' : 'bg-emerald-100'
                  }`}
                  style={{ height: `${bar.heightPct}%` }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-bold text-gray-400">
              {customer.monthlySpending.map((bar) => (
                <span key={bar.label}>{bar.label}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-bold">Customer Tags</h3>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-600"
                >
                  {tag}
                </span>
              ))}
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-600">
                + Add Tag
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
