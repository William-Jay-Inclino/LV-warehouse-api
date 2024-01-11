import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CanvassService } from './canvass.service';
import { Canvass, RemoveCanvassResponse } from './entities/canvass.entity';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { UpdateCanvassInput } from './dto/update-canvass.input';

@Resolver(() => Canvass)
export class CanvassResolver {
  constructor(private readonly canvassService: CanvassService) {}

  @Mutation(() => Canvass)
  createCanvass(@Args('input') createCanvassInput: CreateCanvassInput) {
    return this.canvassService.create(createCanvassInput);
  }

  @Query(() => [Canvass])
  canvasses() {
    return this.canvassService.findAll();
  }

  @Query(() => Canvass)
  canvass(@Args('id', { type: () => String }) id: string) {
    console.log('canvass')
    return this.canvassService.findOne(id);
  }

  @Mutation(() => Canvass)
  updateCanvass(
    @Args('id') id: string,
    @Args('input') updateCanvassInput: UpdateCanvassInput
  ) {
    return this.canvassService.update(id, updateCanvassInput);
  }

  @Mutation(() => RemoveCanvassResponse)
  removeCanvass(@Args('id', { type: () => String }) id: string) {
    return this.canvassService.remove(id);
  }

  @Query(() => String)
  rc_number() {
    return this.canvassService.findLatestRcNumber()
  }
}
