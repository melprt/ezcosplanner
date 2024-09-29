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


export const getBody = {
  type: 'object',
  properties: {
    filters: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
        },
        endDate: {
          type: 'string',
        },
        element: {
          type: 'string',
        },
        task: {
          type: 'string',
        },
      },
      nullable: true,
    },
    skip: {
       type: 'number' 
    },
    take: {
       type: 'number'
    }
  },
  required: ['skip', 'take']
} as const;

export const getTimeEntrySchema = {
  body: getBody,
  params: {
    type: 'object',
    properties: {
      cosplanId: { type: 'number' },
    },
    required: ['cosplanId'],
  },
} as const;

export type deleteTimeEntryBody = FromSchema<typeof body>;
export type getTimeEntryBody = FromSchema<typeof getBody>;
