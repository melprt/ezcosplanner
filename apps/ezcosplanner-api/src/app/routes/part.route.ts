import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { FastifyInstance, FastifyRequest } from "fastify";
import { createPart, deletePart } from "../services/part.service";
import { CreatePartSchema } from "../schemas/part";

export default async function (fastify: FastifyInstance) {
    fastify
    .withTypeProvider<JsonSchemaToTsProvider>()
    .post(
      '/part',
      { schema: CreatePartSchema },
      async (request) =>
        await createPart(fastify.prisma, request.body)
    );

    fastify.delete(
      '/part/:id',
      async (request: FastifyRequest<{ Params: { id: number } }>) =>
        await deletePart(fastify.prisma, +request.params.id)
    );
}
