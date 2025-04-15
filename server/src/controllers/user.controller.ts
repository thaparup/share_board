import type { Request, Response } from "express";
import {
  loginSchema,
  registerUserSchema,
  RegisterUserType,
} from "../schema/user.schema";
import { PrismaClient } from "@prisma/client";
import bycrypt from "bcrypt";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response): Promise<any> {
  const parsed = registerUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bycrypt.hash(parsed.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword,
        avatarImage: parsed.data.avatarImage,
      },
    });
    const { password, ...safeUser } = user;

    res.status(201).json({ message: "User created", data: { user: safeUser } });
  } catch (error) {
    console.error("User creation failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function loginUser(req: Request, res: Response): Promise<any> {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
  }

  try {
    const existedUser = await prisma.user.findUnique({
      where: {
        email: parsed.data.email,
      },
    });

    if (!existedUser)
      return res.status(400).json({ message: "User credentails is not valid" });

    const isPasswordValid = await bycrypt.compare(
      parsed.data.password,
      existedUser.password
    );
    if (!isPasswordValid)
      return res.status(400).json({ message: "User credentails is not valid" });

    const alg = "HS256";
    const key = new TextEncoder().encode(process.env.SECRET_TOKEN);
    const session = await new SignJWT({
      id: existedUser.id,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime(`${process.env.JWT_EXP}s`)
      .sign(key);
    const options = {
      httpOnly: true,
      secure: true,
      maxAge: Number(process.env.JWT_EXP),
    };

    return res
      .cookie("session", session, options)
      .status(200)
      .json({
        message: "User logged in successfuly",
        data: {
          id: existedUser.id,
          name: existedUser.name,
          email: existedUser.name,
          avatarImage: existedUser.avatarImage,
        },
      });
  } catch (error) {
    return res
      .json({ message: "Something went well while user logging in" })
      .status(500);
  }
}
