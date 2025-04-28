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
        workspaceCreatorName: user.name,
        workspaceCreator: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    await prisma.workspaceMember.create({
      data: {
        role: "ADMIN",
        memberName: user.name,
        memberEmail: user.email,
        memberAvatarImage: user.avatarImage,
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
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const usersAllWorkspace = await prisma.workspaceMember.findMany({
      where: { memberId: userId },
      select: { workspaceId: true, role: true },
    });

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

    res.status(200).json({
      message: "Workspaces fetched",
      data: {
        workspaceWhereUserIsAdmin: adminWorkspaceDetails,
        workspaceWhereUserIsPartOf: memberWorkspaceDetails,
      },
    });
    return;
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getWorkspaceById = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId! },
    });

    if (!workspace) {
      res.status(400).json({ message: "no workspace found" });
      return;
    }

    const members = await prisma.workspaceMember.findMany({
      where: { workspaceId: workspace.id },
      select: {
        id: true,
        memberId: true,
        memberName: true,
        memberEmail: true,
        memberAvatarImage: true,
        role: true,
      },
    });

    const tasks = await prisma.task.findMany({
      where: {
        workspaceId: workspaceId,
      },
    });

    const assignedUsers = await Promise.all(
      tasks.map(async ({ id }) => {
        const count = await prisma.taskAssignment.count({
          where: {
            taskId: id,
          },
        });

        return { id, count };
      })
    );

    const tasksInDetail = tasks.flatMap((task) => {
      const matchedUsers = assignedUsers.filter((user) => user.id === task.id);
      return matchedUsers.map((user) => ({
        ...task,
        totalMembers: user.count,
      }));
    });

    const formattedMembers = members.map((member) => ({
      id: member.id,
      memberId: member.memberId,
      name: member.memberName,
      email: member.memberEmail,
      avatarImage: member.memberAvatarImage,
      role: member.role,
    }));
    res.status(200).json({
      message: "Workspace fetched",
      data: {
        workspace: workspace,
        tasks: tasksInDetail,
        members: formattedMembers,
      },
    });
    return;
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
