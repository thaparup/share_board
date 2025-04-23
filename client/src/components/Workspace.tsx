import React from "react";

type WorkspaceCardProps = {
    name: string;
    creatorName: string;
    createdAt: string;
    totalTasks: number;
    completedTasks: number;
    memberCount: number;
};

const WorkspaceCard = ({
    name,
    creatorName,
    createdAt,
    totalTasks,
    completedTasks,
    memberCount,
}: WorkspaceCardProps) => {
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="p-4 rounded-2xl shadow-md bg-white w-full max-w-sm">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">Created by {creatorName}</p>
            <p className="text-sm text-gray-400 mb-2">Created on {new Date(createdAt).toLocaleDateString()}</p>

            <div className="mb-3">
                <p className="text-sm font-medium">
                    Tasks: {completedTasks}/{totalTasks} ({progress}%)
                </p>
                <div className="h-2 bg-gray-200 rounded">
                    <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <p className="text-sm text-gray-500">Members: {memberCount}</p>
        </div>
    );
};

export default WorkspaceCard;
