import { format } from "date-fns";
import React, { useState } from "react";
import { Task } from "../types/task.types";
import { Users, Calendar } from "lucide-react"; // ✅ Lucide icon: ;
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { useAuthStore } from "../store/auth.store";
import Alert from "./Alert";
import { deleteTask, } from "../Api-Client/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "../main";


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
    task: {
        id: string;
        name: string;
        description: string;
        priority: "LOW" | "MEDIUM" | "HIGH";
        completed: boolean;
        workspaceId: string;
        workspaceName: string;
        taskCreatorId: string;
        taskCreatorName: string;
        taskCreatorEmail: string;
        dueDate: string;
        startDate: string;
        createdAt: string;
        updatedAt: string;
    },
    workspaceId: string,
}

const ManageTaskEditCard: React.FC<TaskCardProps> = ({ task, workspaceId }) => {
    const [deleteDialog, setDeleteDialog] = useState(false)
    const user = useAuthStore()
    const daysRemaining = getDaysRemaining(task.dueDate);
    const isOverdue = daysRemaining === "Overdue";
    const taskId = task.id

    const queryClient = useQueryClient();

    const { mutate: deleteTaskMutation, isPending } = useMutation({

        mutationFn: (taskId: string) => deleteTask(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskWhereUserIsAdmin"] });
            toast.success("Task deleted");
            setDeleteDialog(false);
        },
        onError: (error) => {
            console.error("Failed to delete task:", error);
            toast.error("Failed to delete task");
        },
    });

    const handleDeleteConfirm = (taskId: string) => {
        if (taskId) {
            deleteTaskMutation(taskId);
        }
    };

    return (
        <div className="mb-4 bg-white  rounded-lg shadow-md overflow-hidden flex">
            {/* <div className={`w-2 ${priorityColors[task.priority]}`}>{task.priority}</div> */}
            <div className={`w-2 bg-indigo-600`}></div>

            <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{task.name}</h3>

                </div>

                <p className="text-gray-600 mt-2 text-sm">{task.description}</p>

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
                    {task.taskCreatorId === user.user!.id ? (
                        <div className="flex flex-col gap-2 mt-2">
                            <Link to='/workspaces/$workspaceId/task/manage/$taskId' params={{ taskId, workspaceId }} className="font-semibold text-md text-white bg-amber-500 py-2 text-center rounded-sm">
                                Edit</Link>
                            <Button onClick={() => setDeleteDialog(true)} className="bg-indigo-500" type="button">Delete</Button>
                        </div>
                    ) : null}
                    <Alert open={deleteDialog} onOpenChange={setDeleteDialog} description="  This action cannot be undone. This will permanently delete your account and remove your task from our servers." title="Are you absolutely sure?" actionText="Confirm Delete" cancelText="Cancel" onConfirm={() => handleDeleteConfirm(task.id)} />
                </div>
            </div>
        </div>
    );
};

export default ManageTaskEditCard;
