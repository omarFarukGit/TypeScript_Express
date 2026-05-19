import type { Request, Response } from "express";
import authService from "../service/auth.service";
import { sendResponse } from "../../utils/sendResponse";

export const signup = async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);

  if (!user) {
    sendResponse(res, { message: "Faild to create user" }, 400);
    return;
  }
  sendResponse(res, { message: "user Created sucessfully", data: user }, 201);
};
