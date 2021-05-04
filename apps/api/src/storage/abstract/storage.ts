import { ReadStream } from 'node:fs';

export abstract class Storage {
  write(
    filename: string,
    createReadStream: () => ReadStream
  ): Promise<unknown> {
    throw new Error('Not implemented');
  }

  read(name: string): Buffer {
    throw new Error('Not implemented');
  }
}
