export interface Task {
  id: string;
  name: string;
  description: string;
  priority: "LOW" | "HIGH" | "MEDIUM";
  progress: "IN_PROGRESS" | "PENDING" | "COMPLETED";
  totalMembers: number;
  workspaceId: string;
  taskCreatorId: string;
  taskCreatorName: string;
  taskCreatorEmail: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export type AssignedUser = {
  id: string;
  taskId: string;
  assignedUserId: string;
  assignedUserName: string;
  assignedUserEmail: string;
  assignedAt: Date;
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
