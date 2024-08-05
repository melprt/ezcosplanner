import { CosplanCategory as CosplanCategoryEnum, CosplanStatus as CosplanStatusEnum } from '@prisma/client';
import { FromSchema } from 'json-schema-to-ts';

// const properties = {
//   name: {
//     type: 'string'
//   },
//   fandom: {
//     type: 'string'
//   },
//   category: {
//     type: 'string',
//     enum: Object.values(CosplanCategoryEnum)
//   },
// };  


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
  }
} as const;

export const createBody = {
  type: 'object',
  required: ['name', 'fandom', 'category'],
  // properties: {...properties, fileId: {type: 'number'}}
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
    fileId: {
      type: 'number'
    }
  }
  
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

export const createCosplanStatusSchema = {
  body,
  params: {
    type: 'object',
  }
} as const;


export type CreateCosplanBody = FromSchema<typeof createBody>;
export type UpdateCosplanBody = FromSchema<typeof body>;
export type UpdateCosplanStatusBody = FromSchema<typeof statusBody>;
