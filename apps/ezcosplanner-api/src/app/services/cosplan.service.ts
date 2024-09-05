import { Cosplan, CosplanStatus, PrismaClient } from '@prisma/client';
import { CreateCosplanBody, UpdateCosplanBody, UpdateCosplanStatusBody } from '../schemas/cosplan';

export async function findAllCosplans(prisma: PrismaClient): Promise<Cosplan[]> {
  return prisma.cosplan.findMany({
    include: {
      file: true,
    }
  });
}

export async function findCosplanById(prisma: PrismaClient, id: number): Promise<Cosplan|null> {
  return await prisma.cosplan.findUnique({
    where: {
      id,
    },
    include: {
      file: true,
      parts: true
    }
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
    include: {
      file: true,
      parts: true
    }
  });
}

export async function createCosplan(
  prisma: PrismaClient,
  { name, fandom, category, fileId }: CreateCosplanBody
): Promise<Cosplan> {
  //todo create with current user
  return await prisma.cosplan.create({
    data: {
      name,
      fandom,
      category,
      status: CosplanStatus.PENDING,
      cosmakerId: 1,
      fileId: fileId,
    },
    include: {
      file: true,
    }
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
    include: {
      file: true,
    }
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
