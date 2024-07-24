import { Cosplan, PrismaClient } from '@prisma/client';
import { UpdateCosplanBody } from '../schemas/cosplan';

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

export async function updateCosplan(
  prisma: PrismaClient,
  id: number,
  { name, fandom, category }: UpdateCosplanBody
): Promise<Cosplan> {
  return await prisma.cosplan.update({
    where: {
      id,
    },
    data: {
      name,
      fandom,
      category,
    },
  });
}
