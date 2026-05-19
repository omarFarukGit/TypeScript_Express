import dotenv from "dotenv";
import { env } from "process";

dotenv.config({ quiet: true });

const config = {
  port: env.PORT as string,
  databaseUrl: env.DATABASE_URI as string,
  node_env: env.NODE_ENV as string,
  jwt_secrect: env.JWT_SECRET as string,
  refresh_secrect: env.REF_SECRET as string,
};

export default config;
