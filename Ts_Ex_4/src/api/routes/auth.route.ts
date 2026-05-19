import { Router } from "express";
import { login, refresh, signup } from "../controllers/auth.controllers";
import { auth, authRole } from "../../utils/auth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh", refresh);
router.get("/dashboad", auth, authRole("user"), (req, res) => {
  res.send("this is dhashboad");
});

export const AuthRoutes = router;
