import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.services";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.login(req.body);

  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "none",
    secure: false,
  });
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "none",
    secure: false,
  });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user login successfully",
    data: result,
  });
});

export const authController = {
  login,
};
