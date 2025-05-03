import React from 'react'
import { Task } from '../types/task.types'
import { Button } from './ui/button'

import TaskCards from './TaskCards'
import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import CreateTaskModal from './CreateTaskModal'

type Props = {
    tasks: Task[],
    workspaceId: string
}

const WorkspaceTask = ({ tasks, workspaceId }: Props) => {
    return (
        <div className='mt-12'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Tasks</h2>
                {/* <Button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md mr-8 flex items-center text-sm"

                >
                    <Plus size={16} className="mr-1" />
                    Add Task
                </Button> */}


                <CreateTaskModal />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {tasks.map((task) => (
                    <TaskCards key={task.id} task={task} workspaceId={workspaceId} />
                ))}

                {tasks?.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-gray-800 rounded-lg">
                        <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-white">No tasks</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task for this workspace.</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default WorkspaceTask