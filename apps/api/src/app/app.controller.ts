import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from '../file/file.service';
import { Storage } from '../storage/abstract/storage';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly fileService: FileService,
    private readonly storageService: Storage
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get(':uuid')
  async getFile(@Param('uuid') uuid: string, @Res() res: Response) {
    const file = await this.fileService.findOne({ uuid });
    if (!file) {
      throw new NotFoundException();
    }

    const fileStream = await this.storageService.read(file);
    fileStream.pipe(res);
  }
}
