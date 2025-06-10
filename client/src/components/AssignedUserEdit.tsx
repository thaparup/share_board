import React, { useEffect } from 'react';
import { Search, UserPlus, X, Check } from 'lucide-react';
import { FieldArrayWithId } from 'react-hook-form';


type Props = {
    fields: FieldArrayWithId<CreateTaskFormData, "assignedTo", "memberId">[];
    append: (user: Member) => void;
    remove: (index: number) => void;
    errors?: any
    workspaceId: string
    isAssigned: boolean,
    setIsAssigned: React.Dispatch<React.SetStateAction<boolean>>
};

import { CreateTaskFormData } from '../types/task.types';
import { useQueryFetchExsitingMemberOnTheWorkspace } from '../Api-Client/member';
import { Member } from '../types/member.types';




const AssignedUserEdit = ({ fields, append, remove, errors, workspaceId, isAssigned, setIsAssigned }: Props) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const { data: users, isLoading } = useQueryFetchExsitingMemberOnTheWorkspace(`${workspaceId}`);
    console.log(users?.data)

    const filteredUsers =
        (users?.data as Member[])?.filter((user) => {
            const name = user.memberName?.toLowerCase() || '';
            const email = user.memberEmail?.toLowerCase() || '';
            const query = searchQuery.toLowerCase();

            return name.includes(query) || email.includes(query);
        }) || [];

    const isUserSelected = (userEmail: string) => {
        return fields.some((user) => user.memberEmail === userEmail);
    };

    const toggleUserSelection = (user: Member) => {
        const index = fields.findIndex((u) => u.memberEmail === user.memberEmail);
        if (index !== -1) {
            remove(index);
        } else {
            append(user);
        }


    };

    const removeSelectedUser = (userId: string) => {
        const index = fields.findIndex((user) => user.memberId === userId);
        if (index !== -1) {
            remove(index);
        }
    };
    console.log('fileds', fields)
    return (

        <div>

            {fields.length > 0 && (
                <div className="mb-6 text-white">
                    <h4 className="text-lg font-semibold text-white mb-2">Assigned Users</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {fields.map((user) => (
                            <div
                                key={user.memberId}
                                className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    {user.memberAvatarImage ? (
                                        <img
                                            src={user.memberAvatarImage}
                                            alt={user.memberName}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                                            {user.memberName?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="text-white">
                                        <p className="font-medium">{user.memberName}</p>
                                        <p className="text-sm text-gray-400">{user.memberEmail}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeSelectedUser(user.memberId)}
                                    className="text-red-400 hover:text-red-600 transition"
                                    title="Remove"
                                >
                                    <X />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            <div className="px-8 py-12 bg-gray-900 border-gray-800 w-full mt-12 rounded-md">
                {isAssigned && (
                    <p className="text-sm text-red-500 mt-1">At least one user  must be there</p>
                )}
                <h6 className="text-2xl font-semibold text-white">
                    Assign Task To Workspace Members
                </h6>
                <h6 className="text-gray-400 text-lg">
                    Search and select users to add to your task.
                </h6>

                <div className="relative mt-12">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search users by name or email..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                {errors?.assignedTo && (
                    <p className="text-sm text-red-500 mt-1">{errors.assignedTo.message}</p>
                )}

                {fields.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Selected Users</h4>
                        <div className="flex flex-wrap gap-2">
                            {fields.map((user) => (
                                <div key={user.memberId} className="flex items-center bg-gray-800 rounded-full pl-2 pr-1 py-1">
                                    {user.memberAvatarImage ? (
                                        <img src={user.memberAvatarImage} alt={user.memberName} className="w-5 h-5 rounded-full mr-1" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center mr-1">
                                            <span className="text-white text-xs font-bold">
                                                {user.memberName.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <span className="text-sm text-white mr-1">{user.memberName}</span>
                                    <button
                                        onClick={() => removeSelectedUser(user.memberId)}
                                        className="text-gray-400 hover:text-white p-1 rounded-full"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
                            {filteredUsers.map((member) => (
                                <div
                                    key={member.memberId}
                                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${isUserSelected(member.memberId)
                                        ? 'bg-indigo-900/30'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                    onClick={() => toggleUserSelection(member)}
                                >
                                    <div className="flex items-center">
                                        {member.memberAvatarImage ? (
                                            <img
                                                src={member.memberAvatarImage}
                                                alt={member.memberName}
                                                className="w-8 h-8 rounded-full mr-3"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                                                <span className="text-white font-medium text-sm">
                                                    {member.memberName.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-white font-medium">{member.memberName}</p>
                                            <p className="text-gray-400 text-sm">{member.memberEmail}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center ${isUserSelected(member.memberEmail)
                                            ? 'bg-indigo-600 text-white'
                                            : 'border border-gray-600'
                                            }`}
                                    >
                                        {isUserSelected(member.memberEmail) && <Check size={14} />}
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
            </div>
        </div>
    );
};

export default AssignedUserEdit;
