import type { NextFunction, Request, Response } from "express";

export const Global = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);
  res.status(500).json({
    sucess: false,
    statusCode: 500,
    message: error.message,
    error: error.stack,
  });
};
