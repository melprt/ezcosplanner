import { CosplanCategory as CosplanCategoryEnum, CosplanStatus as CosplanStatusEnum } from '@prisma/client';
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

export const statusBody = {
  type: 'object',
  required: ['status'],
  properties: {
    status: {
      type: 'string',
      enum: Object.values(CosplanStatusEnum)
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


export const updateCosplanStatusSchema = {
  body: statusBody,
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id']
  }
} as const;


export type UpdateCosplanBody = FromSchema<typeof body>;
export type UpdateCosplanStatusBody = FromSchema<typeof statusBody>;
