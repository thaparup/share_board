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
import { WorkspaceFormData } from "../types/workspace.types";
import { Plus } from "lucide-react";
import { useQueryFetchAllUsers } from "../Api-Client/auth";

type Props = {}

const WorkspaceMemberModal = (props: Props) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm<WorkspaceFormData>();
    const { data: users } = useQueryFetchAllUsers();
    console.log('users', users)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md flex items-center text-sm"
            // disabled={createWorkspaceMutation.isPending}
            >
                <Plus size={16} className="mr-1" />
                Add Member

            </DialogTrigger>
            <DialogContent className="bg-black">
                <DialogHeader className="py-8">
                    <DialogTitle className="font-medium text-md">
                        Please search the user that you want to add to your cool workspace.
                    </DialogTitle>
                    <DialogDescription className="mt-2">
                        <form >

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
    )
}

export default WorkspaceMemberModal