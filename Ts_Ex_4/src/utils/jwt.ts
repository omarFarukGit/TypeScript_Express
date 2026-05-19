import config from "../config";
import type { RUser } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";
export const signToken = (payload: RUser & { id: number }) => {
  //access token
  //resresh token acces token abar toiri korbe

  const accessToken = jwt.sign(payload, config.jwt_secrect as string, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign(payload, config.refresh_secrect as string, {
    expiresIn: "1d",
  });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret =
    type === "access" ? config.jwt_secrect : config.refresh_secrect;

  const decode = jwt.verify(token, secret);
  return decode as JwtPayload;
};
