import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

export default fp((fastify, _, done) => {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  })

  if (process.env.NODE_ENV === 'development') {
    prisma.$on('query', (e) => {
      console.log('Query: ' + e.query)
      console.log('Params: ' + e.params)
      console.log('Duration: ' + e.duration + 'ms')
    });
  }

  fastify.decorate('prisma', prisma)
  done()
})