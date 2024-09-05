import { PrismaClient, TimeEntry } from "@prisma/client";

// export async function findAllTimeEntryForCosplan(prisma: PrismaClient): Promise<TimeEntry[]> {
//   // return prisma.timeEntry.findMany({
//   //   where: {
//   //     ,
//   //   },
//   //   include: {
//   //     part: true,
//   //     task: true,
//   //   }
//   // });
// }

export async function deleteTimeEntry(
  prisma: PrismaClient,
  id: number
): Promise<void> {
  await prisma.timeEntry.delete({
    where: {
      id,
    },
  });
}