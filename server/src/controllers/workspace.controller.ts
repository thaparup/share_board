import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const createWorkspace = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    res.status(400).json({ message: "Unauthorized request" });
    return;
  }

  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "name is empty" });
    return;
  }

  try {
    const newWorkspace = await prisma.workspace.create({
      data: {
        name,
        workspaceCreator: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    console.log(newWorkspace);
    await prisma.workspaceMember.create({
      data: {
        role: "ADMIN",
        workspace: {
          connect: {
            id: newWorkspace.id,
          },
        },
        member: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.status(200).json({
      message: "Workspace created",
      workspace: newWorkspace,
    });
    return;
  } catch (error) {
    console.error("Error creating workspace:", error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
};

export const getAllWorkspace = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const usersAllWorkspace = await prisma.workspaceMember.findMany({
      where: { memberId: userId },
      select: { workspaceId: true, role: true },
    });

    if (usersAllWorkspace.length === 0) {
      return res.status(200).json({ message: "No workspaces found", data: [] });
    }

    const adminWorkspaceIds = usersAllWorkspace
      .filter((w) => w.role === "ADMIN")
      .map((w) => w.workspaceId);

    const memberWorkspaceIds = usersAllWorkspace
      .filter((w) => w.role !== "ADMIN")
      .map((w) => w.workspaceId);

    const adminWorkspaces = await prisma.workspace.findMany({
      where: { id: { in: adminWorkspaceIds } },
    });

    const memberWorkspaces = await prisma.workspace.findMany({
      where: { id: { in: memberWorkspaceIds } },
    });

    const tasks = await prisma.task.findMany({
      where: {
        workspaceId: { in: [...adminWorkspaceIds, ...memberWorkspaceIds] },
      },
      select: {
        workspaceId: true,
        progress: true,
      },
    });

    const members = await prisma.workspaceMember.findMany({
      where: {
        workspaceId: { in: [...adminWorkspaceIds, ...memberWorkspaceIds] },
      },
      select: {
        workspaceId: true,
      },
    });

    const taskMap: Record<string, number> = {};
    tasks.forEach(({ workspaceId, progress }) => {
      taskMap[workspaceId] = (taskMap[workspaceId] || 0) + 1;
    });

    const completedTaskForWorkspace: Record<string, number> = {};

    tasks.forEach(({ workspaceId, progress }) => {
      if (progress === "COMPLETED") {
        completedTaskForWorkspace[workspaceId] =
          (completedTaskForWorkspace[workspaceId] || 0) + 1;
      }
    });

    const memberMap: Record<string, number> = {};
    members.forEach(({ workspaceId }) => {
      memberMap[workspaceId] = (memberMap[workspaceId] || 0) + 1;
    });

    const adminWorkspaceDetails = adminWorkspaces.map((ws) => ({
      ...ws,
      totalTasks: taskMap[ws.id] || 0,
      totalMembers: memberMap[ws.id] || 0,
      taskCompleted: completedTaskForWorkspace[ws.id] || 0,
    }));

    const memberWorkspaceDetails = memberWorkspaces.map((ws) => ({
      ...ws,
      totalTasks: taskMap[ws.id] || 0,
      totalMembers: memberMap[ws.id] || 0,
      taskCompleted: completedTaskForWorkspace[ws.id] || 0,
    }));

    return res.status(200).json({
      message: "Workspaces fetched",
      data: {
        workspaceWhereUserIsAdmin: adminWorkspaceDetails,
        workspaceWhereUserIsPartOf: memberWorkspaceDetails,
      },
    });
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getWorkspaceById = async (req: Request, res: Response) => {
  try {
    const workspaceId = req.params;
    console.log(workspaceId);
    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId.id },
    });

    if (!workspace) {
      res.status(400).json({ message: "no workspace found" });
      return;
    }
    res
      .status(200)
      .json({ message: "The workspace are working on", data: workspace });
    return;
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
