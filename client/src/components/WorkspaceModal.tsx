import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { useMutationCreateWorkspace } from '../Api-Client/workspace'
import { useForm, SubmitHandler } from 'react-hook-form'
import { WorkspaceFormData } from '../types/workspace.types'
import toast from 'react-hot-toast'

const WorkspaceModal = () => {
    const createWorkspaceMutation = useMutationCreateWorkspace()
    const { register, handleSubmit } = useForm<WorkspaceFormData>()

    const onClickMutate: SubmitHandler<WorkspaceFormData> = async (data) => {
        createWorkspaceMutation.mutate(data, {
            onSuccess: () => {
                toast.success('Workspace created!')
            },
        })
    }

    return (
        <Dialog>
            <DialogTrigger
                className='max-w-fit bg-amber-600 px-12 py-2 rounded-md font-medium'
                disabled={createWorkspaceMutation.isPending}
            >
                Create Workspace
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-semibold'>
                        Build the workspace where ideas come alive...
                    </DialogTitle>
                    <DialogDescription className='mt-2'>
                        <form onSubmit={handleSubmit(onClickMutate)}>
                            <input
                                type='text'
                                placeholder='Give Your Workspace A Name'
                                className='outline-none ring-1 ring-amber-600/80 rounded-xs p-2 w-full px placeholder:italic'
                                {...register('name')}
                            />
                            <div className='flex justify-center mt-4'>
                                <Button
                                    type='submit'
                                    className='px-8 text-md'
                                    disabled={createWorkspaceMutation.isPending}
                                >
                                    {createWorkspaceMutation.isPending ? 'Creating...' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default WorkspaceModal
