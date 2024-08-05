import { CosplanCategory } from "./cosplan-category";

export interface CosplanForm {
    name: string;
    fandom: string;
    category: CosplanCategory;
    fileId?: number|null;
  }