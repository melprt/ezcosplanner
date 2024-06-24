import { PrismaClient } from "@prisma/client";

export async function findAllCosplans(prisma: PrismaClient) {
    return prisma.cosplan.findMany();
}