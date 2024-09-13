import { Prisma, PrismaClient } from '@prisma/client';
import { TimeEntryResult } from '../model/dto/time-entry-result';
import { deleteTimeEntryBody } from '../schemas/time-entry';

export async function findAllTimeEntryForCosplan(
  prisma: PrismaClient,
  cosplanId: number,
  skip: number,
  take: number
): Promise<TimeEntryResult[]> {
  const select = {
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
  };

  const where = {
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
  };

  const orderBy: Prisma.TimeEntryOrderByWithRelationInput[] = [
    {
      day: 'desc',
    },
  ];

  const timeEntryQueryResult = await prisma.timeEntry.findMany({
    distinct: 'id',
    select,
    where,
    orderBy,
    skip,
    take,
  });

  return timeEntryQueryResult;
}

export async function getTotalTimeEntryForCosplan(
  prisma: PrismaClient,
  cosplanId: number
): Promise<number> {
  const count = (
    await prisma.timeEntry.aggregate({
      _count: {
        _all: true,
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
    })
  )._count._all;

  return count;
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
