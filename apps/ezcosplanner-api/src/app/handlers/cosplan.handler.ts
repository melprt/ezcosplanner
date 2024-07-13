import { FastifyInstance } from 'fastify';
import { findAllCosplans } from '../services/cosplan.service';

export async function getAllCosplans(fastify: FastifyInstance) {
  // const prisma = fastify.prisma;
  const prisma = (fastify as any).prisma
  const cosplans = await findAllCosplans(prisma);
  return { cosplans };
}
