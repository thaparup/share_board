import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>product</h1>
    <img src="https://i.pravatar.cc/300" alt="random" />
  </div>
}
