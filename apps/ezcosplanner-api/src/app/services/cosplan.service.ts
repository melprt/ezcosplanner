import { PrismaClient } from '@prisma/client';

export async function findAllCosplans(prisma: PrismaClient) {
  return prisma.cosplan.findMany();
}

export async function findCosplanById(prisma: PrismaClient, id: number) {
  return prisma.cosplan.findUnique({
    where: {
      id,
    },
  });
}
