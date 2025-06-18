import { createFileRoute, redirect } from '@tanstack/react-router'
import Body from '../components/Body'
import { useFetchTaskWhereUserIsAdmin } from '../Api-Client/task'
import ManageTaskEditCard from '../components/ManageTaskEditCard'
import { useAuthStore } from '../store/auth.store'

export const Route = createFileRoute('/tasks/manage')({
  beforeLoad: async ({ context }) => {
    if (context.auth.user === null && !context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {

  const { data } = useFetchTaskWhereUserIsAdmin();

  const { user } = useAuthStore()
  return (
    <Body>
      <div className="container mx-auto px-4 py-8">
        <h1 className='text-2xl font-medium text-center mb-12'>Task Management</h1>

        {data?.data.taskWhereUserIsAdmin.map((item) =>
          <div className='my-4'>
            <h1 className='font-semibold text-gray-300 text-xl'>{item.workspace}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2'>
              {item.tasks.map((task) => {
                if (task.taskCreatorId === user?.id) {
                  return <ManageTaskEditCard task={task} workspaceId={task.workspaceId} key={task.id} />
                }
              })}
            </div>
          </div>
        )}

        <h1 className='font-semibold text-gray-300 text-xl'>Other's workspace</h1>
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
