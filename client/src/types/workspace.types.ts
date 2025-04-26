import { Task } from "./task.types";

export type WorkspaceFormData = {
  name: string;
};

export type Workspaces = {
  totalTasks: number;
  totalMembers: number;
  taskCompleted: number;
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
    workspaceWhereUserIsAdmin: Workspaces[];
    workspaceWhereUserIsPartOf: Workspaces[];
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
    totalMembers: number;
  };
};
