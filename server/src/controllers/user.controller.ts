import type { Request, Response } from "express";
import { registerUserSchema } from "../schema/user.schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function registerUser(req: Request, res: Response) {
  const parsed = registerUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
  }
  const { name, email, avatarImage } = parsed.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const user = await prisma.user.create({
      data: { name, email, avatarImage },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("User creation failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
