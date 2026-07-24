import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import type { TRegisterUser } from "./user.interface";

const register = async (payload: TRegisterUser) => {
  const { name, email, password, profilePhoto  } = payload;
  const userExits = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExits) {
    throw new Error("User allready exitis");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_solt_round),
  );

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  const result = await prisma.user.findUnique({
    where: { email: user.email },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return result;
};

export const userServices = {
  register,
};
