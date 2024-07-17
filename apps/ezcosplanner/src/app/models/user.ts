import { Cosplan } from "./cosplan";

export interface User {
    id: number;
    email: string;
    firstname: string|null;
    lastname: string|null;
    avatar: string|null;
    cosplans: Cosplan[]|[];
}