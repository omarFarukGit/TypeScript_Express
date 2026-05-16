import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";

const loginUserIntroDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  // check if the user exists
  // compre ther passwrod
  // token generate

  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email],
  );
  console.log(userData.rows[0]);
  if (userData.rows.length === 0) {
    throw new Error(" Invaild credentials");
  }
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invaild credentials");
  }
  //   generate token

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtPayload, "shflsfsfsecrectkey", {
    expiresIn: "20s",
  });

return {accessToken};
};

export const authService = {
  loginUserIntroDB,
};
