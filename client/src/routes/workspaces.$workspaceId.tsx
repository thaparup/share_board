import { createFileRoute } from '@tanstack/react-router';
import { useQueryFetchWorkspaceById } from '../Api-Client/workspace';
import TaskCards from '../components/TaskCards';
import Body from '../components/Body';
import WorkspaceMembersSection from '../components/WorkspaceMembersSection';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import WorkspaceTask from '../components/WorkspaceTask';


export const Route = createFileRoute('/workspaces/$workspaceId')({
  loader: async ({ params }) => {

    return {
      workspaceId: params.workspaceId,
    };
  },
  component: RouteComponent,
});




function RouteComponent() {
  const { workspaceId } = Route.useLoaderData();
  console.log('workspace id ', workspaceId)


  const handleAddMemberClick = () => {

    console.log('Add member clicked');
  };

  const { data: workspace,
    isLoading,
    isError,
    error
  } = useQueryFetchWorkspaceById(workspaceId);


  if (isLoading) return <Body><div>Loading workspace data...</div></Body>;


  if (isError) return <Body><div>Error loading workspace: {error?.message}</div></Body>;

  if (!workspace || !workspace.data) return <Body><div>No workspace data available</div></Body>;


  return (
    <Body>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white ">{workspace?.data?.workspace.name}</h1>
          <p className="text-white/60">Manage all tasks related to this workspace</p>
        </div>

        {/* Members Section */}
        <WorkspaceMembersSection
          members={workspace?.data.members}
          workspace={workspace.data.workspace}
          tasks={workspace?.data.tasks}
          onAddMemberClick={handleAddMemberClick}
          workspaceId={workspaceId}
        />

        {/* Tasks Section */}
        {/* <div className='mt-12'>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Tasks</h2>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md mr-8 flex items-center text-sm"

            >
              <Plus size={16} className="mr-1" />
              Add Task
            </Button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {workspace?.data.tasks.map((task) => (
              <TaskCards key={task.id} task={task} />
            ))}

            {workspace?.data.tasks?.length === 0 && (
              <div className="col-span-full text-center py-12 bg-gray-800 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-white">No tasks</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new task for this workspace.</p>
              </div>
            )}
          </div>
        </div> */}

        <WorkspaceTask tasks={workspace.data.tasks} workspaceId={workspaceId} />
      </div>
    </Body>
  );
}