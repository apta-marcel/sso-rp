import { requireAuth } from '@/middlewares/auth.middleware'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
  beforeLoad: requireAuth,
})

function RouteComponent() {
  return <Outlet />
}
