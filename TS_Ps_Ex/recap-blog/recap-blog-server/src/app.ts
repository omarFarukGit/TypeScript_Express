import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { notFoundRoute } from "./middleware/notFound";
import { Global } from "./middleware/globalErrorHandler";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("server running...");
});

// route not found
app.use(notFoundRoute);
// Global Error Handler
app.use(Global)

export default app;
