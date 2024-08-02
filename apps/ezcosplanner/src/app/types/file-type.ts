export const fileTypes = [
   'cosplan',
   'reference',
   'wip',
] as const;


export type FileType = typeof fileTypes[number];

