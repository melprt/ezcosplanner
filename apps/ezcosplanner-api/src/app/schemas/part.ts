import { FromSchema } from 'json-schema-to-ts';

export const body = {
  type: 'object',
  required: ['name', 'cosplanId'],
  properties: {
    name: {
      type: 'string'
    },
    cosplanId: {
      type: 'number'
    },
  }
} as const;

export const CreatePartSchema = {
  body,
  params: {
    type: 'object',
  }
} as const;

export type createPartBody = FromSchema<typeof body>;
