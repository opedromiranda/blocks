import { User } from './entities';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GraphQLString } from 'graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async register(
    @Args({ name: 'username', type: () => GraphQLString })
    username: string,

    @Args({ name: 'password', type: () => GraphQLString })
    password: string
  ) {
    return this.userService.create({ username, password });
  }

  @Mutation(() => GraphQLString)
  async login(@Args('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    return this.userService.createToken(user);
  }
}
