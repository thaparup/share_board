import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateMember, createMemberSchema } from "../schema/member.schema";

const prisma = new PrismaClient();

export const addMember = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId! },
    });

    if (!workspace) {
      res.status(400).json({ message: "no workspace found" });
      return;
    }

    const convertUserToMember: CreateMember = [];

    req.body.map(
      (member: {
        id: string;
        name: string;
        email: string;
        avatarImage?: string;
      }) => {
        convertUserToMember.push({
          memberId: member.id,
          memberName: member.name,
          memberEmail: member.email,
          memberAvatarImage: member.avatarImage || "",
          role: "MEMBER",
        });
      }
    );

    const parsed = createMemberSchema.safeParse(convertUserToMember);

    if (!parsed.success) {
      res.status(400).json({
        message: "Make sure required fields are not empty",
        errors: parsed.error.errors,
      });
      return;
    }
    const membersData = await prisma.workspaceMember.createMany({
      data: parsed.data.map((member) => ({
        ...member,
        workspaceId: workspace.id,
      })),
    });

    res.status(201).json({ message: "Members added successfully" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const existingMemberOnTheWorkspace = async (
  req: Request,
  res: Response
) => {
  try {
    const { workspaceId } = req.params;
    const existingMembers = await prisma.workspaceMember.findMany({
      where: { workspaceId: workspaceId },
      select: {
        memberId: true,
      },
    });

    res.status(200).json({
      message: "Existing members on the workspace",
      data: existingMembers,
    });
    return;
  } catch (error) {}
};
