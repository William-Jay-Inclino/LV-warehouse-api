import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeqsService } from './meqs.service';
import { Meq } from './entities/meqs.entity';
import { CreateMeqInput } from './dto/create-meq.input';
import { UpdateMeqInput } from './dto/update-meq.input';

@Resolver(() => Meq)
export class MeqsResolver {
  constructor(private readonly meqsService: MeqsService) {}

  @Mutation(() => Meq)
  createMeq(@Args('createMeqInput') createMeqInput: CreateMeqInput) {
    return this.meqsService.create(createMeqInput);
  }

  @Query(() => [Meq], { name: 'meqs' })
  findAll() {
    return this.meqsService.findAll();
  }

  @Query(() => Meq, { name: 'meq' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.meqsService.findOne(id);
  }

  @Mutation(() => Meq)
  updateMeq(@Args('updateMeqInput') updateMeqInput: UpdateMeqInput) {
    return this.meqsService.update(updateMeqInput.id, updateMeqInput);
  }

  @Mutation(() => Meq)
  removeMeq(@Args('id', { type: () => Int }) id: number) {
    return this.meqsService.remove(id);
  }
}
