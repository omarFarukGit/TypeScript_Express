import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getSingleUser);

router.put("/user/:id", userController.updateUser);

router.delete("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
           DELETE FROM users WHERE id=$1
            `,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: {},
    });
  } catch (error: any) {
    return res.json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

export const uesrRoute = router;
