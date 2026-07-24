import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { notFoundRoute } from "./middleware/notFound";
import { Global } from "./middleware/globalErrorHandler";
import { userRoutes } from "./modules/user/user.routes";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/", (req: Request, res: Response) => {
  res.send("server running...");
});

//api
app.use("/api/users", userRoutes);

// route not found
app.use(notFoundRoute);
// Global Error Handler
app.use(Global);

export default app;
