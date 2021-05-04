import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '../../file/entities';

@Entity()
@ObjectType()
export class Folder {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Field()
  @Column()
  name: string;

  // @Field()
  // @Column({ default: false })
  // isRoot: boolean;

  // @Field()
  // parent: Folder;

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
