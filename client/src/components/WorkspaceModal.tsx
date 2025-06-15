import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
    useMutationCreateWorkspace,
    useQueryAllWorkspace,
} from "../Api-Client/workspace";
import { useForm, SubmitHandler } from "react-hook-form";
import { WorkspaceFormData } from "../types/workspace.types";
import toast from "react-hot-toast";
import { queryClient } from "../main";

const WorkspaceModal = () => {
    const createWorkspaceMutation = useMutationCreateWorkspace();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<WorkspaceFormData>();
    const [open, setOpen] = useState(false);

    const workspacesQuery = useQueryAllWorkspace();

    const onClickMutate: SubmitHandler<WorkspaceFormData> = async (data) => {
        createWorkspaceMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Workspace created!");
                queryClient.invalidateQueries({ queryKey: ["workspaces"] });

                workspacesQuery.refetch();

                reset();

                setOpen(false);
            },
            onError: (error) => {
                toast.error("Failed to create workspace: " + error.message);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="max-w-fit bg-amber-600 px-12 py-2 rounded-md font-medium hover:cursor-pointer"
                disabled={createWorkspaceMutation.isPending}
            >
                Create Workspace
            </DialogTrigger>
            <DialogContent className="bg-black border-amber-500/50">
                <DialogHeader className="py-8">
                    <DialogTitle className="font-semibold">
                        Build the workspace where ideas come alive...
                    </DialogTitle>
                    <form className="mt-2" onSubmit={handleSubmit(onClickMutate)}>
                        <input
                            type="text"
                            placeholder="Give Your Workspace A Name"
                            className="outline-none ring-1 ring-amber-600/80 rounded-xs p-2 w-full px placeholder:italic"
                            {...register("name", { required: "Workspace name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-sm py-2">{errors.name.message}</p>}

                        <div className="flex justify-center mt-4">
                            <Button
                                type="submit"
                                className="px-8 text-md hover:cursor-pointer"
                                disabled={createWorkspaceMutation.isPending}
                            >
                                {createWorkspaceMutation.isPending ? "Creating..." : "Create"}
                            </Button>
                        </div>
                    </form>
                    {/* </DialogDescription> */}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default WorkspaceModal;
