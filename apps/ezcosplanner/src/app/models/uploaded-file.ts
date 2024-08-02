import { Cosplan } from "./cosplan";
import { Reference } from "./reference";
import { WipPicture } from "./wip-picture";

export interface UploadedFile {
    id: number;
    path: string;
    cosplan?: Cosplan;
    reference?: Reference;
    wipPicture?: WipPicture;
}