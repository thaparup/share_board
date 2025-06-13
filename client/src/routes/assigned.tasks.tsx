import { createFileRoute } from '@tanstack/react-router'
import Body from '../components/Body'
import { useFetchAssignedTasks } from '../Api-Client/task'
import AssignedTaskCard from '../components/AssingedTaskCard'

export const Route = createFileRoute('/assigned/tasks')({
    component: RouteComponent,
})

function RouteComponent() {
    const { data: tasks, isLoading } = useFetchAssignedTasks()
    return (
        <Body>
            <h1 className="text-2xl font-semibold text-white/85 py-4">Manage Your Tasks</h1>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {tasks?.data.tasks.map((task) => <AssignedTaskCard key={task.id} task={task} workspaceId={task.workspaceId} />)}
                </div>

            )}
        </Body>
    )
}
