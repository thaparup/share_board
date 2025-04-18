import { NextFunction, Request, Response } from "express";
import { JWTPayload, jwtVerify } from "jose";
import { parse } from "cookie";
import { PrismaClient } from "@prisma/client";

const key = new TextEncoder().encode(process.env.SECRET_TOKEN);
const prisma = new PrismaClient();

// export interface RequestWithUser extends Request {
//   userId: string;
// }
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

const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = parse(req.headers.cookie || "");

    const token = cookies.session;
    if (!token) {
      res.status(400).json({ message: "Unauthorized request" });
      return;
    }

    console.log("Session Token:", token);
    const decodedToken = (await decrypt(token)) as CustomJwtPayload;

    if (!decodedToken || typeof decodedToken === "string") {
      res.status(401).json({ message: "Invalid Access Token" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    if (!user) {
      res.status(400).json({ message: "Unauthorized request" });
      return;
    }
    const { password, ...safeUser } = user;

    req.user = safeUser;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export { verifyJwt };
