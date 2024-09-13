import { FromSchema } from 'json-schema-to-ts';

export const body = {
  type: 'object',
  required: ['ids'],
  properties: {
    ids: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
  },
} as const;

export const deleteTimeEntrySchema = {
  body,
} as const;

export const getTimeEntrySchema = {
  querystring: {
    type: 'object',
    properties: {
      offset: { type: 'number' },
      limit: { type: 'number' }
    },
    required: ['offset', 'limit']
  },
  params: {
    type: 'object',
    properties: {
      cosplanId: { type: 'number' },
    },
    required: ['cosplanId'],
  },
} as const;

export type deleteTimeEntryBody = FromSchema<typeof body>;
