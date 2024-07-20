export const CosplanCategories = [
   'VIDEO_GAME',
   'ANIME',
   'OC',
   'SERIE',
   'MOVIE',
   'OTHER',
] as const;


export type CosplanCategory = typeof CosplanCategories[number];

