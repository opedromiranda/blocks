import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './entities';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder> // private readonly storageService: Storage
  ) {}

  async create(createFolderDto: CreateFolderDto) {
    const { parent: parentUUID } = createFolderDto;
    let parent = null;
    if (parentUUID) {
      parent = await this.findOne(parentUUID);
      if (!parent) {
        throw new NotFoundException(`Parent folder ${parentUUID} not found.`);
      }
    }

    const folder = this.folderRepository.create({
      ...createFolderDto,
      parent,
    });
    return await this.folderRepository.save(folder);
  }

  async find() {
    return await this.folderRepository.find({ relations: ['files'] });
  }

  async findOne(id: string) {
    return await this.folderRepository.findOne(id, { relations: ['files'] });
  }
}
