import { CosplanCategory } from '../types/cosplan-category';
import { CosplanStatus } from '../types/cosplan-status';
import { Part } from './part';
import { Reference } from './reference';

export interface Cosplan {
    id: number;
    name: string;
    image: string|null;
    status: CosplanStatus;
    fandom: string;
    category: CosplanCategory;
    deadline: Date|null;
    parts: Part[];
    reference: Reference[];
}

export interface CosplanUpdateData {
    name: string;
    fandom: string;
    category: CosplanCategory;
}
