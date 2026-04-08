import { BadgePercent, Grid2X2, Headset, Home, Store } from 'lucide-react'

import { Link } from '@tanstack/react-router'

export default function AppNavigation() {
  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/shop', icon: Store },
    { label: 'Categories', href: '/categories', icon: Grid2X2 },
    { label: 'Deals', href: '/deals', icon: BadgePercent },
    { label: 'Contact', href: '/contact', icon: Headset },
  ]

  return (
    <nav className="fixed right-4 bottom-4 left-4 z-50 rounded-2xl border border-emerald-100 bg-white/95 p-2 shadow-xl backdrop-blur xl:hidden">
      <ul className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <li key={item.label}>
              <Link
                to={item.href}
                aria-label={item.label}
                className="flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                activeOptions={{ exact: item.href === '/' }}
                activeProps={{
                  className:
                    'flex flex-col items-center justify-center gap-1 rounded-xl bg-emerald-50 px-1 py-2 text-[11px] font-medium text-emerald-600',
                }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
