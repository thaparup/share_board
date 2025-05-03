import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/workspaces_/$workspaceId/task/manage/$taskId',
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      taskId: params.taskId,
      workspaceId: params.workspaceId,
    };
  },
})

function RouteComponent() {

  const { taskId, workspaceId } = Route.useLoaderData()


  return <div>Hello "/workspaces_/$workspaceId/task/manage/$taskId"! ${taskId} ${workspaceId}</div>
}
