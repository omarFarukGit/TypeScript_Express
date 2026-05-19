import type { Request, Response } from "express";
import authService from "../service/auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { signToken, verifyToken } from "../../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);

  if (!user) {
    sendResponse(res, { message: "Faild to create user" }, 400);
    return;
  }
  sendResponse(res, { message: "user Created sucessfully", data: user }, 201);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.validateUser(email, password);

  if (!user) {
    sendResponse(res, { message: "user not found" }, 404);
    return;
  }

  const { accessToken, refreshToken } = signToken(user);

  const result = {
    user: user,
    accessToken,
    refreshToken,
  };

  res.cookie("refreshToken", refreshToken, {
    sameSite: "lax",
    httpOnly: true,
    secure: false,
  });

  sendResponse(res, { message: "user logged succesfully", data: result });
};

export const refresh = async (req: Request, res: Response) => {
  //resrsh toke ta nite hobe vlidate,user,acces
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return sendResponse(res, { message: "token not found" });
  }
  const payload = verifyToken(refreshToken, "refresh");

  if (!payload) {
    return sendResponse(res, { message: "invaild resfresh token  found" });
  }

  const user = await authService.getUserById(payload.id);
  console.log(user);

  if (!user) {
    return sendResponse(res, { message: "user not found" });
  }

  const { accessToken, refreshToken: newRefreshToken } = signToken(user);

  res.cookie("refreshToken", newRefreshToken, {
    secure: false,
    sameSite: "lax",
    httpOnly: true,
  });
  sendResponse(res, {
    message: "token refshed",
    data: {
      accessToken,
      newRefreshToken,
    },
  });
};
