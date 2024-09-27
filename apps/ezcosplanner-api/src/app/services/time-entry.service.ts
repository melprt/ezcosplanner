import { Prisma, PrismaClient } from '@prisma/client';
import { TimeEntryResult } from '../model/dto/time-entry-result';
import { deleteTimeEntryBody, getTimeEntryBody } from '../schemas/time-entry';

export async function findAllTimeEntryForCosplan(
  prisma: PrismaClient,
  cosplanId: number,
  { skip, take, filters }: getTimeEntryBody
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

  const orderBy: Prisma.TimeEntryOrderByWithRelationInput[] = [
    {
      day: 'desc',
    },
  ];

  const timeEntryQueryResult = await prisma.timeEntry.findMany({
    distinct: 'id',
    select,
    where: {
      OR: getConditionByCosplan(cosplanId),
      AND: getConditionByFilters(filters),
    },
    orderBy,
    skip,
    take,
  });

  return timeEntryQueryResult;
}

export async function getTotalTimeEntryForCosplan(
  prisma: PrismaClient,
  cosplanId: number,
  { filters }: getTimeEntryBody
): Promise<number> {
  const count = (
    await prisma.timeEntry.aggregate({
      _count: {
        _all: true,
      },
      where: {
        OR: getConditionByCosplan(cosplanId),
        AND: getConditionByFilters(filters),
      },
    })
  )._count._all;

  return count;
}

export async function getTotalTimeFromTimeEntries(
  prisma: PrismaClient,
  cosplanId: number,
  { skip, take, filters }: getTimeEntryBody
): Promise<number|null> {
  const sum = (
    await prisma.timeEntry.aggregate({
      _sum: {
          time: true                                                                        
      },
      where: {
        OR: getConditionByCosplan(cosplanId),
        AND: getConditionByFilters(filters),
      },
      skip,
      take
    })
  )._sum;

  return sum.time;
}


function getConditionByFilters(filters : getTimeEntryBody['filters']) {
  return [
    {
      AND: [
        {
          AND: [
            filters?.startDate ? { day: { gte: filters.startDate } } : {},
            filters?.endDate ? { day: { lte: filters.endDate } } : {},
          ],
        },
        filters?.task ? { task: { name: { contains: filters.task } } } : {},
        {
          OR: [
            filters?.element
              ? { part: { name: { contains: filters.element } } }
              : {},
            filters?.element
              ? {
                  task: {
                    part: {
                      name: { contains: filters?.element },
                    },
                  },
                }
              : {},
          ],
        },
      ],
    },
  ];
}

function getConditionByCosplan (cosplanId: number) {
  return [
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
  ];
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
