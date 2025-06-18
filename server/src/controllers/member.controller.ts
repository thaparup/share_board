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
      res.status(400).json({ message: "No workspace found" });
      return;
    }

    const existingMembers = await prisma.workspaceMember.findMany({
      where: { workspaceId: workspace.id },
      select: { memberId: true },
    });

    const existingMemberIds = new Set(existingMembers.map((m) => m.memberId));

    const alreadyExisting = req.body.filter((user: any) =>
      existingMemberIds.has(user.id)
    );

    if (alreadyExisting.length > 0) {
      res.status(200).json({
        message: "One or more users are already members of this workspace.",
      });
      return;
    }

    const convertUserToMember: CreateMember[] = req.body.map((user: any) => ({
      memberId: user.id,
      memberName: user.name,
      memberEmail: user.email,
      memberAvatarImage: user.avatarImage || "",
      role: "MEMBER",
    }));

    const parsed = createMemberSchema.safeParse(convertUserToMember);

    if (!parsed.success) {
      res.status(400).json({
        message: "Validation failed. Ensure required fields are provided.",
        errors: parsed.error.errors,
      });
      return;
    }

    await prisma.workspaceMember.createMany({
      data: parsed.data.map((member) => ({
        ...member,
        workspaceId: workspace.id,
      })),
    });

    res.status(201).json({ message: "Members added successfully." });
    return;
  } catch (error) {
    console.error("addMember error:", error);
    res.status(500).json({ message: "Something went wrong" });
    return;
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
        memberAvatarImage: true,
        memberEmail: true,
        memberName: true,
      },
    });

    const members: {
      id: string;
      email: string;
      avatarImage: string;
      name: string;
    }[] = [];
    existingMembers.map((member) => {
      members.push({
        id: member.memberId,
        name: member.memberName!,
        email: member.memberEmail!,
        avatarImage: member.memberAvatarImage || "",
      });
    });
    console.log(members.length);
    res.status(200).json({
      message: "Existing members on the workspace",
      data: existingMembers,
    });
    return;
  } catch (error) {}
};
