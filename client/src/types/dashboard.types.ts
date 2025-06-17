import { Task } from "./task.types";

type Workspace = {
  id: string;
  name: string;
  totalTasks: number;
  completedTasks: number;
  totalMembers: number;
  members: {
    memberName: string;
    memberAvatarImage: string;
  }[];
};

type UpcomingDeadline = {
  id: string;
  name: string;
  priority: "HIGH" | "LOW" | "MEDIUM";
  dueDate: string;
};
export type DashboardResponse = {
  message: string;
  data: {
    mytasks: {
      total: number;
      completed: number;
      pending: number;
      overdue: number;
      highPriority: number;
    };
    assignedTasks: Task[];
    workspaces: Workspace[];
    upcomingDeadlines: UpcomingDeadline[];
  };
};
