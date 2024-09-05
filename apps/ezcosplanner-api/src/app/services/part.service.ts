import { Part, PrismaClient } from "@prisma/client";
import { createPartBody } from "../schemas/part";

export async function createPart(
  prisma: PrismaClient,
  { name, cosplanId }: createPartBody
): Promise<Part> {
  return await prisma.part.create({
    data: {
      name,
      cosplanId: cosplanId,
    },
    include: {
      cosplan: {
        include: {
          parts: true,
        }
      },
    }
  });
}

export async function deletePart(
  prisma: PrismaClient,
  id: number
): Promise<void> {
  await prisma.part.delete({
    where: {
      id,
    },
  });
}