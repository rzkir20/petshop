import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/blog/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/blog/$id"!</div>
}
