import { UploadedFile } from "./uploaded-file";

export interface WipPicture {
    id: number;
    createdAt: Date;
    file: UploadedFile;
    title?: string|null;
    smallDesc?: string|null;
}