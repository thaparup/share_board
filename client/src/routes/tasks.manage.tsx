import { createFileRoute } from '@tanstack/react-router'
import Body from '../components/Body'
import { useFetchTaskWhereUserIsAdmin } from '../Api-Client/task'
import ManageTaskEditCard from '../components/ManageTaskEditCard'
import { useAuthStore } from '../store/auth.store'

export const Route = createFileRoute('/tasks/manage')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data } = useFetchTaskWhereUserIsAdmin()
  const { user } = useAuthStore()
  return (
    <Body>
      <div className="container mx-auto px-4 py-8">
        <h1 className='text-2xl font-medium'>Task Management</h1>

        {data?.data.taskWhereUserIsAdmin.map((item) =>
          <div className='my-4'>
            <h1 className='font-medium'>{item.workspace}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2'>
              {item.tasks.map((task) => <ManageTaskEditCard task={task} workspaceId={task.workspaceId} key={task.id} />)}
            </div>
          </div>
        )}

        <h1>Other's workspace</h1>
        {data?.data.taskWhereUserIsNotAdmin.map((item) =>
          <div className='my-4'>
            <h1 className='font-medium'>{item.workspace}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2'>
              {item.tasks.map((task) => <ManageTaskEditCard task={task} workspaceId={task.workspaceId} key={task.id} />)}
            </div>
          </div>
        )}
      </div>
    </Body>
  )
}
