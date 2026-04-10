import {
  BarChart3,
  BookText,
  ChevronDown,
  Crown,
  HelpCircle,
  LayoutDashboard,
  Package,
  PawPrint,
  Settings,
  ShoppingBag,
  Users2,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

type SidebarItem = {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  href?: string
  to?: string
  subItems?: Array<{
    id: string
    label: string
    to: string
  }>
}

const mainMenuItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: '/dashboard',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    to: '/dashboard/analytics',
  },
  { id: 'orders', label: 'Orders', icon: ShoppingBag, to: '/dashboard/orders' },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Package,
    subItems: [
      { id: 'inventory-post', label: 'Post', to: '/dashboard/inventory' },
      {
        id: 'inventory-category',
        label: 'Category',
        to: '/dashboard/inventory/categories',
      },
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    icon: BookText,
    subItems: [
      { id: 'blog-post', label: 'Post', to: '/dashboard/blog' },
      {
        id: 'blog-category',
        label: 'Category',
        to: '/dashboard/blog/categories',
      },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users2,
    to: '/dashboard/costumers',
  },
]

const accountItems: SidebarItem[] = [
  { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' },
  { id: 'support', label: 'Support', icon: HelpCircle, href: '#support' },
]

export default function Sidebar({
  activeItem = 'dashboard',
  orderCount = 12,
  showUpgradeCard = true,
  className = '',
  onNavigate,
}: {
  activeItem?: string
  orderCount?: number
  showUpgradeCard?: boolean
  className?: string
  onNavigate?: () => void
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-full w-72 flex-col border-r border-emerald-100 bg-white transition-transform duration-300 xl:translate-x-0 ${className}`}
    >
      <div className="flex items-center gap-3 p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)]">
          <PawPrint size={20} />
        </div>
        <span className="font-display text-2xl font-bold tracking-tight text-[#173a40]">
          Pawsome<span className="text-[#ff6b35]">Shop</span>
        </span>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-4">
        <p className="mb-4 px-4 text-[10px] font-bold tracking-widest text-emerald-600/50 uppercase">
          Main Menu
        </p>

        {mainMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          const isSubItemActive =
            item.subItems?.some((subItem) => subItem.id === activeItem) ?? false
          const itemClassName = `flex items-center gap-3 rounded-[20px] px-4 py-3.5 transition-all duration-300 ${
            isActive || isSubItemActive
              ? 'bg-emerald-500 text-white'
              : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-500'
          }`

          if (item.subItems?.length) {
            return (
              <details
                key={item.id}
                className="group"
                open={isActive || isSubItemActive}
              >
                <summary
                  className={`${itemClassName} list-none cursor-pointer`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  <ChevronDown
                    size={16}
                    className="ml-auto transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <div className="mt-1 space-y-1 pl-10">
                  {item.subItems.map((subItem) => {
                    const isSubActive = activeItem === subItem.id
                    return (
                      <Link
                        key={subItem.id}
                        to={subItem.to}
                        onClick={onNavigate}
                        className={`flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 ${
                          isSubActive
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-500'
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    )
                  })}
                </div>
              </details>
            )
          }

          if (item.to) {
            return (
              <Link
                key={item.id}
                to={item.to}
                onClick={onNavigate}
                className={itemClassName}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {item.id === 'orders' && orderCount > 0 ? (
                  <span className="ml-auto rounded-full bg-[#ff6b35] px-2 py-0.5 text-[10px] font-bold text-white">
                    {orderCount}
                  </span>
                ) : null}
              </Link>
            )
          }

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={onNavigate}
              className={itemClassName}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {item.id === 'orders' && orderCount > 0 ? (
                <span className="ml-auto rounded-full bg-[#ff6b35] px-2 py-0.5 text-[10px] font-bold text-white">
                  {orderCount}
                </span>
              ) : null}
            </a>
          )
        })}

        <div className="pt-8">
          <p className="mb-4 px-4 text-[10px] font-bold tracking-widest text-emerald-600/50 uppercase">
            Account
          </p>
          {accountItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 rounded-[20px] px-4 py-3.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-500'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </a>
            )
          })}
        </div>
      </nav>

      {showUpgradeCard ? (
        <div className="p-6">
          <div className="rounded-[24px] bg-emerald-50 p-5 text-center">
            <div className="mx-auto -mt-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)]">
              <Crown size={18} className="text-[#ff6b35]" />
            </div>
            <h4 className="mt-2 text-sm font-bold">Pro Plan</h4>
            <p className="mt-1 text-xs text-gray-500">
              Unlock advanced features and insights.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-full bg-emerald-500 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-600"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  )
}
