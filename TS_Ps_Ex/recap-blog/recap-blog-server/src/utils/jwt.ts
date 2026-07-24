import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
const createToken = async (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);

  return token;
};

const verifyToken = (token: string, secret: string) => {
  try {
    const verifyToken = jwt.verify(token, secret);

    return {
      success: true,
      data: verifyToken,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const utils = {
  createToken,
  verifyToken
};
