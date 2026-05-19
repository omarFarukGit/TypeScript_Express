import { neon } from "@neondatabase/serverless";
import config from "../config";

export const sql = neon(config.databaseUrl as string);

export const initDB = async () => {
  // Users Table
  await sql`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(75) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      age INT NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  // Orders Table
  await sql`
    CREATE TABLE IF NOT EXISTS orders(
      id SERIAL PRIMARY KEY,
      customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      quantity INT NOT NULL CHECK (quantity > 0),
      food TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `;

  console.log("Database connected");
};