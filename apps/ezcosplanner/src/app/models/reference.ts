import { UploadedFile } from "./uploaded-file";

export interface Reference {
    id: number;
    url?: string|null;
    file?: UploadedFile; 
}