import {
  Navigate,
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'

import MainNav from '../../components/MainNav'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'
import { getSession } from '../../services/auth.service'

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
      <Sidebar activeItem={activeItem} />
      <main className="ml-72">
        <MainNav />
        <Outlet />
      </main>
    </div>
  )
}
