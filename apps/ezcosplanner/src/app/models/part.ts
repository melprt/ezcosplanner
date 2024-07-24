import { Material } from "./material";
import { Task } from "./task";
import { WipPicture } from "./wip-picture";
import { WorkingTime } from "./working-time";

export interface Part {
    id: number;
    updatedAt: Date;
    name: string; 
    wipPictures: WipPicture[];
    tasks: Task[];
    workingTimes: WorkingTime[];
    materials: Material[];
}