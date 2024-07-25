import { Cosplan } from "./cosplan";
import { Reference } from "./reference";
import { WipPicture } from "./wip-picture";

export interface File {
    id: number;
    path: string;
    cosplan?: Cosplan;
    reference?: Reference;
    wipPIcture?: WipPicture;

}