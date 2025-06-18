import { createFileRoute, redirect } from "@tanstack/react-router";
import Body from "../components/Body";
import { useFetchAssignedTasks } from "../Api-Client/task";
import AssignedTaskCard from "../components/AssingedTaskCard";

export const Route = createFileRoute("/assigned/tasks/")({
    beforeLoad: async ({ context }) => {
        if (context.auth.user === null && !context.auth.isAuthenticated) {
            throw redirect({ to: "/login" });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { data: tasks, isLoading } = useFetchAssignedTasks();


    return (
        <Body>
            <h1 className="text-2xl font-semibold text-white/85 py-4 text-center">
                Assigned Tasks For You
            </h1>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {tasks?.data.map((task) => {
                        return (
                            <div>
                                <h1 key={task.name}>{task.name}</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                                    {task.tasks.map((task) => (
                                        <AssignedTaskCard
                                            task={task}
                                            workspaceId={task.workspaceId!}
                                            key={task.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </Body>
    );
}
