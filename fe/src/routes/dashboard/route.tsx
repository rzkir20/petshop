import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'

import MainNav from '../../components/MainNav'
import Sidebar from '../../components/Sidebar'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { pathname } = useLocation()
  const activeItem = pathname.startsWith('/dashboard/analytics')
    ? 'analytics'
    : pathname.startsWith('/dashboard/orders')
      ? 'orders'
      : pathname.startsWith('/dashboard/inventory')
        ? 'inventory'
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
