import { Bell, Search } from 'lucide-react'

import { useAuth } from '../context/AuthContext'

export default function MainNav() {
  const { user } = useAuth()
  const displayName = user?.name.trim() || 'Admin Pawsome'
  const displayEmail = user?.email.trim() || 'Store Manager'
  const displayAvatar =
    user?.pictures?.trim() ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      displayName,
    )}`

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-emerald-50 bg-white/80 px-8 backdrop-blur-md">
      <div className="relative w-96 max-w-full">
        <Search
          size={18}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full rounded-full border border-emerald-100/50 bg-emerald-50/50 py-2.5 pr-4 pl-12 text-sm transition-all focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="relative rounded-full p-2.5 text-gray-500 transition-all hover:bg-emerald-50"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full border-2 border-white bg-[#ff6b35]" />
        </button>
        <div className="h-8 w-px bg-emerald-100" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold">{displayName}</p>
            <p className="text-[10px] text-gray-400">{displayEmail}</p>
          </div>
          <button
            type="button"
            className="h-10 w-10 rounded-full border-2 border-emerald-100 p-0.5"
          >
            <img
              src={displayAvatar}
              alt={displayName}
              className="h-full w-full rounded-full bg-emerald-50"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
