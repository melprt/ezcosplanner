import { FromSchema } from 'json-schema-to-ts';

export const body = {
  type: 'object',
  required: ['ids'],
  properties: {
    ids: {
      type: 'array',
      items : {
        type: 'number'
      }
    },
  }
} as const;

export const DeleteTimeEntrySchema = {
  body
} as const;

export type deleteTimeEntryBody = FromSchema<typeof body>;
