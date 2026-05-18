import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("time", Date.now());
  next();
  const log = `\nMethod->${req.method} -Time-> ${Date.now()} -URL->${req.url}`;

  fs.appendFile("logger.txt", log, (err) => {
    console.log(err);
  });
};
export default logger;
