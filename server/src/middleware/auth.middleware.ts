import { NextFunction, Request, Response } from "express";
import { JWTPayload, jwtVerify } from "jose";
import { parse } from "cookie";
import { PrismaClient } from "@prisma/client";

const key = new TextEncoder().encode(process.env.SECRET_TOKEN);
const prisma = new PrismaClient();

export interface RequestWithUser extends Request {
  userId: string;
}
interface CustomJwtPayload extends JWTPayload {
  id: string;
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const cookies = parse(req.headers.cookie || "");

    const token = cookies.session;
    if (!token) {
      return res.status(400).json({ message: "Unauthorized request" });
    }

    console.log("Session Token:", token);
    const decodedToken = (await decrypt(token)) as CustomJwtPayload;
    console.log("decoded token", decodedToken);

    if (!decodedToken || typeof decodedToken === "string") {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    (req as RequestWithUser).userId = user!.id;
    console.log("user", user);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { verifyJwt };
