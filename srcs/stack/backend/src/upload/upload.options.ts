import { BadRequestException } from '@nestjs/common';
import type { MulterModuleOptions } from '@nestjs/platform-express';

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export function invalidFileType(field: string) {
  return new BadRequestException({
    statusCode: 400,
    errors: [{ field, code: 'INVALID_FILE_TYPE' }],
  });
}

export function imageUploadOptions(field: string): MulterModuleOptions {
  return {
    limits: { fileSize: MAX_IMAGE_SIZE, files: 1, fields: 0 },
    fileFilter: (_req, filed, callback) => {
      if (
        !filed.mimetype.startsWith('image/') ||
        filed.mimetype === 'image/svg+xml'
      ) {
        return callback(invalidFileType(field), false);
      }
      callback(null, true);
    },
  };
}
