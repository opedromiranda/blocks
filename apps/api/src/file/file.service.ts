import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStream } from 'node:fs';
import { Repository } from 'typeorm';
import { FolderService } from '../folder/folder.service';
import { Storage } from '../storage/abstract/storage';
import { File } from './entities';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,

    private readonly storageService: Storage,
    private readonly folderService: FolderService
  ) {}

  async find() {
    return await this.fileRepository.find({ relations: ['folder'] });
  }

  async save(
    filename: string,
    createReadStream: () => ReadStream,
    folderUUID?: string
  ) {
    let folder = null;
    if (folderUUID) {
      folder = await this.folderService.findOne(folderUUID);
      if (!folder) {
        throw new NotFoundException(`Folder ${folderUUID} not found.`);
      }
    }
    await this.storageService.write(filename, createReadStream);

    console.log({ folder });
    const file = this.fileRepository.create({
      name: filename,
      folder,
    });
    return await this.fileRepository.save(file);
  }
}
