import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeqsService } from './meqs.service';
import { MEQS } from './entities/meqs.entity';
import { CreateMeqsInput } from './dto/create-meqs.input';
import { UpdateMeqsInput } from './dto/update-meqs.input';

@Resolver(() => MEQS)
export class MeqsResolver {
  constructor(private readonly meqsService: MeqsService) {}

  @Mutation(() => MEQS)
  createMeqs(@Args('input') createMeqInput: CreateMeqsInput) {
    return this.meqsService.create(createMeqInput);
  }

  @Query(() => [MEQS])
  meqs() {
    return this.meqsService.findAll();
  }

  @Query(() => MEQS)
  meq(@Args('id', { type: () => String }) id: string) {
    return this.meqsService.findOne(id);
  }

  @Mutation(() => MEQS)
  updateMeqs(
    @Args('id') id: string,
    @Args('input') updateRvInput: UpdateMeqsInput
  ) {
    return this.meqsService.update(id, updateRvInput);
  }

  @Mutation(() => MEQS)
  removeMeqs(@Args('id', { type: () => String }) id: string) {
    return this.meqsService.remove(id);
  }

  @Query(() => String)
  meqs_number() {
    return this.meqsService.findLatestMeqsNumber()
  }
}
