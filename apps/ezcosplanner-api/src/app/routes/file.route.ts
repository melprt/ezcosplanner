import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { deleteFile, getReadStreamFromFileById, saveFile } from '../services/file.service';

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/file/:fileId/stream',
    async (
      request: FastifyRequest<{ Params: { fileId: string } }>,
      reply: FastifyReply
    ) => {
      const streamFile = await getReadStreamFromFileById(fastify.prisma, +request.params.fileId);
      
      if (!streamFile) {
        return reply.status(404).send();
      }

      reply.header('Content-Type', streamFile.mimeType);
      return reply.send(streamFile.stream);
    }
  );

  fastify.delete(
    '/file/:fileId',
    async (request: FastifyRequest<{ Params: { fileId: number }, Body: {path: string} }>) =>
      await deleteFile(fastify.prisma, +request.params.fileId, request.body.path)
  );

  fastify.post(
    '/file/save',
    async (
      request: FastifyRequest,
      reply: FastifyReply
    ) => {
      const data = await request.file();
      
      if (data) {
        //file size limit exeeded
        if (data.file.truncated) {
          return reply.status(413).send();
        } else {
          const file = await saveFile(fastify.prisma, data);

          if (file) {
            reply.send(file);
          } else {
            reply.send();
          }
        }
      } else {
        reply.send();
      }
    }
  )
}
