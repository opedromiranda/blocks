import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { LocalStorageService } from '../storage/local-storage/local-storage.service';
import { Storage } from '../storage/abstract/storage';
import { FolderModule } from '../folder/folder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from '../folder/entities';
import { File } from './entities';

@Module({
  imports: [FolderModule, TypeOrmModule.forFeature([Folder, File])],
  providers: [
    FileService,
    FileResolver,

    {
      provide: Storage,
      useFactory: () => {
        return new LocalStorageService(process.env.STORAGE_ROOT);
      },
    },
  ],
})
export class FileModule {}
