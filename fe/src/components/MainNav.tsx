import { Bell, Menu, Search } from 'lucide-react'

import ProfileMenu from './ProfileMenu'

export default function MainNav({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-emerald-50 bg-white/80 px-8 backdrop-blur-md">
      <div className="flex w-96 max-w-full items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex rounded-xl p-2 text-gray-600 transition-colors hover:bg-emerald-50 xl:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu size={20} />
        </button>

        <div className="relative flex-1">
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

        <ProfileMenu />
      </div>
    </header>
  )
}
