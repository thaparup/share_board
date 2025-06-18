import { createFileRoute, redirect } from "@tanstack/react-router";
import Body from "../components/Body";
import { updateTaskTodo, useFetchTaskById } from "../Api-Client/task";
import { Task, TaskTodo } from "../types/task.types";
import { Check } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


type FormValues = {
  todos: TaskTodo[];
};

export const Route = createFileRoute(
  "/assigned/workspace_/$workspaceId/task/$taskId"
)({
  beforeLoad: async ({ context }) => {
    if (context.auth.user === null && !context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
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
  const { control, handleSubmit, watch, register } = useForm<FormValues>({
    defaultValues: {
      todos: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "todos",
  });

  useEffect(() => {
    if (data?.data) {
      replace(data?.data.taskTodo);
    }
  }, [data, replace]);

  const watchedTodos = watch("todos");

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateTaskTodo,
    onSuccess: () => {
      toast.success('updated task todo')
    },
    onError: (err) => {
      console.error('Failed to update todos:', err);
    },
  });

  const onSubmit = (formData: FormValues) => {
    console.log(formData)
    mutate(formData)
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No Due Date";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <Body>
        <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center items-center">
          Loading task details...
        </div>
      </Body>
    );
  }

  if (isError || !data?.data?.task) {
    return (
      <Body>
        <div className="min-h-screen bg-gray-900 text-red-500 p-6 flex justify-center items-center">
          Error loading task or task not found.
        </div>
      </Body>
    );
  }

  const { task, assignedUser } = data.data;



  return (
    <Body>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="cursor-pointer flex items-center mb-6 text-blue-400 hover:text-blue-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Workspace
          </button>

          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
              <div>
                <span>
                  Workspace:{" "}
                  <span className="font-medium">{task.workspaceName}</span>
                </span>
                <h1 className="text-3xl font-bold flex-grow">{task.name}</h1>
              </div>
              <div className="flex flex-col gap-1 items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>
            </div>
            <p className="text-gray-400">Due: {formatDate(task.dueDate)}</p>
            <span className="font-medium">
              Created By: <span>{task.taskCreatorName}</span>
            </span>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Description
            </h2>
            <p className="text-gray-300 whitespace-pre-line">
              {task.description}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Checklist
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.length > 0 ? (
                <ul className="space-y-3">
                  {fields.map((field, index) => (
                    <li
                      className="flex justify-between items-center w-full"
                      key={field.id}
                    >
                      <span
                        className={`${watchedTodos[index]?.checked ? "line-through text-gray-400" : "text-gray-200"}`}
                      >
                        {field.name}
                      </span>

                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                        {...register(`todos.${index}.checked`)}
                        checked={watchedTodos[index]?.checked}
                      />

                      {watchedTodos[index]?.checked && (
                        <Check size={20} className="text-green-500 ml-2" />
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No checklist items</p>
              )}

              <button
                type="submit"
                className="cursor-pointer mt-8 flex justify-center mx-auto  bg-indigo-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-indigo-700"
              >
                Save Checklist
              </button>
            </form>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Assigned To
            </h2>

            {assignedUser && assignedUser.length > 0 ? (
              assignedUser.map((user) => (
                <div
                  key={user.memberId}
                  className="flex items-center bg-gray-700 rounded-lg p-4 mb-2"
                >
                  <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                    <span className="font-medium text-white">
                      {user.memberName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.memberName}</p>
                    <p className="text-sm text-gray-400">{user.memberEmail}</p>
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