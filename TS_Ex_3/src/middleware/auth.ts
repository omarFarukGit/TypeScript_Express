import type { NextFunction, Request, Response } from "express";

import Jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db";
import type { ROLEs } from "../types";

const auth = (...roles: ROLEs[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //   console.log("this is protected");
    // console.log(req.headers.authorization);
    console.log(roles);
    // 1 check
    // 2 verify token
    // 3 find the user
    //4 if ther user active or not?
    // 5 role based auth
    try {
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({
          success: false,
          message: "unauthorized acess",
        });
      }

      const decoded = Jwt.verify(
        token as string,
        "shflsfsfsecrectkey",
      ) as JwtPayload;
      // console.log(decoded);

      const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `,
        [decoded.email],
      );
      // console.log(userData);
      const user = userData.rows[0];
      if (userData.rows.length === 0) {
        res.status(401).json({
          success: false,
          message: "user not found",
        });
      }
      if (!user.is_active) {
        res.status(401).json({
          success: false,
          message: "forbiden",
        });
      }

      req.user = decoded;

      if (roles.length && !roles.includes(user.role)) {
        res.status(401).json({
          success: false,
          message: "forbiden",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
