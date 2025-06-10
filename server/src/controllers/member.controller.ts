import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateMember, createMemberSchema } from "../schema/member.schema";

const prisma = new PrismaClient();

// export const addMember = async (req: Request, res: Response) => {
//   try {
//     const { workspaceId } = req.params;

//     const workspace = await prisma.workspace.findFirst({
//       where: { id: workspaceId! },
//     });

//     if (!workspace) {
//       res.status(400).json({ message: "No workspace found" });
//       return;
//     }

//     const existingMembers = await prisma.workspaceMember.findMany({
//       where: {
//         workspaceId: workspace.id,
//       },
//       select: {
//         memberId: true,
//       },
//     });

//     const existingMemberIds = new Set(existingMembers.map((m) => m.memberId));

//     const newMembers = req.body.filter(
//       (member: {
//         id: string;
//         name: string;
//         email: string;
//         avatarImage?: string;
//       }) => !existingMemberIds.has(member.id)
//     );

//     if (newMembers.length === 0) {
//       return res
//         .status(200)
//         .json({ message: "All selected users are already members." });
//     }

//     const convertUserToMember: CreateMember[] = newMembers.map(
//       (member: any) => ({
//         memberId: member.id,
//         memberName: member.name,
//         memberEmail: member.email,
//         memberAvatarImage: member.avatarImage || "",
//         role: "MEMBER",
//       })
//     );

//     const parsed = createMemberSchema.safeParse(convertUserToMember);

//     if (!parsed.success) {
//       res.status(400).json({
//         message: "Make sure required fields are not empty",
//         errors: parsed.error.errors,
//       });
//       return;
//     }

//     await prisma.workspaceMember.createMany({
//       data: parsed.data.map((member) => ({
//         ...member,
//         workspaceId: workspace.id,
//       })),
//     });

//     res.status(201).json({ message: "New members added successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

export const addMember = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId! },
    });

    if (!workspace) {
      return res.status(400).json({ message: "No workspace found" });
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
      return res.status(200).json({
        message: "One or more users are already members of this workspace.",
      });
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
      return res.status(400).json({
        message: "Validation failed. Ensure required fields are provided.",
        errors: parsed.error.errors,
      });
    }

    await prisma.workspaceMember.createMany({
      data: parsed.data.map((member) => ({
        ...member,
        workspaceId: workspace.id,
      })),
    });

    return res.status(201).json({ message: "Members added successfully." });
  } catch (error) {
    console.error("addMember error:", error);
    return res.status(500).json({ message: "Something went wrong" });
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
