import { IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly parent?: string;
}
