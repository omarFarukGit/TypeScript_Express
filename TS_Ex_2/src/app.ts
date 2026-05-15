import express from "express";
import type { Application, Request, Response } from "express";
import "dotenv/config";
import { initDB, pool } from "./db";

const app: Application = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
});

app.post("/user", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  try {
    const result = await pool.query(
      `
        INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *
        `,
      [name, email, password, age],
    );
    console.log(result);

    return res.status(201).json({
      message: "created user succesfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log({ message: error.message });
    res.send({ message: error.message, error: error });
  }

  console.log(req.body);
});

app.get("/user", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
            SELECT * FROM users
            `);
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
});
app.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
            SELECT * FROM users WHERE id=$1
            `,
      [id],
    );

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
});

app.put("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age, is_active } = req.body;
  try {
    // name=COALESCE($1, filedname) MEAN data null patale update hobe nah oi field er agr tai thakbe
    const result = await pool.query(
      `
           UPDATE users SET name=COALESCE($1, name)
           ,password=$2,age=$3 ,is_active=$4 WHERE id=$5 RETURNING * 
            `,
      [name, password, age, is_active, id],
    );

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
});

app.delete("/user/:id", async (req: Request, res: Response) => {
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



export default app