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

import { useForm, SubmitHandler } from "react-hook-form";

;
import { CreateTaskFormData } from "../types/task.types";

const CreateTaskModal = () => {
    // const createTaskMutation = useCreateTaskMutation();
    const { register, handleSubmit, reset } = useForm<CreateTaskFormData>();
    const [open, setOpen] = useState(false);



    const onClickMutate: SubmitHandler<CreateTaskFormData> = async (data) => {
        // createTaskMutation.mutate(data, {
        //     onSuccess: () => {
        //         toast.success("Workspace created!");
        //         console.log(data)
        //     },
        //     onError: (error) => {
        //         toast.error("Failed to create workspace: " + error.message);
        //     },
        // });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="max-w-fit bg-amber-600 px-12 py-2 rounded-md font-medium hover:cursor-pointer"
            // disabled={createTaskMutation.isPending}
            >
                Create Task
            </DialogTrigger>
            <DialogContent className="bg-black">
                <DialogHeader className="py-8">
                    <DialogTitle className="font-semibold">
                        Create your task
                    </DialogTitle>
                    <DialogDescription className="mt-2">
                        <form onSubmit={handleSubmit(onClickMutate)}>

                            <div className="flex justify-center mt-4">
                                <Button
                                    type="submit"
                                    className="px-8 text-md hover:cursor-pointer"
                                // disabled={createTaskMutation.isPending}
                                >
                                    {/* {createTaskMutation.isPending ? "Creating..." : "Create"} */}
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTaskModal;
