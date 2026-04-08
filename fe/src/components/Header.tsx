import { PawPrint, Search, ShoppingCart, Sparkles } from 'lucide-react'

import { Link } from '@tanstack/react-router'

export default function Header() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Categories', href: '/categories' },
    { label: 'Deals', href: '/deals' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-50 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full container items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
            <PawPrint size={22} />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-slate-800">
            Pawsome<span className="text-emerald-500">Shop</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="transition-colors hover:text-emerald-500"
              aria-label={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            to="/search"
            aria-label="Open search"
            className="p-2 text-slate-500 transition-colors hover:text-emerald-500"
          >
            <Search size={24} />
          </Link>
          <Link
            to="/cart"
            aria-label="View cart"
            className="relative p-2 text-slate-500 transition-colors hover:text-emerald-500"
          >
            <ShoppingCart size={24} />
            <span className="absolute top-1 right-1 rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </Link>
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-600 sm:flex"
          >
            <Sparkles size={16} />
            <span>Join Club</span>
          </button>
        </div>
      </div>
    </header>
  )
}
