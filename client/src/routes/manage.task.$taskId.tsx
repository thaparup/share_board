import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage/task/$taskId')({
  component: RouteComponent,
})

function RouteComponent() {



  return <div>Hello "/manage/task/$taskId"!</div>
}
