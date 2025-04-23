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

  try {
    const workspaceMemberships = await prisma.workspaceMember.findMany({
      where: { memberId: userId },
      select: { workspaceId: true },
    });
    const workspaceIds = workspaceMemberships.map((wm) => wm.workspaceId);

    if (workspaceIds.length === 0) {
      res.status(200).json({ message: "No workspaces found", data: [] });
      return;
    }
    const workspaces = await prisma.workspace.findMany({
      where: { id: { in: workspaceIds } },
    });

    res.status(200).json({ message: "Workspaces fetched", data: workspaces });
    return;
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
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
