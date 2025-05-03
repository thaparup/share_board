import { User } from "./auth.types";
import { Member } from "./member.types";
import { Task } from "./task.types";

export type WorkspaceFormData = {
  name: string;
};

export type Workspace = {
  totalTasks?: number;
  totalMembers?: number;
  taskCompleted?: number;
  id: string;
  name: string;
  workspaceCreatorId: string;
  workspaceCreatorName: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkspacesResponse = {
  message: string;
  data: {
    workspaceWhereUserIsAdmin: Workspace[];
    workspaceWhereUserIsPartOf: Workspace[];
  };
};
export type WorkspaceById = {
  message: string;
  data: {
    workspace: {
      id: string;
      name: string;
      workspaceCreatorId: string;
      workspaceCreatorName: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
    tasks: Task[];
    members: User[];
  };
};

type ExistingMember = {
  id: string;
  name: string;
  email: string;
  avatarImage: string;
};
export type ExistingMemberResponse = {
  message: string;
  data: ExistingMember[];
};
