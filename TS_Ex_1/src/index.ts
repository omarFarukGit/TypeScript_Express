import express from "express";
import type { Application, Request, Response } from "express";
import { Pool, Result } from "pg";
import "dotenv/config";

const app: Application = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.NEON_URI,
});

const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )   
        `);
    console.log("db connect successfully");
  } catch (error) {
    console.log(error);
  }
};

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

await initDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
