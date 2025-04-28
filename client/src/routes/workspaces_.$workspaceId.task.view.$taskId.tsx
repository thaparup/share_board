import { createFileRoute } from '@tanstack/react-router';
import { useFetchTaskById } from '../Api-Client/task';
import { Task } from '../types/task.types';
import Body from '../components/Body';

export const Route = createFileRoute('/workspaces_/$workspaceId/task/view/$taskId')({
  loader: async ({ params }) => {
    return {
      taskId: params.taskId,
      workspaceId: params.workspaceId,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { taskId, workspaceId } = Route.useLoaderData();

  const { data, isLoading, isError } = useFetchTaskById(workspaceId, taskId);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No Due Date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-500';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'LOW':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProgressColor = (progress: Task['progress']) => {
    switch (progress) {
      case 'COMPLETED':
        return 'bg-green-500';
      case 'IN_PROGRESS':
        return 'bg-blue-500';
      case 'PENDING':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const toggleChecklistItem = () => {
    if (!data) return;
    console.log('Checklist item toggled:', data.data.taskTodo);
    // Normally, trigger an API mutation here
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-center">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>Unable to fetch task.</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { task, assignedUser, taskTodo } = data.data;

  return (
    <Body>

      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">

          {/* Back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center mb-6 text-blue-400 hover:text-blue-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Workspace
          </button>

          {/* Task header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
              <h1 className="text-3xl font-bold flex-grow">{task.name}</h1>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(task.progress)}`}>
                  {task.progress.replace('_', ' ')}
                </span>
              </div>
            </div>
            <p className="text-gray-400">Due: {formatDate(task.dueDate)}</p>
          </div>

          {/* Task description */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Description</h2>
            <p className="text-gray-300 whitespace-pre-line">{task.description}</p>
          </div>

          {/* Checklist */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Checklist</h2>
            {taskTodo ? (
              <ul className="space-y-3">
                <li className="flex items-center">
                  <input
                    type="checkbox"
                    checked={taskTodo.checked}
                    onChange={() => toggleChecklistItem()}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-opacity-50 mr-3"
                  />
                  <span className={taskTodo.checked ? 'line-through text-gray-500' : 'text-gray-200'}>
                    {taskTodo.name}
                  </span>
                </li>
              </ul>
            ) : (
              <p className="text-gray-500 italic">No checklist items</p>
            )}
          </div>



          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Assigned To</h2>

            {assignedUser.length > 0 ? (
              assignedUser.map((user) => (
                <div key={user.id} className="flex items-center bg-gray-700 rounded-lg p-4 mb-2">
                  <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                    <span className="font-medium text-white">{user.assignedUserName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{user.assignedUserName}</p>
                    <p className="text-sm text-gray-400">{user.assignedUserEmail}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No user assigned</p>
            )}
          </div>


        </div>
      </div>
    </Body>
  );
}
