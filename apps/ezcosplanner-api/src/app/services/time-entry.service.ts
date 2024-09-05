import { PrismaClient } from "@prisma/client";

export async function deletePart(
  prisma: PrismaClient,
  id: number
): Promise<void> {
  await prisma.timeEntry.delete({
    where: {
      id,
    },
  });
}