import { ChevronDown, LogOut, Settings } from 'lucide-react'

import { useEffect, useRef, useState } from 'react'

import { Link } from '@tanstack/react-router'

import { useAuth } from '#/context/AuthContext'

import { cn } from '#/lib/utils'

export default function ProfileMenu() {
  const { user, signout } = useAuth()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const displayName = user?.name.trim() || 'Admin Pawsome'
  const displayEmail = user?.email.trim() || 'Store Manager'
  const displayAvatar =
    user?.pictures?.trim() ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      displayName,
    )}`

  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-2xl py-1 pr-1 pl-2 transition-colors hover:bg-emerald-50/80"
        aria-expanded={open}
        aria-haspopup="menu"
        id="user-profile-menu-btn"
      >
        <div className="text-right">
          <p className="text-sm font-bold">{displayName}</p>
          <p className="text-[10px] text-gray-400">{displayEmail}</p>
        </div>
        <span className="relative h-10 w-10 shrink-0 rounded-full border-2 border-emerald-100 p-0.5">
          <img
            src={displayAvatar}
            alt={displayName}
            className="h-full w-full rounded-full bg-emerald-50"
          />
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-gray-400 transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          aria-labelledby="user-profile-menu-btn"
          className="absolute top-full right-0 z-50 mt-2 px-2 min-w-[220px] overflow-hidden rounded-2xl border border-emerald-100 bg-white py-2 shadow-lg ring-1 ring-black/5"
        >
          <Link
            to="/dashboard/settings"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 rounded-xl py-2.5 text-sm font-medium text-[#173a40] transition-colors hover:bg-emerald-50"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Settings className="size-4" aria-hidden />
            </span>
            <span>Settings</span>
          </Link>

          <div
            className="h-px bg-emerald-100/80 my-2"
            role="separator"
            aria-hidden
          />
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-3 px-4 rounded-xl py-2.5 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            onClick={() => {
              setOpen(false)
              void signout()
            }}
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <LogOut className="size-4" aria-hidden />
            </span>
            <span>Keluar</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
