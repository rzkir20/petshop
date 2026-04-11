import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/blog/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/blog/create"!</div>
}
