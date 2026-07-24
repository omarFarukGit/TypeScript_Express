import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { userServices } from "./user.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.register(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "user register successfully",
    data: result,
  });
});

export const userController = {
  register,
};
