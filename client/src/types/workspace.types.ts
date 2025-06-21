import { User } from "./auth.types";
import { Member } from "./member.types";
// import { Task } from "./task.types";

export type WorkspaceFormData = {
  name: string;
};
export interface Task {
  id: string;
  name: string;
  description: string;
  priority: "LOW" | "HIGH" | "MEDIUM";
  completed: boolean;
  workspaceId: string;
  workspaceName: string;
  taskCreatorId: string;
  taskCreatorName: string;
  taskCreatorEmail: string;
  startDate: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    TaskTodoCheckList: number;
    TaskAssignment: number;
  };
}

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
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberAvatar: string;
};
export type ExistingMemberResponse = {
  message: string;
  data: ExistingMember[];
};
