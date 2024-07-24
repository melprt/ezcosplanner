import { Material } from "./material";
import { Task } from "./task";
import { WipPicture } from "./wip-picture";
import { TimeEntry } from "./time-entry";

export interface Part {
    id: number;
    updatedAt: Date;
    name: string; 
    wipPictures: WipPicture[];
    tasks: Task[];
    workingTimes: TimeEntry[];
    materials: Material[];
}