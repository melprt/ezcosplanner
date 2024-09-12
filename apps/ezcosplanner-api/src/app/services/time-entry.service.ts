import { Prisma, PrismaClient } from '@prisma/client';
import { TimeEntryResult } from '../model/dto/time-entry-result';
import { deleteTimeEntryBody } from '../schemas/time-entry';

export async function findAllTimeEntryForCosplan(
  prisma: PrismaClient,
  cosplanId: number
): Promise<TimeEntryResult[]> {
  const orderBy: Prisma.TimeEntryOrderByWithRelationInput[] = [
    {
      day: 'desc',
    },
  ];
  
  const timeEntryQueryResult = await prisma.timeEntry.findMany({
    distinct: 'id',
    select: {
      id: true,
      day: true,
      time: true,
      part: {
        select: {
          id: true,
          name: true,
        },
      },
      task: {
        select: {
          id: true,
          name: true,
          part: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      OR: [
        {
          part: {
            cosplanId,
          },
        },
        {
          task: {
            part: {
              cosplanId,
            },
          },
        },
      ],
    },
    orderBy
  });

  return timeEntryQueryResult;
}

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


export async function deleteTimeEntries(
  prisma: PrismaClient,
  { ids }: deleteTimeEntryBody
): Promise<void> {
  await prisma.timeEntry.deleteMany({
    where: {
      id: { in: ids },
    },
  });
}
