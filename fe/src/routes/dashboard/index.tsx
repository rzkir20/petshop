import { createFileRoute } from '@tanstack/react-router'
import {
  AlertCircle,
  Banknote,
  Calendar,
  CheckCircle,
  ChevronRight,
  PackageCheck,
  Plus,
  ShoppingCart,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
})

const kpis = [
  {
    title: 'Total Sales',
    value: 'Rp 45.280.000',
    delta: '12.5%',
    deltaTone: 'up' as const,
    icon: Banknote,
    iconClass: 'bg-emerald-100 text-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-500',
  },
  {
    title: 'New Orders',
    value: '384',
    delta: '8.2%',
    deltaTone: 'up' as const,
    icon: ShoppingCart,
    iconClass: 'bg-orange-100 text-[#ff6b35]',
    badgeClass: 'bg-orange-50 text-[#ff6b35]',
  },
  {
    title: 'Total Customers',
    value: '2,150',
    delta: '2.4%',
    deltaTone: 'down' as const,
    icon: Users,
    iconClass: 'bg-emerald-100 text-emerald-500',
    badgeClass: 'bg-red-50 text-red-500',
  },
  {
    title: 'In-Stock Items',
    value: '1,892',
    delta: 'Healthy',
    deltaTone: 'healthy' as const,
    icon: PackageCheck,
    iconClass: 'bg-emerald-50 text-[#173a40]',
    badgeClass: 'bg-emerald-50 text-emerald-500',
  },
]

const bars = [
  { day: 'Mon', value: 'Rp 12k', height: 'h-32' },
  { day: 'Tue', value: 'Rp 18k', height: 'h-48' },
  { day: 'Wed', value: 'Rp 15k', height: 'h-40' },
  { day: 'Thu', value: 'Rp 24k', height: 'h-56', active: true },
  { day: 'Fri', value: 'Rp 16k', height: 'h-44' },
  { day: 'Sat', value: 'Rp 21k', height: 'h-52' },
  { day: 'Sun', value: 'Rp 13k', height: 'h-36' },
]

function DashboardPage() {
  return (
    <div className="space-y-8 p-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="mt-1 text-gray-500">
            Welcome back! Here&apos;s what&apos;s happening with your pet shop today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-5 py-2.5 text-sm font-medium transition-all hover:bg-emerald-50"
          >
            <Calendar size={18} className="text-emerald-500" />
            <span>Oct 20, 2023 - Oct 27, 2023</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)] transition-all hover:bg-emerald-600"
          >
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon
          const TrendIcon =
            item.deltaTone === 'down'
              ? TrendingDown
              : item.deltaTone === 'healthy'
                ? CheckCircle
                : TrendingUp

          return (
            <article
              key={item.title}
              className="flex flex-col gap-4 rounded-[32px] border border-emerald-50 bg-white p-6"
            >
              <div className="flex items-center justify-between">
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
              <div>
                <p className="text-sm font-medium text-gray-400">{item.title}</p>
                <h3 className="mt-1 text-2xl font-bold">{item.value}</h3>
              </div>
            </article>
          )
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-3">
        <article className="rounded-[40px] border border-emerald-50 bg-white p-8 shadow-sm 2xl:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold">Sales Trend</h3>
            <select className="cursor-pointer rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold focus:outline-none">
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="relative flex h-64 items-end justify-between gap-4">
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between text-xs text-gray-300">
              {['50k', '40k', '30k', '20k', '10k', '0'].map((mark) => (
                <div key={mark} className={mark === '0' ? '' : 'border-b border-gray-50 pb-1'}>
                  {mark}
                </div>
              ))}
            </div>
            {bars.map((bar) => (
              <div key={bar.day} className="group flex flex-1 flex-col items-center gap-3">
                <div
                  className={`relative w-full rounded-t-xl ${bar.height} ${
                    bar.active
                      ? 'bg-[#ff6b35]'
                      : 'bg-emerald-100 transition-all group-hover:bg-emerald-500'
                  }`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#173a40] px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {bar.value}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold ${bar.active ? 'text-gray-800' : 'text-gray-400'}`}
                >
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </article>

        <aside className="rounded-[40px] border border-emerald-50 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold">Live Feed</h3>
            <button type="button" className="text-xs font-bold text-emerald-500">
              View All
            </button>
          </div>
          <div className="space-y-6">
            <FeedItem
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
              text={
                <>
                  <span className="font-bold">Sarah J.</span> purchased{' '}
                  <span className="font-medium">Premium Salmon Dry Food</span>
                </>
              }
              time="2 mins ago"
            />
            <FeedItem
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi"
              text={
                <>
                  <span className="font-bold">Budi Santoso</span> signed up as a{' '}
                  <span className="font-medium text-emerald-500">VIP Member</span>
                </>
              }
              time="15 mins ago"
            />
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
                <Star size={18} />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-bold">Ani Wijaya</span> left a{' '}
                  <span className="font-medium text-yellow-500">5-star review</span> for Grooming
                  Kit
                </p>
                <span className="mt-1 text-[10px] font-bold text-gray-400 uppercase">
                  1 hour ago
                </span>
              </div>
            </div>
            <FeedItem
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin"
              text={
                <>
                  <span className="font-bold">Kevin Lie</span> added{' '}
                  <span className="font-medium">Cat Scratching Post</span> to wishlist
                </>
              }
              time="3 hours ago"
            />
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-1 gap-6 pb-8 2xl:grid-cols-3">
        <article className="overflow-hidden rounded-[40px] border border-emerald-50 bg-white shadow-sm 2xl:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-50 p-8">
            <h3 className="font-display text-xl font-bold">Recent Orders</h3>
            <button
              type="button"
              className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-500 transition-all hover:bg-emerald-500 hover:text-white"
            >
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  {['ID Order', 'Product', 'Date', 'Status', 'Amount'].map((heading) => (
                    <th
                      key={heading}
                      className={`px-8 py-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase ${
                        heading === 'Amount' ? 'text-right' : ''
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <OrderRow
                  id="#PS-8492"
                  seed="PF"
                  product="Puppy Feast Mix"
                  date="Oct 24, 2023"
                  status="Completed"
                  statusClass="bg-emerald-100 text-emerald-500"
                  amount="Rp 245.000"
                />
                <OrderRow
                  id="#PS-8491"
                  seed="CT"
                  product="Cat Tower XL"
                  date="Oct 24, 2023"
                  status="Processing"
                  statusClass="bg-orange-100 text-[#ff6b35]"
                  amount="Rp 1.120.000"
                />
                <OrderRow
                  id="#PS-8490"
                  seed="AC"
                  product="Aqua Clean 500ml"
                  date="Oct 23, 2023"
                  status="Shipped"
                  statusClass="bg-gray-100 text-gray-500"
                  amount="Rp 85.000"
                />
              </tbody>
            </table>
          </div>
        </article>

        <aside className="flex flex-col rounded-[40px] bg-[#173a40] p-8 text-white">
          <h3 className="font-display mb-6 text-xl font-bold">Low Stock Alerts</h3>
          <div className="flex-1 space-y-4">
            <LowStockItem title="Bird Seed 1kg" stock="Only 4 items left" />
            <LowStockItem title="Chew Bone XL" stock="Only 2 items left" />
          </div>
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-xs">
              <span>Storage Capacity</span>
              <span className="font-bold">82% Full</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[82%] bg-emerald-500" />
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-full bg-white py-3 text-sm font-bold text-[#173a40] transition-all hover:bg-emerald-50"
            >
              Manage Inventory
            </button>
          </div>
        </aside>
      </section>
    </div>
  )
}

function FeedItem({
  avatar,
  text,
  time,
}: {
  avatar: string
  text: React.ReactNode
  time: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <img src={avatar} className="h-10 w-10 rounded-full bg-orange-50" alt="Customer avatar" />
      </div>
      <div>
        <p className="text-sm">{text}</p>
        <span className="mt-1 text-[10px] font-bold text-gray-400 uppercase">{time}</span>
      </div>
    </div>
  )
}

function OrderRow({
  id,
  seed,
  product,
  date,
  status,
  statusClass,
  amount,
}: {
  id: string
  seed: string
  product: string
  date: string
  status: string
  statusClass: string
  amount: string
}) {
  return (
    <tr className="cursor-pointer transition-all hover:bg-emerald-50/20">
      <td className="px-8 py-4 text-sm font-bold">{id}</td>
      <td className="px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-50 p-1">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${seed}`}
              className="h-full w-full rounded"
              alt={product}
            />
          </div>
          <span className="text-sm font-medium">{product}</span>
        </div>
      </td>
      <td className="px-8 py-4 text-sm text-gray-500">{date}</td>
      <td className="px-8 py-4">
        <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${statusClass}`}>{status}</span>
      </td>
      <td className="px-8 py-4 text-right text-sm font-bold">{amount}</td>
    </tr>
  )
}

function LowStockItem({ title, stock }: { title: string; stock: string }) {
  return (
    <div className="flex items-center justify-between rounded-[24px] bg-white/10 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff6b35]">
          <AlertCircle size={18} />
        </div>
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-[10px] text-emerald-300">{stock}</p>
        </div>
      </div>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-all hover:bg-white/20"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}