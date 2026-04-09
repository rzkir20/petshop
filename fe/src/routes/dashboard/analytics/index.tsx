import { createFileRoute } from '@tanstack/react-router'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  Download,
  FileText,
  Filter,
  HandHeart,
  Settings2,
  ShoppingBag,
} from 'lucide-react'

export const Route = createFileRoute('/dashboard/analytics/')({
  component: AnalyticsPage,
})

const kpis = [
  {
    title: 'Total Revenue',
    value: 'Rp 542.480.000',
    delta: '14.2%',
    up: true,
    icon: FileText,
    iconClass: 'bg-emerald-100 text-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-500',
  },
  {
    title: 'Avg Order Value',
    value: 'Rp 1.412.000',
    delta: '5.1%',
    up: true,
    icon: ShoppingBag,
    iconClass: 'bg-orange-100 text-[#ff6b35]',
    badgeClass: 'bg-orange-50 text-[#ff6b35]',
  },
  {
    title: 'Conversion Rate',
    value: '3.42%',
    delta: '2.8%',
    up: true,
    icon: Activity,
    iconClass: 'bg-emerald-50 text-[#173a40]',
    badgeClass: 'bg-emerald-50 text-emerald-500',
  },
  {
    title: 'Customer LTV',
    value: 'Rp 2.850.000',
    delta: '0.4%',
    up: false,
    icon: HandHeart,
    iconClass: 'bg-emerald-100 text-emerald-500',
    badgeClass: 'bg-red-50 text-red-500',
  },
]

const categories = [
  { name: 'Pet Food', value: 45, color: 'bg-emerald-500' },
  { name: 'Accessories', value: 25, color: 'bg-[#ff6b35]' },
  { name: 'Grooming', value: 15, color: 'bg-blue-500' },
  { name: 'Medical Care', value: 15, color: 'bg-yellow-500' },
]

const topProducts = [
  { name: 'Premium Salmon Dry Food', revenue: 'Rp 128.5M', width: '92%' },
  { name: 'Orthopedic Dog Bed XL', revenue: 'Rp 84.2M', width: '75%' },
  { name: 'Automatic Cat Water Fountain', revenue: 'Rp 62.1M', width: '58%' },
  { name: 'Natural Hemp Bird Toy', revenue: 'Rp 45.8M', width: '42%' },
]

const monthlyRows = [
  {
    month: 'October 2023',
    orders: '1,240',
    customers: '+420',
    revenue: 'Rp 45.28M',
    margin: '24.5%',
  },
  {
    month: 'September 2023',
    orders: '1,180',
    customers: '+385',
    revenue: 'Rp 42.10M',
    margin: '22.8%',
  },
  {
    month: 'August 2023',
    orders: '950',
    customers: '+120',
    revenue: 'Rp 34.50M',
    margin: '18.2%',
  },
  {
    month: 'July 2023',
    orders: '1,050',
    customers: '+210',
    revenue: 'Rp 38.90M',
    margin: '20.5%',
  },
]

function AnalyticsPage() {
  return (
    <div className="space-y-8 p-8">
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Analytics Reports
          </h1>
          <p className="mt-1 text-gray-500">
            Comprehensive performance insights for the last 12 months.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2 text-sm font-medium text-emerald-500"
          >
            <Calendar size={16} />
            Nov 2022 - Oct 2023
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2.5 text-sm font-medium transition-all hover:bg-emerald-50"
          >
            <FileText size={16} className="text-emerald-500" />
            <span>Export PDF</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-600"
          >
            <Download size={16} />
            <span>Export Excel</span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon
          const TrendIcon = item.up ? ArrowUpRight : ArrowDownRight
          return (
            <article
              key={item.title}
              className="rounded-[32px] border border-emerald-50 bg-white p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconClass}`}
                >
                  <Icon size={24} />
                </div>
                <div
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${item.badgeClass}`}
                >
                  <TrendIcon size={14} />
                  <span>{item.delta}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-400">{item.title}</p>
              <h3 className="mt-1 text-2xl font-bold">{item.value}</h3>
            </article>
          )
        })}
      </section>

      <section className="rounded-[40px] border border-emerald-50 bg-white p-8 shadow-sm">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-bold">
              Monthly Sales Performance
            </h3>
            <p className="text-sm text-gray-400">
              Revenue growth breakdown across the fiscal year
            </p>
          </div>
          <select className="cursor-pointer rounded-full bg-emerald-50 px-6 py-2.5 text-xs font-bold focus:outline-none">
            <option>All Categories</option>
            <option>Pet Food</option>
            <option>Accessories</option>
            <option>Grooming</option>
            <option>Aquatic</option>
          </select>
        </div>

        <div className="relative h-[400px] w-full">
          <svg
            className="h-full w-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="100"
              x2="1200"
              y2="100"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="200"
              x2="1200"
              y2="200"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="300"
              x2="1200"
              y2="300"
              stroke="#f3f4f6"
              strokeWidth="1"
            />

            <path
              d="M0,350 Q100,280 200,310 T400,220 T600,250 T800,120 T1000,160 T1200,80"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M0,350 Q100,280 200,310 T400,220 T600,250 T800,120 T1000,160 T1200,80 V400 H0 Z"
              fill="url(#chartGradient)"
            />

            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>

            <circle cx="200" cy="310" r="6" fill="#10b981" />
            <circle cx="400" cy="220" r="6" fill="#10b981" />
            <circle cx="800" cy="120" r="6" fill="#ff6b35" />
            <circle cx="1200" cy="80" r="6" fill="#10b981" />
          </svg>

          <div className="mt-6 flex justify-between px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {[
              'Nov',
              'Dec',
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
            ].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <article className="rounded-[40px] border border-emerald-50 bg-white p-8">
          <h3 className="font-display mb-8 text-xl font-bold">
            Revenue by Category
          </h3>
          <div className="flex flex-col items-start gap-10 xl:flex-row xl:items-center">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-[conic-gradient(#10b981_0%_45%,#ff6b35_45%_70%,#3b82f6_70%_85%,#f59e0b_85%_100%)]">
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-[10px] text-gray-400 uppercase">
                  Share
                </span>
              </div>
            </div>
            <div className="w-full flex-1 space-y-4">
              {categories.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[40px] border border-emerald-50 bg-white p-8">
          <h3 className="font-display mb-8 text-xl font-bold">
            Top Performing Products
          </h3>
          <div className="space-y-6">
            {topProducts.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="font-bold">{item.revenue}</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-emerald-50">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="overflow-hidden rounded-[40px] border border-emerald-50 bg-white pb-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-50 p-8">
          <h3 className="font-display text-xl font-bold">
            Detailed Performance Log
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg bg-emerald-50 p-2 text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white"
            >
              <Filter size={16} />
            </button>
            <button
              type="button"
              className="rounded-lg bg-emerald-50 p-2 text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white"
            >
              <Settings2 size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                {[
                  'Month',
                  'Total Orders',
                  'New Customers',
                  'Revenue',
                  'Profit Margin',
                ].map((heading) => (
                  <th
                    key={heading}
                    className={`px-8 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase ${
                      heading === 'Profit Margin' ? 'text-right' : ''
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {monthlyRows.map((row) => {
                const goodGrowth = row.customers !== '+120'
                const strongMargin = row.margin !== '18.2%'
                return (
                  <tr
                    key={row.month}
                    className="transition-all hover:bg-emerald-50/20"
                  >
                    <td className="px-8 py-5 text-sm font-bold">{row.month}</td>
                    <td className="px-8 py-5 text-sm">{row.orders}</td>
                    <td className="px-8 py-5 text-sm">
                      <span
                        className={`rounded-lg px-2 py-1 text-xs ${
                          goodGrowth
                            ? 'bg-emerald-100 text-emerald-500'
                            : 'bg-orange-100 text-[#ff6b35]'
                        }`}
                      >
                        {row.customers}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold">
                      {row.revenue}
                    </td>
                    <td
                      className={`px-8 py-5 text-right text-sm font-bold ${
                        strongMargin ? 'text-emerald-500' : 'text-gray-400'
                      }`}
                    >
                      {row.margin}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
