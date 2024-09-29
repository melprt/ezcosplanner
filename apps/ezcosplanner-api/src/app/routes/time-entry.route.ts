import { FastifyInstance, FastifyRequest } from 'fastify';
import {
  deleteTimeEntries,
  findAllTimeEntryForCosplan,
  getTotalTimeEntryForCosplan,
  getTotalTimeFromTimeEntries,
} from '../services/time-entry.service';
import {
  deleteTimeEntrySchema,
  getTimeEntrySchema,
} from '../schemas/time-entry';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export default async function (fastify: FastifyInstance) {
  fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .post(
      '/timeentry/:cosplanId',
      { schema: getTimeEntrySchema },
      async (request) => {
        const count = await getTotalTimeEntryForCosplan(
          fastify.prisma,
          +request.params.cosplanId,
          request.body
        );

        const sum = await getTotalTimeFromTimeEntries( 
          fastify.prisma,
          +request.params.cosplanId,
          request.body
        )

        const timeEntries = await findAllTimeEntryForCosplan(
          fastify.prisma,
          +request.params.cosplanId,
          request.body
        );

        return {
          timeEntries,
          count,
          sum
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
