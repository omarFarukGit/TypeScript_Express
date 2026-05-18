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

const getAllUsers = async (req: Request, res: Response) => {
  console.log(req.user, "controller");
  try {
    const result = await userService.getAllUsersFromDB();
    return res.status(200).json({
      success: true,
      message: "users get successfullly",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userService.getSingleUserFromDB(id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: " get user by id successfullly",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;
  try {
    // name=COALESCE($1, filedname) MEAN data null patale update hobe nah oi field er agr tai thakbe

    const result = await userService.updateUserFromDB(req.body, id as string);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }
    return res.status(201).json({
      success: true,
      message: "updated user succefully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(201).json({
      success: true,
      message: error.message,
      error: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userService.deleteUserFromDB(id as string);
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
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
