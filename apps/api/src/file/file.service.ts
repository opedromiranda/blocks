import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStream } from 'node:fs';
import { ObjectID, Repository } from 'typeorm';
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

  async findOne(id: string | number | Date | ObjectID) {
    return await this.fileRepository.findOne(id);
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

    console.log({ folder });
    let file = this.fileRepository.create({
      name: filename,
      folder,
    });
    file = await this.fileRepository.save(file);

    await this.storageService.write(file, createReadStream);
    return file;
  }
}
