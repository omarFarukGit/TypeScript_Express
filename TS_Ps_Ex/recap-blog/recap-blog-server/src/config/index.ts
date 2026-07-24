import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_solt_round: process.env.BCRYPT_SOLT_ROUND as string,
  jwt_access_secret:process.env.JWT_ACCESS_SECRECT as string,
  jwt_access_exprire_in:process.env.JWT_ACCESS_EXPRIRE_IN as string,
  jwt_refresh_secret:process.env.JWT_REFRESH_TOKEN as string,
  jwt_refresh_exprie_in:process.env.JWT_REFRESH_EXPRITE_IN!
};
