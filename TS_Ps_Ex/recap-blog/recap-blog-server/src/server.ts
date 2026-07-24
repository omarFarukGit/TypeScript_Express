import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const port = config.port || 5001;

const main = async () => {
  try {
    await prisma.$connect();
    console.log("database connect sucessfully");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    process.exit();
  }
};

main();
