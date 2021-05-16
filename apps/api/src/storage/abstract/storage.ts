import { ReadStream } from 'node:fs';
import { File } from '../../file/entities';

export abstract class Storage {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  write(file: File, createReadStream: () => ReadStream): Promise<unknown> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  read(file: File): Promise<ReadStream> {
    throw new Error('Not implemented');
  }
}
