import { Cosplan, PrismaClient } from '@prisma/client';
import { UpdateCosplanBody, UpdateCosplanStatusBody } from '../schemas/cosplan';

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

export async function updateCosplanStatus(
  prisma: PrismaClient,
  id: number,
  { status }: UpdateCosplanStatusBody
): Promise<Cosplan> {
  return await prisma.cosplan.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}

export async function deleteCosplan(
  prisma: PrismaClient,
  id: number
): Promise<void> {
  await prisma.cosplan.delete({
    where: {
      id,
    },
  });
}
