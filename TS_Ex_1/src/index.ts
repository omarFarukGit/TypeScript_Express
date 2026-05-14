import express from "express";
import type { Application, Request, Response } from "express";
import { Pool } from "pg";
import 'dotenv/config'

const app: Application = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
  connectionString:process.env.NEON_URI,
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
