import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  updateCosplanSchema,
  updateCosplanStatusSchema,
} from '../schemas/cosplan';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import {
  deleteCosplan,
  findAllCosplans,
  findCosplanById,
  updateCosplan,
  updateCosplanStatus,
} from '../services/cosplan.service';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/cosplan',
    async () => ({cosplans: await findAllCosplans(fastify.prisma)})
  );

  fastify.get(
    '/cosplan/:id',
    async (request: FastifyRequest<{ Params: { id: number } }>) => {
      return await findCosplanById(fastify.prisma, +request.params.id);
    }
  );

  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .put(
      '/cosplan/:id',
      { schema: updateCosplanSchema },
      async (request) =>
        await updateCosplan(fastify.prisma, +request.params.id, request.body)
    );

  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .patch(
      '/cosplan/:id/status',
      { schema: updateCosplanStatusSchema },
      async (request) =>
        await updateCosplanStatus(
          fastify.prisma,
          request.params.id,
          request.body
        )
    );

  fastify.delete(
    '/cosplan/:id',
    async (request: FastifyRequest<{ Params: { id: number } }>) =>
      await deleteCosplan(fastify.prisma, +request.params.id)
  );
}
