import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export default fp((fastify, _, done) => {
  const prisma = new PrismaClient();
  fastify.decorate('prisma', prisma)
  done()
})