import { TimeEntry } from "./time-entry";

export interface Task {
    id: number;
    updatedAt: Date;
    name: string; 
    completed: boolean;
    description?: string|null;
    TimeEntries?: TimeEntry[];
}