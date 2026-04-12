import {
  Navigate,
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import MainNav from '#/components/MainNav'

import Sidebar from '#/components/Sidebar'

import { LoadingScreen } from '#/components/ui/LoadingScreen'

import { useAuth } from '#/context/AuthContext'

import { LOADING_SCREEN_PROGRESS_MS } from '#/lib/loading-screen'

import { getSession } from '#/services/auth.service'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    if (typeof window === 'undefined') return

    try {
      await getSession()
    } catch {
      throw redirect({ to: '/signin', search: { reauth: undefined } })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  const { status } = useAuth()
  const { pathname } = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [minLoaderElapsed, setMinLoaderElapsed] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(
      () => setMinLoaderElapsed(true),
      LOADING_SCREEN_PROGRESS_MS,
    )
    return () => window.clearTimeout(id)
  }, [])

  if (status === 'anonymous')
    return <Navigate to="/signin" search={{ reauth: undefined }} replace />

  const showLoader = status === 'loading' || !minLoaderElapsed
  if (showLoader) return <LoadingScreen />

  const activeItem = pathname.startsWith('/dashboard/analytics')
    ? 'analytics'
    : pathname.startsWith('/dashboard/orders')
      ? 'orders'
      : pathname.startsWith('/dashboard/inventory/categories')
        ? 'inventory-category'
        : pathname.startsWith('/dashboard/inventory')
          ? 'inventory-post'
          : pathname.startsWith('/dashboard/blog/categories')
            ? 'blog-category'
            : pathname.startsWith('/dashboard/blog')
              ? 'blog-post'
              : pathname.startsWith('/dashboard/costumers')
                ? 'customers'
                : pathname.startsWith('/dashboard/testimonials')
                  ? 'testimonials'
                  : pathname.startsWith('/dashboard/template-whatsapp')
                    ? 'template-whatsapp'
                    : pathname.startsWith('/dashboard/support')
                      ? 'support'
                      : pathname.startsWith('/dashboard/settings')
                        ? 'settings'
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
