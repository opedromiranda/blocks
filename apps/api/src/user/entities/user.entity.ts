import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Field()
  @Column({ unique: true, length: 50 })
  username: string;

  @Field()
  @Column()
  password: string;

  // TODO: add 2FA
}
