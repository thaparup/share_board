import { Request, Response } from "express";
import { loginSchema, registerUserSchema } from "../schema/user.schema";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { serialize } from "cookie";
import { ALG, COOKIE, COOKIE_NAME, KEY } from "../utils/auth";
import fs from "node:fs"; // Import the fs module

import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../../cloudinary.config";
const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const existingUser = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (existingUser) {
    res.status(409).json({
      message: "Email already in use",
      data: null,
    });
    return;
  }

  if (req.file) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECTRET,
      });
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
      });

      req.body.avatarImage = result.secure_url || "";
    } catch (error) {
      fs.unlinkSync(req.file.path);
      console.error("Cloudinary upload failed:", error);
      res.status(500).json({ message: "Image upload failed" });
      return;
    } finally {
      fs.unlinkSync(req.file.path);
    }
  }

  const parsed = registerUserSchema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
    return;
  }

  try {
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
        email: existedUser.email,
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
    const expiredSession = serialize(COOKIE_NAME, "", { ...COOKIE, maxAge: 0 });

    res.setHeader("Set-Cookie", expiredSession);

    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
}

export async function validateToken(req: Request, res: Response) {
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
        email: existedUser.email,
        avatarImage: existedUser.avatarImage,
      },
    });
  } catch (error) {}
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatarImage: true,
      },
    });

    res.status(200).json({ message: "all users", data: users });
  } catch (error) {
    res.status(400).json({ message: "users fetching failed" });
  }
}

export async function searchUsers(req: Request, res: Response) {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ message: "Search query is required and must be a string." });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query as string,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query as string,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarImage: true,
      },
      take: 20,
    });

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
