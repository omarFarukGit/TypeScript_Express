import type { Request, Response } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../util/sendResponse";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntroDB(req.body);

    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    });

    return res.json({
      success: false,
      message: "user loging sucess",
      data: result,
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateResreshToken(req.cookies.refreshToken);

    // // return res.json({
    //   success: true,
    //   message: "user acces  token generate sucess",
    //   data: result,
    // });

    sendResponse(res,   {status:201, success: true,
      message: "user acces  token generate sucess",
      data: result,
    })
  } catch (error: any) {
    return res.json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  loginUser,
  refreshToken,
};
