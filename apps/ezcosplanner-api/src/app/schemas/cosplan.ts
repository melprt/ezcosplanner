import { CosplanCategory as CosplanCategoryEnum } from '@prisma/client';
import { FromSchema } from 'json-schema-to-ts';

export const body = {
  type: 'object',
  required: ['name', 'fandom', 'category'],
  properties: {
    name: {
      type: 'string'
    },
    fandom: {
      type: 'string'
    },
    category: {
      type: 'string',
      enum: Object.values(CosplanCategoryEnum)
    },
  },
} as const;

export const updateCosplanSchema = {
  body,
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id']
  }
} as const;

export type UpdateCosplanBody = FromSchema<typeof body>;
