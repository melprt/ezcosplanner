import { FastifyInstance, FastifyRequest } from 'fastify';
import { getAllCosplans, getCosplanById } from '../handlers/cosplan.handler';

export default async function (fastify: FastifyInstance) {
  fastify.get('/cosplan', async () => await getAllCosplans(fastify));
  fastify.get(
    '/cosplan/:id',
    async (request: FastifyRequest<{ Params: { id: number } }>) => {      
      return await getCosplanById(fastify, +request.params.id)
    }
  );
}
