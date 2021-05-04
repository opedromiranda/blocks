import { Injectable } from '@nestjs/common';
import { createWriteStream, ReadStream } from 'fs';
import { Storage } from '../abstract/storage';
import { join } from 'path';

@Injectable()
export class LocalStorageService implements Storage {
  constructor(public readonly rootFolder: string) {}

  async write(filename: string, createReadStream: () => ReadStream) {
    console.log(`here at write ${filename}, ${this.rootFolder}`);
    return new Promise((resolve, reject) => {
      console.log(join(this.rootFolder, filename));
      createReadStream()
        .pipe(createWriteStream(join(this.rootFolder, filename)))
        .on('finish', resolve)
        .on('error', reject);
    });
  }

  read(name: string) {
    console.log('here at read');
    return Buffer.from('0');
  }
}
