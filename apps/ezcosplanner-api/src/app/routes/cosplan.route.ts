import { FastifyInstance } from 'fastify';
import { getAllCosplans } from '../handlers/cosplan.handler';

export default async function (fastify: FastifyInstance) {
  fastify.get('/cosplan', async () => await getAllCosplans(fastify));
}
