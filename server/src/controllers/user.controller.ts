import { Request, Response } from "express";
import { loginSchema, registerUserSchema } from "../schema/user.schema";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { serialize } from "cookie";
import { ALG, COOKIE, COOKIE_NAME, KEY } from "../utils/auth";
const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const parsed = registerUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
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
    return;
  } catch (error) {
    console.error("User creation failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);

  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("DATABASE_URL:", process.env.POSTGRES_URI);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
    return;
  }

  try {
    const existedUser = await prisma.user.findUnique({
      where: {
        email: parsed.data.email,
      },
    });
    console.log(existedUser);
    if (!existedUser) {
      res.status(400).json({ message: "User credentails is not valid" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      parsed.data.password,
      existedUser.password
    );
    if (!isPasswordValid) {
      res.status(400).json({ message: "User credentails is not valid" });
      return;
    }
    const jwt = await new SignJWT({
      id: existedUser.id,
    })
      .setProtectedHeader({ alg: ALG })
      .setIssuedAt()
      .setExpirationTime(`${process.env.JWT_EXP}s`)
      .sign(KEY);

    const session = serialize(COOKIE_NAME, jwt, COOKIE);
    res.setHeader("Set-Cookie", session);
    res.status(200).json({
      message: "User logged in successfuly",
      data: {
        id: existedUser.id,
        name: existedUser.name,
        email: existedUser.name,
        avatarImage: existedUser.avatarImage,
      },
    });
    return;
  } catch (error) {
    res
      .json({ message: "Something went well while user logging in" })
      .status(500);
    return;
  }
}

export async function logoutUser(req: Request, res: Response) {
  try {
    console.log("api called");
    const expiredSession = serialize(COOKIE_NAME, "", { ...COOKIE, maxAge: 0 });

    res.setHeader("Set-Cookie", expiredSession);

    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
}

export async function fetchCurrentUser(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const existedUser = await prisma.user.findFirst({ where: { id: userId } });
    if (!existedUser) {
      res.status(400).json({ message: "No user found" });
      return;
    }

    res.status(200).json({
      message: "Current user fetched",
      data: {
        id: existedUser.id,
        name: existedUser.name,
        email: existedUser.name,
        avatarImage: existedUser.avatarImage,
      },
    });
  } catch (error) {}
}
