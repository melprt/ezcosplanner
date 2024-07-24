import { MaterialCategory } from "../types/material-category";

export interface Material {
    id: number;
    name: string; 
    bought: boolean;
    category: MaterialCategory;
    price: number;
    //TODO check if null or undefined
    url: string|null;
}