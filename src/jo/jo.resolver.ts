import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JoService } from './jo.service';
import { Jo } from './entities/jo.entity';
import { CreateJoInput } from './dto/create-jo.input';
import { UpdateJoInput } from './dto/update-jo.input';

@Resolver(() => Jo)
export class JoResolver {
  constructor(private readonly joService: JoService) {}

  @Mutation(() => Jo)
  createJo(@Args('createJoInput') createJoInput: CreateJoInput) {
    return this.joService.create(createJoInput);
  }

  @Query(() => [Jo], { name: 'jo' })
  findAll() {
    return this.joService.findAll();
  }

  @Query(() => Jo, { name: 'jo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.joService.findOne(id);
  }

  @Mutation(() => Jo)
  updateJo(@Args('updateJoInput') updateJoInput: UpdateJoInput) {
    return this.joService.update(updateJoInput.id, updateJoInput);
  }

  @Mutation(() => Jo)
  removeJo(@Args('id', { type: () => Int }) id: number) {
    return this.joService.remove(id);
  }
}
