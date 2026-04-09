import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronRight, MapPin, Plus, Search, Users2 } from 'lucide-react'

import { customers } from './-data'

export const Route = createFileRoute('/dashboard/costumers/')({
  component: CustomersListPage,
})

function CustomersListPage() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#173a40]">Customers</h1>
          <p className="mt-1 text-gray-500">View profiles, orders, and loyalty for every shopper.</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-600"
        >
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      <div className="rounded-[32px] border border-emerald-50 bg-white p-6 shadow-sm">
        <div className="relative mb-6 max-w-md">
          <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search by name or email..."
            className="w-full rounded-full border border-emerald-100 bg-emerald-50/50 py-2.5 pr-4 pl-12 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-emerald-50 bg-gray-50/50">
              <tr>
                {['Customer', 'Email', 'Location', 'Orders', 'Tier', ''].map((h) => (
                  <th
                    key={h || 'action'}
                    className={`px-6 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase ${
                      h === '' ? 'text-right' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => (
                <tr key={c.slug} className="transition-colors hover:bg-emerald-50/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.avatarSeed}`}
                        alt=""
                        className="h-10 w-10 rounded-xl border border-emerald-100 bg-emerald-50"
                      />
                      <span className="text-sm font-bold text-[#173a40]">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.email}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin size={14} className="text-emerald-500" />
                      {c.location}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{c.totalOrders}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${c.memberTierClass}`}
                    >
                      {c.memberTier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to="/dashboard/costumers/$costumersId"
                      params={{ costumersId: c.slug }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                    >
                      View
                      <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-[24px] border border-emerald-100 bg-emerald-50/50 px-5 py-4 text-sm text-gray-600">
        <Users2 size={20} className="text-emerald-500" />
        <span>
          Showing <strong className="text-[#173a40]">{customers.length}</strong> customers. Open a row to
          see full details, purchase history, and perks.
        </span>
      </div>
    </div>
  )
}
