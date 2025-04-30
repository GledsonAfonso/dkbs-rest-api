import { PrismaClient } from "@database";

const client = new PrismaClient();

export const getDatabaseClient = () => client;
