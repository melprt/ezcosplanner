import { TimeEntry } from "./time-entry";

export interface Task {
    id: number;
    updatedAt: Date;
    name: string|null; 
    completed: boolean;
    description: string|null;
    timeEntries: TimeEntry[]|[];
}