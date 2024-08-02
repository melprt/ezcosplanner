import { FromSchema } from 'json-schema-to-ts';

export const fileTypes = ['cosplan' , 'reference' , 'wip'] as const;

export const body = {
  type: 'object',
  required: ['entityId', 'type'],
  properties: {
    entityId: {
      type: 'number'
    },
    type: {
      type: 'string',
      enum: fileTypes,
    },
  },
} as const;

export const saveFileSchema = {
  body,
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id']
  }
} as const;

export type saveFileBody = FromSchema<typeof body>;
