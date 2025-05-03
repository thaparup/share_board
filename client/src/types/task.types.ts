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

type Checklist = {
  name: string;
  checked: boolean;
};

type AssignedTo = {
  id: string;
  name: string;
  email: string;
  avatarImage: string;
};
export type CreateTaskFormData = {
  id: string;
  name: string;
  description: string;
  priority: "LOW" | "HIGH" | "MEDIUM";
  progress: "IN_PROGRESS" | "PENDING" | "COMPLETED" | "OVERDUE";
  checklist: Checklist[];
  assignedTo: AssignedTo[];
  dueDate: string;
  startedDate: string;
};

export type TasksWhereUserIsAdmin = {
  message: string;
  data: {
    workspaceId: string;
    tasks: Task[];
  };
};
export type taskGroup = {
  workspaceId: string;
  tasks: Task[];
};
