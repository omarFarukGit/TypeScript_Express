import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";

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
    role: user.role,
    is_active: user.is_active,
  };
  const accessToken = jwt.sign(jwtPayload, "shflsfsfsecrectkey", {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(jwtPayload, "shflsfsfsecrectkeyrefresh", {
    expiresIn: "1d",
  });

  //console.log('authrole',user.role)
  return { accessToken, refreshToken };
};

const generateResreshToken = async (token: string) => {
  try {
    if (!token) {
      throw new Error("forbiden");
    }

    const decoded = jwt.verify(
      token as string,
      "shflsfsfsecrectkeyrefresh",
    ) as JwtPayload;
    // console.log(decoded);

    const userData = await pool.query(
      `
          SELECT * FROM users WHERE email=$1
          `,
      [decoded.email],
    );
    // console.log(userData);
    const user = userData.rows[0];
    if (userData.rows.length === 0) {
      throw new Error("forbiden");
    }
    if (!user.is_active) {
      throw new Error("forbiden");
    }
    const jwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    };
    const accessToken = jwt.sign(jwtPayload, "shflsfsfsecrectkeyrefresh", {
      expiresIn: "1d",
    });
    return accessToken;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const authService = {
  loginUserIntroDB,
  generateResreshToken,
};
