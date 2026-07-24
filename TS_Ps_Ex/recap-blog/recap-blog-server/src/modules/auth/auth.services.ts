import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { ILogingUser } from "./auth.interface";
import { utils } from "../../utils/jwt";
import config from "../../config";
import type { SignOptions } from "jsonwebtoken";

const login = async (payload: ILogingUser) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("user not found please register");
  }

  const isMacth = await bcrypt.compare(password, user.password);

  if (!isMacth) {
    throw new Error("invaild creadentials");
  }

  if (user.activeStatus === "BLOCKED") {
    throw new Error("your account is blocked please contact support");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken =await utils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_refresh_exprie_in as SignOptions,
  );
  const refreshToken =await utils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_exprie_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken
  }
};

export const authServices = {
  login,
};
