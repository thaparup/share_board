import React from "react";

type Task = {
    name: string;
    description: string;
    dueDate: string;
    taskCreatorName: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    progress: "PENDING" | "IN_PROGRESS" | "COMPLETED";
};

const getColorByPriority = (priority: string) => {
    switch (priority) {
        case "HIGH":
            return "border-l-red-500";
        case "MEDIUM":
            return "border-l-yellow-400";
        case "LOW":
            return "border-l-green-400";
        default:
            return "border-l-gray-300";
    }
};

export function TaskCard({ task }: { task: Task }) {
    return (
        <div
            className={`flex flex-col gap-2 p-4 border rounded-lg shadow-md bg-white ${getColorByPriority(
                task.priority
            )} border-l-4 transition hover:shadow-lg`}
        >
            <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{task.name}</h2>
                <span
                    className={`text-xs px-2 py-0.5 rounded-full ${task.progress === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : task.progress === "IN_PROGRESS"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {task.progress}
                </span>
            </div>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="text-xs text-gray-500">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <br />
                <span>Assigned by: {task.taskCreatorName}</span>
                <br />
                <span className="italic text-gray-400">Priority: {task.priority}</span>
            </div>
        </div>
    );
}
