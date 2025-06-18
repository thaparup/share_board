import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus, X, Search, UserPlus, Check } from "lucide-react";
import { useQueryFetchAllUsers } from "../Api-Client/auth";
import { useMutationAddMember, useQueryFetchExsitingMemberOnTheWorkspace } from "../Api-Client/member";
import toast from "react-hot-toast";
import { User } from "../types/auth.types";


interface WorkspaceMemberModalProps {
    workspaceId: string;
    members: User[]
}

const WorkspaceMemberModal = ({ workspaceId, members }: WorkspaceMemberModalProps) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    // const { register, handleSubmit, reset } = useForm();
    const { data: usersData, isLoading } = useQueryFetchAllUsers();
    const addMembersMutation = useMutationAddMember(workspaceId);

    const fetchingExistingMember = useQueryFetchExsitingMemberOnTheWorkspace(workspaceId);



    const users = usersData?.data || []; // No need to filter anymore since server does it

    const filteredUsers = users?.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const isUserSelected = (userId: string) => {
        return selectedUsers.some(user => user.id === userId);
    };

    const toggleUserSelection = (user: User) => {
        if (isUserSelected(user.id)) {
            setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const removeSelectedUser = (userId: string) => {
        setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
    };

    const onSubmit = () => {


        addMembersMutation.mutate(
            { workspaceId: workspaceId, formData: selectedUsers },
            {
                onSuccess: (data) => {
                    setSelectedUsers([]);
                    setSearchQuery("");
                    setOpen(false);
                    if (data.message === 'One or more users are already members of this workspace.') {
                        toast.error(data.message)
                    }
                    else
                        toast.success(data.message);
                },
                onError: (error) => {
                    toast.error('Failed to add members to workspace');
                    console.error('Error adding members:', error);
                }
            }
        );
    };

    useEffect(() => {
        if (!open) {
            setSelectedUsers([]);
            setSearchQuery("");
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md flex items-center text-sm"
                disabled={addMembersMutation.isPending}
            >
                <Plus size={16} className="mr-1" />
                Add Member
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 max-w-md">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-semibold text-white">
                        Add Members to Workspace
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Search and select users to add to your workspace.
                    </DialogDescription>
                </DialogHeader>

                {/* Search Input */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users by name or email..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                {/* Selected Users */}
                {selectedUsers.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Selected Users</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedUsers.map(user => (
                                <div key={user.id} className="flex items-center bg-gray-800 rounded-full pl-2 pr-1 py-1">
                                    {user.avatarImage ? (
                                        <img
                                            src={user.avatarImage}
                                            alt={user.name}
                                            className="w-5 h-5 rounded-full mr-1"
                                        />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center mr-1">
                                            <span className="text-white text-xs font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <span className="text-sm text-white mr-1">{user.name}</span>
                                    <button
                                        onClick={() => removeSelectedUser(user.id)}
                                        className="text-gray-400 hover:text-white p-1 rounded-full"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search Results */}
                <div className="overflow-y-auto max-h-60 mb-4">
                    {isLoading ? (
                        <div className="flex justify-center py-4">
                            <div className="animate-pulse text-gray-400">Loading users...</div>
                        </div>
                    ) : searchQuery && filteredUsers.length === 0 ? (
                        <div className="text-center py-4 text-gray-400">
                            No users found matching "{searchQuery}"
                        </div>
                    ) : searchQuery ? (
                        <div className="space-y-2">
                            {filteredUsers.map(user => (
                                <div
                                    key={user.id}
                                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${isUserSelected(user.id) ? 'bg-indigo-900/30' : 'bg-gray-800 hover:bg-gray-700 '
                                        }`}
                                    onClick={() => toggleUserSelection(user)}
                                >
                                    <div className="flex items-center ">
                                        {user.avatarImage ? (
                                            <img
                                                src={user.avatarImage}
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                                                <span className="text-white font-medium text-sm">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-white font-medium">{user.name}</p>
                                            <p className="text-gray-400 text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isUserSelected(user.id)
                                        ? 'bg-indigo-600 text-white'
                                        : 'border border-gray-600'
                                        }`}>
                                        {isUserSelected(user.id) && <Check size={14} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 text-gray-400">
                            <UserPlus size={32} className="mx-auto mb-2 opacity-50" />
                            <p>Start typing to search for users</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={selectedUsers.length === 0 || addMembersMutation.isPending}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        {addMembersMutation.isPending
                            ? "Adding..."
                            : `Add ${selectedUsers.length} ${selectedUsers.length === 1 ? 'Member' : 'Members'}`
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WorkspaceMemberModal;