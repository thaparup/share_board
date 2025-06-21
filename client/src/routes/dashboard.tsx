import { createFileRoute, redirect } from "@tanstack/react-router";
import Body from "../components/Body";
import { useGetDashboardStats } from "../Api-Client/dashboard";
import { AlertTriangle, CheckCircle, Clock, Folder, Users } from "lucide-react";
import TaskStatsCard from "../components/TaskStatsCard";

export const Route = createFileRoute("/dashboard")({
    beforeLoad: async ({ context }) => {
        // if (!context.auth.isAuthenticated) {
        //     throw redirect({
        //         to: '/login',

        //     })
        // }

        if (context.auth.user === null && !context.auth.isAuthenticated) {
            throw redirect({ to: "/login" });
        }
    },

    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading, isError } = useGetDashboardStats();
    console.log(data);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading dashboard</div>;

    const getPriorityColor = (priority: "HIGH" | "MEDIUM" | "LOW") => {
        switch (priority) {
            case "HIGH":
                return "text-red-600 bg-red-50";
            case "MEDIUM":
                return "text-yellow-600 bg-yellow-50";
            case "LOW":
                return "text-green-600 bg-green-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <Body>
            <div className="p-6 space-y-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-100 mb-2">Dashboard</h1>
                        <p className="text-gray-400">
                            Welcome back! Here's what's happening with your tasks.
                        </p>
                    </div>
                </div>

                {/* Tasks overview  */}
                <div className="grid grid-cols-2 gap-6">
                    <TaskStatsCard
                        title="Total Tasks"
                        stats={data?.data?.mytasks?.total!}
                        statsCss="text-gray-900"
                        icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
                        iconContainerColor="bg-blue-50"
                    />

                    <TaskStatsCard
                        title="Completed"
                        stats={data?.data?.mytasks?.completed!}
                        statsCss="text-green-600"
                        icon={<CheckCircle className="h-6 w-6 text-green-600" />}
                        iconContainerColor="bg-green-50"
                    />
                    <TaskStatsCard
                        title="Pending"
                        stats={data?.data?.mytasks?.pending!}
                        statsCss="text-yellow-600"
                        icon={<Clock className="h-6 w-6 text-yellow-600" />}
                        iconContainerColor="bg-yellow-50"
                    />
                    <TaskStatsCard
                        title="Overdue"
                        stats={data?.data?.mytasks?.overdue!}
                        statsCss="text-red-600"
                        icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
                        iconContainerColor="bg-red-50"
                    />
                    <TaskStatsCard
                        title="High Priority"
                        stats={data?.data?.mytasks?.highPriority!}
                        statsCss="text-orange-600"
                        icon={<AlertTriangle className="h-6 w-6 text-orange-600" />}
                        iconContainerColor="bg-orange-50"
                    />
                </div>
                {/* My Tasks */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            My Assigned Tasks
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            {data?.data.assignedTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                                >
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {task.name}
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            {task.workspaceName}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}
                                        >
                                            {task.priority}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {formatDate(task.dueDate)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Upcoming Deadlines
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            {data?.data.upcomingDeadlines &&
                                data?.data.upcomingDeadlines?.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                                    >
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">
                                                {task.name}
                                            </h4>
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}
                                            >
                                                {task.priority}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">
                                                {formatDate(task.dueDate)}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {Math.ceil(
                                                    (new Date(task.dueDate).getTime() -
                                                        new Date().getTime()) /
                                                    (1000 * 60 * 60 * 24)
                                                )}{" "}
                                                days
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {/* Workspaces Overview */}
                <div className="mt-8 bg-white rounded-lg shadow-sm border ">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                My Workspaces
                            </h2>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Manage Workspaces
                            </button>
                        </div>
                    </div>
                    <div className="p-6 ">
                        <div className=" w-full">
                            {data?.data?.workspaces.map((workspace) => {
                                const completedCount = workspace.completedTasks;
                                const totalCount = workspace.totalTasks;
                                const completionRate =
                                    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

                                return (
                                    <div
                                        key={workspace.id}
                                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow w-full"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-2">
                                                <Folder className="h-5 w-5 text-blue-600" />
                                                <h3 className="font-semibold text-gray-900">
                                                    {workspace.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Users className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-500">
                                                    {workspace.totalMembers}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <span>Progress</span>
                                                <span>
                                                    {completedCount}/{totalCount} tasks
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full"
                                                    style={{ width: `${completionRate}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex -space-x-1">
                                            {workspace.members.slice(0, 3).map((member, index) => (
                                                <div
                                                    key={index}
                                                    className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center"
                                                >
                                                    <span className="text-xs font-medium text-gray-700">
                                                        {member.memberName.charAt(0)}
                                                    </span>
                                                </div>
                                            ))}
                                            {workspace.members.length > 3 && (
                                                <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">
                                                        +{workspace.members.length - 3}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    );
}
