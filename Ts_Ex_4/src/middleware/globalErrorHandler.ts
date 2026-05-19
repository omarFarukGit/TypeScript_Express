import type { NextFunction, Request, Response } from "express";
import config from "../config";

export const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : "internal server error",
    stack:
      config.node_env === "development" && error instanceof Error
        ? error.stack
        : undefined,
  });
};
