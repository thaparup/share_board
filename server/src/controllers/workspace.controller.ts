import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const createWorkspace = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, workspacecreatorid } = req.body;

  try {
    const newWorkspace = await prisma.workspace.create({
      data: {
        name,
        workspacecreator: {
          connect: { id: workspacecreatorid },
        },
      },
    });

    // Optional: Add the creator as a workspace member too
    await prisma.workspaceMember.create({
      data: {
        workspace: { connect: { id: newWorkspace.id } },
        member: { connect: { id: workspacecreatorid } },
        role: "ADMIN", // or MEMBER if you prefer
      },
    });

    return res.status(201).json({
      message: "Workspace created",
      workspace: newWorkspace,
    });
  } catch (error) {
    console.error("Error creating workspace:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
