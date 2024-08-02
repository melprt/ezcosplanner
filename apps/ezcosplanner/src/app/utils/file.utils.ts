export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, {
    lastModified: new Date().getTime(),
    type: blob.type,
  });
}
