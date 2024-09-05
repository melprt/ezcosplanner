import { FastifyInstance, FastifyRequest } from "fastify";
import { deleteTimeEntry } from "../services/time-entry.service";

export default async function (fastify: FastifyInstance) {
  // fastify.get(
  //   '/timeentry',
  //   async () => ({timeentries: await findAllTimeEntryForCosplan(fastify.prisma)})
  // );

    fastify.delete(
      '/timeentry/:id',
      async (request: FastifyRequest<{ Params: { id: number } }>) =>
        await deleteTimeEntry(fastify.prisma, +request.params.id)
    );
}
