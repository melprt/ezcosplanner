import { FastifyInstance } from 'fastify';
import { findAllCosplans, findCosplanById } from '../services/cosplan.service';

export async function getAllCosplans(fastify: FastifyInstance) {
  const prisma = fastify.prisma;
  const cosplans = await findAllCosplans(prisma);
  return { cosplans };
}

export async function getCosplanById(fastify: FastifyInstance, id: number) {
  const prisma = fastify.prisma;
  const cosplan = await findCosplanById(prisma, id);
  return cosplan;
}
