import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '../../file/entities';
import { Folder as IFolder } from '@blocks/data';
@Entity()
@ObjectType()
export class Folder implements IFolder {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [File], { defaultValue: [] })
  @OneToMany(() => File, (file) => file.folder)
  files: File[];

  @Field(() => Folder, { nullable: true })
  @ManyToOne(() => Folder, (folder) => folder.children)
  parent?: Folder;

  @Field(() => [Folder], { defaultValue: [] })
  @OneToMany(() => Folder, (folder) => folder.parent)
  children?: Folder[];
}
