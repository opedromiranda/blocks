import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './entities';
import { File } from '../file/entities';
import { FolderResolver } from './folder.resolver';
import { FolderService } from './folder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, File])],
  providers: [FolderService, FolderResolver],
  exports: [FolderService],
})
export class FolderModule {}
