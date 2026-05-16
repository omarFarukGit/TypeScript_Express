import express from "express";
import type { Application, Request, Response } from "express";
import "dotenv/config";
import { initDB, pool } from "./db";
import { uesrRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";

const app: Application = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
});

app.use("api/users", uesrRoute);
app.use("/api/profile", profileRoute);

export default app;
