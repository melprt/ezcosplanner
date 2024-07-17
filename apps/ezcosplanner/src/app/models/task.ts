import { WorkingTime } from "./working-time";

export interface Task {
    id: number;
    updatedAt: Date;
    title: string|null; 
    completed: boolean;
    description: string|null;
    workingTimes: WorkingTime[]|[];
}