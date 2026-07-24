import type { Request, Response } from "express";

export const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not Found",
    path: req.originalUrl,
    date: Date(),
  });
};
