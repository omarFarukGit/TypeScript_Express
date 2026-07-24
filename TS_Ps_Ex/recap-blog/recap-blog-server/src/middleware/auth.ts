import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { utils } from "../utils/jwt";
import config from "../config";
import type { JwtPayload } from "jsonwebtoken";
import type { Role } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        role: Role;
        id: string;
      };
    }
  }
}

export const auth = (...requiredRole: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error("please log in");
    }

    const verifyToken = utils.verifyToken(token, config.jwt_access_secret);

    if (!verifyToken.success) {
      throw new Error(verifyToken.error);
    }

    const { id, email, name, role } = verifyToken.data as JwtPayload;

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new Error("Forbiden access");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        name,
        role,
      },
    });
    if (!user) {
      throw new Error("user not found plase login");
    }

    if (user.activeStatus === "BLOCKED") {
      throw new Error("your accound has been blocked please contact support");
    }

    req.user = {
      name,
      email,
      role,
      id,
    };
  });
};
