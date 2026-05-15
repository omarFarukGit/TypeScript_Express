import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
//   const { name, email, password, age } = req.body;

  try {
    const result = await userService.createUserIntoDB(req.body);

    return res.status(201).json({
      message: "created user succesfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log({ message: error.message });
    res.send({ message: error.message, error: error });
  }

  console.log(req.body);
};

export const userController = {
  createUser,
};
