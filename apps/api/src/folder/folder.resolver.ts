import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLID, GraphQLString } from 'graphql';
import { Folder } from './entities';
import { FolderService } from './folder.service';
import { AuthGuard } from '../user/auth.guard';

@Resolver(() => Folder)
export class FolderResolver {
  constructor(private readonly folderService: FolderService) {}

  @Mutation(() => Folder)
  async createFolder(
    @Args({ name: 'name', type: () => GraphQLString })
    name: string,

    @Args({ name: 'parent', type: () => GraphQLID, nullable: true })
    parent: string
  ): Promise<Folder> {
    return await this.folderService.create({ name, parent });
  }

  // @ResolveField()
  // files(@Parent() folder: Folder): File[] {
  //   console.log('here at resolver with ', folder);
  //   return [];
  // }

  // @ResolveField()
  // async parent(@Parent() folder: Folder): Promise<Folder> {
  //   return await this.folderService.findOne(folder.parent);
  // }

  @Query(() => [Folder])
  @UseGuards(new AuthGuard())
  async folders(): Promise<Folder[]> {
    return await this.folderService.find();
  }
}
