export interface WipPicture {
    id: number;
    createdAt: Date;
    image: File;
    title?: string|null;
    smallDesc?: string|null;
}