import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  deleteTimeEntries,
  findAllTimeEntryForCosplan,
  getTotalTimeEntryForCosplan,
} from '../services/time-entry.service';
import {
  deleteTimeEntrySchema,
  getTimeEntrySchema,
} from '../schemas/time-entry';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export default async function (fastify: FastifyInstance) {
  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .get(
      '/timeentry/:cosplanId',
      { schema: getTimeEntrySchema },
      async (
        request: FastifyRequest<{
          Params: { cosplanId: number };
          Querystring: { offset: number; limit: number };
        }>
      ) => {
        const { offset, limit } = request.query;

        const count = await getTotalTimeEntryForCosplan(
          fastify.prisma,
          +request.params.cosplanId,
        );

        const timeEntries = await findAllTimeEntryForCosplan(
          fastify.prisma,
          +request.params.cosplanId,
          offset,
          limit
        );

        return {
          timeEntries,
          count
        };
      }
    );

  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .delete(
      '/timeentry',
      { schema: deleteTimeEntrySchema },
      async (request) => await deleteTimeEntries(fastify.prisma, request.body)
    );
}
