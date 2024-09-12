import { FastifyInstance, FastifyRequest } from "fastify";
import { deleteTimeEntries, deleteTimeEntry, findAllTimeEntryForCosplan } from "../services/time-entry.service";
import { DeleteTimeEntrySchema } from "../schemas/time-entry";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

export default async function (fastify: FastifyInstance) {
    fastify.get(
      '/timeentry/:cosplanid',
      async (request: FastifyRequest<{ Params: { cosplanid: number } }>) =>
        await findAllTimeEntryForCosplan(fastify.prisma, +request.params.cosplanid)
    );
    
    // fastify.delete(
    //   '/timeentry/:id',
    //   async (request: FastifyRequest<{ Params: { id: number } }>) =>
    //     await deleteTimeEntry(fastify.prisma, +request.params.id)
    // );
    
    fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .delete(
      '/timeentry',
      { schema: DeleteTimeEntrySchema},
      async (request) =>
        await deleteTimeEntries(fastify.prisma, request.body)
    );
}
