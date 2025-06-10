export interface Task {
  id: string;
  name: string;
  description: string;
  priority: "LOW" | "HIGH" | "MEDIUM";
  totalMembers: number;
  completed: boolean;
  workspaceId: string;
  workspaceName: string;
  taskCreatorId: string;
  taskCreatorName: string;
  taskCreatorEmail: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export type AssignedUser = {
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberAvatarImage?: string;
};
export type TaskTodo = {
  name: string;
  id: string;
  taskId: string | null;
  workspaceId: string;
  checked: boolean;
};
export type GetTaskByIdResponse = {
  message: string;
  data: {
    task: Task;
    assignedUser: AssignedUser[];
    taskTodo: TaskTodo[];
  };
};

type Checklist = {
  name: string;
  checked: boolean;
};

type AssignedTo = {
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberAvatar?: string;
};
export type CreateTaskFormData = {
  id: string;
  name: string;
  description: string;
  priority: "LOW" | "HIGH" | "MEDIUM";
  checklist: Checklist[];
  assignedTo?: AssignedTo[];
  dueDate: string;
  startDate: string;
};

export type taskGroup = {
  workspaceId: string;
  tasks: Task[];
};
export type Task = {
  id: string;
  name: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  completed: boolean;
  workspaceId: string;
  workspaceName: string;
  taskCreatorId: string;
  taskCreatorName: string;
  taskCreatorEmail: string;
  dueDate: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceWithTasks = {
  workspace: string;
  tasks: {
    id: string;
    name: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    completed: boolean;
    workspaceId: string;
    workspaceName: string;
    taskCreatorId: string;
    taskCreatorName: string;
    taskCreatorEmail: string;
    dueDate: string;
    startDate: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
export type TaskManagementData = {
  taskWhereUserIsAdmin: WorkspaceWithTasks[];
  taskWhereUserIsNotAdmin: WorkspaceWithTasks[];
};

export type TasksWhereUserIsAdmin = {
  message: string;
  data: {
    taskWhereUserIsAdmin: WorkspaceWithTasks[];
    taskWhereUserIsNotAdmin: WorkspaceWithTasks[];
  };
};
