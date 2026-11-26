import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { invalidFileType } from '../upload/upload.options';

const ALLOWED_FORMATS = ['jpeg', 'png', 'webp', 'tiff', 'heif'];
const PUBLIC_PREFIX = '/uploads/';
export const AVATAR_RESIZE = { width: 512, height: 512, fit: 'cover' } as const;

@Injectable()
export class StorageService {
  private readonly root = path.resolve(process.env.UPLOAD_DIR ?? 'uploads');

  async saveImage(
    buffer: Buffer,
    folder: string,
    field: string,
    resize: sharp.ResizeOptions,
  ): Promise<string> {
    const webp = await this.toWebp(buffer, field, resize);
    const relative = path.posix.join(folder, `${randomUUID()}.webp`);
    const absolute = this.resolveInside(relative);

    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, webp);
    return PUBLIC_PREFIX + relative;
  }

  async remove(url: string | null | undefined): Promise<void> {
    if (!url?.startsWith(PUBLIC_PREFIX)) return;
    await rm(this.resolveInside(url.slice(PUBLIC_PREFIX.length)), {
      force: true,
    });
  }

  async removeDir(folder: string): Promise<void> {
    await rm(this.resolveInside(folder), { recursive: true, force: true });
  }

  private resolveInside(relative: string): string {
    const absolute = path.resolve(this.root, relative);
    if (!absolute.startsWith(this.root + path.sep)) {
      throw new Error(`Path outside upload dir: ${relative}`);
    }
    return absolute;
  }

  private async toWebp(
    buffer: Buffer,
    field: string,
    resize: sharp.ResizeOptions,
  ) {
    try {
      const image = sharp(buffer);
      const { format, compression } = await image.metadata();

      const allowed = format !== undefined && ALLOWED_FORMATS.includes(format);
      const isHeic = format === 'heif' && compression !== 'av1';
      if (!allowed || isHeic) throw invalidFileType(field);

      return await image
        .rotate()
        .resize(resize)
        .webp({ quality: 80 })
        .toBuffer();
    } catch {
      throw invalidFileType(field);
    }
  }
}
