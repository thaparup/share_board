import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateMember, createMemberSchema } from "../schema/member.schema";

const prisma = new PrismaClient();

export async function stats(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tasks = await prisma.task.findMany({
      where: { taskCreatorId: userId },
    });

    const completed = tasks.filter((task) => task.completed).length;
    const currentDate = new Date();
    const pending = tasks.filter((task) => task.startDate > currentDate).length;
    const overdue = tasks.filter((task) => currentDate > task.dueDate).length;
    const highPriority = tasks.filter(
      (task) => task.priority === "HIGH"
    ).length;

    const assignedTaskIds = await prisma.taskAssignment.findMany({
      where: { assignedUserId: userId },
      select: { taskId: true },
    });
    const taskIds = assignedTaskIds.map((task) => task.taskId);
    const assignedTasks = await prisma.task.findMany({
      where: { id: { in: taskIds } },
    });

    const workspaces = await prisma.workspace.findMany({
      where: { workspaceCreatorId: userId },
      include: {
        tasks: {
          select: { completed: true },
        },
        workspaceMember: {
          select: {
            memberName: true,
            memberAvatarImage: true,
          },
        },
        _count: {
          select: {
            tasks: true,
            workspaceMember: true,
          },
        },
      },
    });
    const nearestDueTasks = tasks
      .filter(
        (task) => task.dueDate && !task.completed && task.dueDate > currentDate
      )
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
      .slice(0, 3);

    const upcomingDeadlines = nearestDueTasks.map((task) => ({
      id: task.id,
      name: task.name,
      priority: task.priority,
      dueDate: task.dueDate,
    }));

    const workspaceStats = workspaces.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
      totalTasks: workspace._count.tasks,
      completedTasks: workspace.tasks.filter((task) => task.completed).length,
      totalMembers: workspace._count.workspaceMember,
      members: workspace.workspaceMember,
    }));
    console.log(workspaces);
    res.status(200).json({
      message: "Dashboard stats",
      data: {
        mytasks: {
          total: tasks.length,
          completed: completed,
          pending: pending,
          overdue: overdue,
          highPriority: highPriority,
        },
        assignedTasks: assignedTasks,
        workspaces: workspaceStats,
        upcomingDeadlines: upcomingDeadlines,
      },
    });
  } catch (error) {}
}
