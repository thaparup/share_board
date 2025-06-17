import React from 'react'

type Props = {
    title: string
    stats: number
    icon: React.ReactNode
    statsCss: string,
    iconContainerColor: string
}

const TaskStatsCard = ({ title, stats, statsCss, icon, iconContainerColor }: Props) => {
    return (
        <div className="bg-gray-200 p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className={`text-2xl font-bold ${statsCss}`}>{stats}</p>
                </div>
                <div className={`p-3 rounded-full ${iconContainerColor}`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default TaskStatsCard
