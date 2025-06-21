import { format } from "date-fns";
import React from "react";
import { Users, Calendar, ListTodo } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Task } from "../types/workspace.types";


export const priorityColors: Record<Task["priority"], string> = {
    HIGH: "bg-red-500",
    MEDIUM: "bg-yellow-500",
    LOW: "bg-blue-500",
};


export const formatDate = (dateString: string): string => {
    try {
        const date = new Date(dateString);
        return format(date, "MMM dd, yyyy");
    } catch (error) {
        return "Invalid date";
    }
};

export const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    return `${diffDays} days left`;
};

interface TaskCardProps {
    task: Task;
    workspaceId: string,
}

const TaskCard: React.FC<TaskCardProps> = ({ task, workspaceId }) => {
    const daysRemaining = getDaysRemaining(task.dueDate);
    const isOverdue = daysRemaining === "Overdue";
    const taskId = task.id
    return (
        <Link to='/workspaces/$workspaceId/task/view/$taskId' params={{ taskId, workspaceId }} className="mb-4 bg-white  rounded-lg shadow-md overflow-hidden flex">
            {/* <div className={`w-2 ${priorityColors[task.priority]}`}>{task.priority}</div> */}
            <div className={`w-2 bg-indigo-600`}></div>

            <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>

                </div>

                <p className="text-gray-600 mt-2 text-sm line-clamp-3">{task.description}</p>

                <div className="mt-4 flex flex-col gap-2 text-sm  border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 mt-2">
                        <span>Created by:</span>
                        <span className="font-medium text-gray-700">
                            {task.taskCreatorName}
                        </span>
                    </div>

                    <div
                        className={`flex items-center gap-2 ${isOverdue ? "text-red-600 font-semibold" : "text-gray-600"}`}
                    >
                        <Calendar className="w-4 h-4" />
                        {task.completed ? 'Completed' : (

                            <span>
                                {formatDate(task.dueDate)} • {daysRemaining}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>

                            {task._count.TaskAssignment}{" "}
                            {task._count.TaskAssignment === 1 ? "Assigned Member" : "Assigned Members"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <ListTodo className="w-4 h-4" />
                        <span>
                            {task._count.TaskTodoCheckList}{" "}
                            {task._count.TaskTodoCheckList === 1 ? "Todo" : "Todos"}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TaskCard;
