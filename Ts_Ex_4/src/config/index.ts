import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ quiet: true });

const config = {
  port: env.PORT,
  databaseUrl:env.DATABASE_URI,
  node_env:env.NODE_ENV
};

export default config;
