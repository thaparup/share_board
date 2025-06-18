import { createFileRoute, redirect } from '@tanstack/react-router'
import Body from '../components/Body'
import { useFetchTaskWhereUserIsAdmin } from '../Api-Client/task'


export const Route = createFileRoute('/manage/task')({
  beforeLoad: async ({ context }) => {
    if (context.auth.user === null && !context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data: tasks, isLoading } = useFetchTaskWhereUserIsAdmin()
  console.log('sdfsdfsd', tasks)
  return <Body>
    {/* <h1 className="text-2xl font-semibold text-white/85 py-4">Manage Your Tasks</h1>
    {isLoading ? (
      <h1>Loading...</h1>
    ) : (
      <div className="flex flex-wrap gap-4 p-4">
        {tasks?.data.map((taskGroup: taskGroup) => (
          <div key={taskGroup.workspaceId} className="w-full">
            <h1 className="text-lg font-bold text-white mb-2">{taskGroup.workspaceId}</h1>
            <div className="flex flex-wrap gap-4">
              {taskGroup.tasks.map((t) => (
                <div key={t.id} className="w-[300px]">
                  <TaskCard task={t} workspaceId={t.workspaceId} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    )} */}
    <h1></h1>
  </Body>
}
