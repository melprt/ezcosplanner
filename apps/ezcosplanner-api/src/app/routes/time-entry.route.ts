import { FastifyInstance, FastifyRequest } from "fastify";
import { deletePart } from "../services/part.service";

export default async function (fastify: FastifyInstance) {
    fastify.delete(
      '/timeentry/:id',
      async (request: FastifyRequest<{ Params: { id: number } }>) =>
        await deleteTimeEntry(fastify.prisma, +request.params.id)
    );
}
