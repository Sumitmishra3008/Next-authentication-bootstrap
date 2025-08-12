import { PrismaClient } from "./generated/prisma/index.js";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type GlobalThisWithPrisma = typeof globalThis & {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
};

const globalForPrisma = globalThis as GlobalThisWithPrisma;

const db = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaGlobal = db;