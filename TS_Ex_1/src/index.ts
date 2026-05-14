import express from "express";
import type { Application, Request, Response } from "express";
import { Pool } from "pg";
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
        CREATE TABLE IF NOT EXISTS ueser(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) NOT NULL,
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
app.post("/user", (req: Request, res: Response) => {
  const { name, email } = req.body;

  res.status(201).json({
    message: "created user succesfully",
    data: {
      name,
      email,
    },
  });
  console.log(req.body);
});

await initDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
