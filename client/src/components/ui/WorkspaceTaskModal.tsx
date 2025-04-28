import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./../ui/dialog";
import { Button } from "./../ui/button";
import { useForm } from "react-hook-form";

const WorkspaceModal = () => {

    const { register, handleSubmit, reset } = useForm<WorkspaceFormData>();
    const [open, setOpen] = useState(false);



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="max-w-fit bg-amber-600 px-12 py-2 rounded-md font-medium hover:cursor-pointer"
            // disabled={createWorkspaceMutation.isPending}
            >
                Create Workspace
            </DialogTrigger>
            <DialogContent className="bg-black">
                <DialogHeader className="py-8">
                    <DialogTitle className="font-semibold">
                        Build the workspace where ideas come alive...
                    </DialogTitle>
                    <DialogDescription className="mt-2">
                        <form >
                            <input
                                type="text"
                                placeholder="Give Your Workspace A Name"
                                className="outline-none ring-1 ring-amber-600/80 rounded-xs p-2 w-full px placeholder:italic"
                                {...register("name", { required: true })}
                            />
                            <div className="flex justify-center mt-4">
                                <Button
                                    type="submit"
                                    className="px-8 text-md hover:cursor-pointer"
                                // disabled={createWorkspaceMutation.isPending}
                                >
                                    {/* {createWorkspaceMutation.isPending ? "Creating..." : "Create"} */}
                                    Create
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default WorkspaceModal;
