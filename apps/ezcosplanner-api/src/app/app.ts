import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {

  await fastify.register(cors, { 
    origin: (origin, cb) => {

      if (process.env.NODE_ENV === "development") {
        return cb(null, true);
      }

      if (!origin) {
        cb(new Error("No origin"), false)
        return;
      }
      const hostname = new URL(origin).hostname
      if(hostname === "localhost"){
        //  Request from localhost will pass
        cb(null, true)
        return
      }
      // Generate an error on other origins, disabling access
      cb(new Error("Not allowed"), false)
    }
  })

  await fastify.register(multipart, {
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 100,     // Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 1000000000,  // For multipart forms, the max file size in bytes
      files: 1,           // Max number of file fields
      headerPairs: 2000,  // Max number of header key=>value pairs
      parts: 1000         // For multipart forms, the max number of parts (fields + files)
    },
    // attachFieldsToBody: 'keyValues',
    // onFile,
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
}
