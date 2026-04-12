import { ChevronDown, Crown, PawPrint } from 'lucide-react'

import { Link } from '@tanstack/react-router'

import { cn } from '#/lib/utils'

import { mainMenuItems, accountItems } from '#/data/data'

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
      className={`fixed inset-y-0 left-0 z-40 flex h-full min-h-0 w-72 flex-col overflow-hidden border-r border-emerald-100 bg-white transition-transform duration-300 xl:translate-x-0 ${className}`}
    >
      <div className="shrink-0 flex items-center gap-3 p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.15)]">
          <PawPrint size={20} />
        </div>
        <span className="font-display text-2xl font-bold tracking-tight text-[#173a40]">
          Pawsome<span className="text-[#ff6b35]">Shop</span>
        </span>
      </div>

      <nav
        className={cn(
          'mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto overflow-x-hidden px-4',
          '[scrollbar-width:thin] [scrollbar-color:rgb(167_243_208)_transparent]',
          '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-200/90',
          '[&::-webkit-scrollbar-thumb:hover]:bg-emerald-300',
        )}
      >
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
                <div className="mt-2 border-t border-emerald-100 pt-2">
                  <div className="ml-3 space-y-1 border-l-2 border-emerald-100 pl-4">
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
              <Link
                key={item.id}
                to={item.href}
                className={`flex items-center gap-3 rounded-[20px] px-4 py-3.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-500'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {showUpgradeCard ? (
        <div className="shrink-0 p-6">
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
