import express from "express";
import type { Request, Response } from "express";
import { logger } from "./middleware/logger";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { AuthRoutes } from "./api/routes/auth.route";

const app = express();
app.use(express.json());
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  // throw new Error("server daynig");
  res.send("Hello World!");
});

app.use("/api", AuthRoutes);

app.use(globalErrorHandler);
export default app;
