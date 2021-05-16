import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { File } from './entities';
import { FileService } from './file.service';

@Resolver(() => File)
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(() => [File])
  async files(): Promise<File[]> {
    return await this.fileService.find();
  }

  @Mutation(() => File)
  async upload(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Args({ name: 'folder', type: () => String })
    folder?: string
  ): Promise<File> {
    return await this.fileService.save(filename, createReadStream, folder);
  }
}
