
import { Link } from "@tanstack/react-router"
import { Users, Calendar, CheckSquare } from "lucide-react";

type WorkspaceCardProps = {
    workspaceId: string,
    name: string;
    workspaceCreatorName: string;
    createdAt: string;
    totalTasks: number;
    taskCompleted: number;
    totalMembers: number;
};

const WorkspaceCard = ({
    workspaceId,
    name,
    workspaceCreatorName,
    createdAt,
    totalTasks,
    taskCompleted,
    totalMembers,
}: WorkspaceCardProps) => {
    const progress = totalTasks === 0 ? 0 : Math.round((taskCompleted / totalTasks) * 100);
    const noTasks = totalTasks === 0;

    // Determine status color based on progress
    const getStatusColor = () => {
        if (noTasks) return "bg-orange-500";
        if (progress < 30) return "bg-red-500";
        if (progress < 70) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <Link to='/workspaces/$workspaceId' params={{ workspaceId }} className="flex rounded-2xl shadow-lg bg-gray-200 w-full max-w-sm overflow-hidden">
            {/* Left color strip */}
            <div className={`${getStatusColor()} w-2`}></div>

            {/* Content */}
            <div className="p-5 flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{name}</h2>
                <p className="text-sm text-gray-600 font-medium flex items-center mb-1">
                    Created By {workspaceCreatorName || "No name"}
                </p>

                <div className="flex items-center text-gray-500 text-xs mb-4">
                    <Calendar size={14} className="mr-1" />
                    <span>Created on {new Date(createdAt).toLocaleDateString()}</span>
                </div>

                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-700 flex items-center">
                            <CheckSquare size={16} className="mr-1" />
                            {noTasks ? "No tasks yet" : `Tasks: ${taskCompleted}/${totalTasks}`}
                        </p>
                        <span className={`text-xs font-bold ${noTasks ? "text-orange-600" :
                            progress < 30 ? "text-red-600" :
                                progress < 70 ? "text-yellow-600" :
                                    "text-green-600"
                            }`}>
                            {noTasks ? "NEW" : `${progress}%`}
                        </span>
                    </div>
                    <div className="h-2 bg-gray-400 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${noTasks ? "bg-orange-500" :
                                progress < 30 ? "bg-red-500" :
                                    progress < 70 ? "bg-yellow-500" :
                                        "bg-green-500"
                                }`}
                            style={{ width: noTasks ? "5%" : `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center text-gray-600 text-sm">
                    <Users size={16} className="mr-1" />
                    <span className="font-medium">{totalMembers}</span>
                    <span className="ml-1">{totalMembers === 1 ? "Member" : "Members"}</span>
                </div>
            </div>
        </Link>
    );
};

export default WorkspaceCard;