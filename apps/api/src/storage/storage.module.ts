import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage/local-storage.service';

@Module({
  providers: [LocalStorageService],
  exports: [LocalStorageService],
})
export class StorageModule {}
