import { FastifyInstance, FastifyRequest } from 'fastify';
import { getAllCosplans, getCosplanById } from '../handlers/cosplan.handler';
import { updateCosplanSchema } from '../schemas/cosplan';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { updateCosplan } from '../services/cosplan.service';

export default async function (fastify: FastifyInstance) {
  fastify.get('/cosplan', async () => await getAllCosplans(fastify));
  fastify.get(
    '/cosplan/:id',
    async (request: FastifyRequest<{ Params: { id: number } }>) => {
      return await getCosplanById(fastify, +request.params.id);
    }
  );

  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .put(
      '/cosplan/:id',
      { schema: updateCosplanSchema },
      async (request) =>
        await updateCosplan(fastify.prisma, request.params.id, request.body)
    );
}
