import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Folder } from '../../folder/entities';

@ObjectType()
@Entity()
export class File {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  extension?: string;

  @Field()
  @Column()
  name: string;

  @Field(() => Folder, { nullable: true })
  @ManyToOne(() => Folder, (folder) => folder.files)
  folder?: Folder;
}
