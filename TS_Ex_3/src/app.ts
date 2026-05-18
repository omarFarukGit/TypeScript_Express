import express from "express";
import type { Application, Request, Response } from "express";
import "dotenv/config";
import { initDB, pool } from "./db";
import { uesrRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
});

app.use("/api/users", uesrRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRouter);

export default app;
