import { Injectable } from '@nestjs/common';
import { createWriteStream, ReadStream, promises, createReadStream } from 'fs';
import { Storage } from '../abstract/storage';
import { join } from 'path';
import { File } from '../../file/entities';

const { mkdir } = promises;

@Injectable()
export class LocalStorageService implements Storage {
  constructor(public readonly rootFolder: string) {}

  private getFileFolder(file: File) {
    return join(this.rootFolder, file.uuid);
  }

  private getFilePath(file: File) {
    return join(this.getFileFolder(file), file.name);
  }

  async write(file: File, createReadStream: () => ReadStream) {
    const fileFolder = this.getFileFolder(file);
    await mkdir(fileFolder);

    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(this.getFilePath(file)))
        .on('finish', resolve)
        .on('error', reject);
    });
  }

  async read(file: File) {
    return createReadStream(this.getFilePath(file));
  }
}
