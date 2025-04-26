export interface Task {
  id: string;
  name: string;
  description: string;
  priority: string;
  progress: string;
  totalMembers: number;
  workspaceId: string;
  taskCreatorId: string;
  taskCreatorName: string;
  taskCreatorEmail: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
