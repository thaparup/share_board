import { createFileRoute } from '@tanstack/react-router'
import Body from '../components/Body'
import { useFetchTaskWhereUserIsAdmin } from '../Api-Client/task'
import TaskCard from '../components/TaskCard'
import { taskGroup } from '../types/task.types'

export const Route = createFileRoute('/manage/task')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: tasks, isLoading } = useFetchTaskWhereUserIsAdmin()
  return <Body>
    <h1 className="text-2xl font-semibold text-white/85 py-4">Manage Your Tasks</h1>
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

    )}
  </Body>
}
