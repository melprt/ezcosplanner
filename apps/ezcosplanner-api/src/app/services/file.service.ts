import { MultipartFile, MultipartValue } from '@fastify/multipart';
import { UploadedFile, PrismaClient } from '@prisma/client';
import fs from 'node:fs';
import { pipeline } from 'node:stream';
import util from 'node:util';

export const fileTypes = ['cosplan', 'reference', 'wip'] as const;

export type FileType = (typeof fileTypes)[number];

export async function getReadStreamFromFileById(
  prisma: PrismaClient,
  id: number
): Promise<{ stream: fs.ReadStream; mimeType: string } | null> {
  const file = await prisma.uploadedFile.findUnique({
    where: {
      id,
    },
  });

  if (file) {
    const fileName = file.path;
    const stream = fs.createReadStream(fileName);

    return { stream, mimeType: file.mimeType };
  }

  return null;
}

export async function createFile(
  prisma: PrismaClient,
  path: string,
  mimeType: string,
  objectId: number,
  fileType: FileType
): Promise<UploadedFile> {
  switch (fileType) {
    case 'cosplan':
      return await prisma.uploadedFile.create({
        data: {
          path,
          mimeType,
          cosplan: {
            connect: {
              id: objectId,
            },
          },
        },
        include: {
          cosplan: true,
        },
      });
      break;
    case 'reference':
      return await prisma.uploadedFile.create({
        data: {
          path,
          mimeType,
          reference: {
            connect: {
              id: objectId,
            },
          },
        },
        include: {
          reference: true,
        },
      });
      break;
    case 'wip':
      return await prisma.uploadedFile.create({
        data: {
          path,
          mimeType,
          wipPicture: {
            connect: {
              id: objectId,
            },
          },
        },
        include: {
          wipPicture: true,
        },
      });
      break;
  }
}

export async function saveFile(
  prisma: PrismaClient,
  data: MultipartFile | undefined
): Promise<UploadedFile|null> {
  if (data) {
    const pump = util.promisify(pipeline);
    const entityId = data.fields.entityId;
    const fileType = data.fields.fileType;

    if (entityId && fileType) {
      const entityIdValue = (entityId as MultipartValue<string>).value;
      const fileTypeValue = (fileType as MultipartValue<FileType>).value;

      const uploadedFilePath = `./uploads/${fileTypeValue}/${data.filename}`;
      await pump(data.file, fs.createWriteStream(uploadedFilePath));

      return await createFile(
        prisma,
        uploadedFilePath,
        data.mimetype,
        +entityIdValue,
        fileTypeValue
      );
    }
  }
  return null;
}

export async function deleteFile(
  prisma: PrismaClient,
  id: number
): Promise<void> {
  await prisma.uploadedFile.delete({
    where: {
      id,
    },
  });
}
