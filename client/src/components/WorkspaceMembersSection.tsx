import { Users, Plus, Search } from 'lucide-react';
import WorkspaceMemberModal from './WorkspaceMemberModal';

// This component should be added to your workspace page
const WorkspaceMembersSection = ({
    members = [],
    totalMembers = 0,
    onAddMemberClick
}) => {
    return (
        <div className="mb-8 bg-gray-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <Users size={20} className="text-indigo-400 mr-2" />
                    <h2 className="text-xl font-semibold text-white">Workspace Members ({totalMembers})</h2>
                </div>
                {/* <button
                    onClick={onAddMemberClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md flex items-center text-sm"
                >
                    <Plus size={16} className="mr-1" />
                    Add Member
                </button> */}

                <WorkspaceMemberModal />
            </div>

            {members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {members.map(member => (
                        <div key={member.id} className="flex items-center p-3 bg-gray-800 rounded-lg">
                            {member.avatarUrl ? (
                                <img
                                    src={member.avatarUrl}
                                    alt={member.name}
                                    className="w-8 h-8 rounded-full mr-3"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                                    <span className="text-white font-medium text-sm">
                                        {member.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="text-white font-medium">{member.name}</p>
                                <p className="text-white/60 text-sm">{member.email}</p>
                            </div>
                            <span className="px-2 py-1 text-xs bg-gray-700 text-white/80 rounded">
                                {member.role}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-800 rounded-lg">
                    <Users className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-sm font-medium text-white">No members</h3>
                    <p className="mt-1 text-sm text-gray-400">Get started by adding members to this workspace.</p>
                </div>
            )}
        </div>
    );
};

export default WorkspaceMembersSection;