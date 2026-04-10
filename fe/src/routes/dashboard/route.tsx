import {
  Navigate,
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { useState } from 'react'

import MainNav from '#/components/MainNav'

import Sidebar from '#/components/Sidebar'

import { useAuth } from '#/context/AuthContext'

import { getSession } from '#/services/auth.service'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    if (typeof window === 'undefined') return

    try {
      await getSession()
    } catch {
      throw redirect({ to: '/signin' })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  const { status } = useAuth()
  const { pathname } = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (status === 'loading') return null
  if (status === 'anonymous') return <Navigate to="/signin" />

  const activeItem = pathname.startsWith('/dashboard/analytics')
    ? 'analytics'
    : pathname.startsWith('/dashboard/orders')
      ? 'orders'
      : pathname.startsWith('/dashboard/inventory/categories')
        ? 'inventory-category'
        : pathname.startsWith('/dashboard/inventory')
          ? 'inventory-post'
          : pathname.startsWith('/dashboard/costumers')
            ? 'customers'
            : 'dashboard'

  return (
    <div className="min-h-screen bg-[#f3faf5] text-[#173a40]">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 xl:hidden"
        />
      ) : null}
      <Sidebar
        activeItem={activeItem}
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0`}
        onNavigate={() => setIsSidebarOpen(false)}
      />
      <main className="xl:ml-72">
        <MainNav onMenuClick={() => setIsSidebarOpen(true)} />
        <Outlet />
      </main>
    </div>
  )
}
