import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JoService } from './jo.service';
import { JO } from './entities/jo.entity';
import { CreateJoInput } from './dto/create-jo.input';
import { UpdateJoInput } from './dto/update-jo.input';

@Resolver(() => JO)
export class JoResolver {
  constructor(private readonly joService: JoService) {}

  @Mutation(() => JO)
  createJo(@Args('createJoInput') createJoInput: CreateJoInput) {
    return this.joService.create(createJoInput);
  }

  @Query(() => [JO], { name: 'jo' })
  findAll() {
    return this.joService.findAll();
  }

  @Query(() => JO, { name: 'jo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.joService.findOne(id);
  }

  @Mutation(() => JO)
  updateJo(@Args('updateJoInput') updateJoInput: UpdateJoInput) {
    return this.joService.update(updateJoInput.id, updateJoInput);
  }

  @Mutation(() => JO)
  removeJo(@Args('id', { type: () => Int }) id: number) {
    return this.joService.remove(id);
  }
}
