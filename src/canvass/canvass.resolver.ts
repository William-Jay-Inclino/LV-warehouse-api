import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CanvassService } from './canvass.service';
import { Canvass } from './entities/canvass.entity';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { UpdateCanvassInput } from './dto/update-canvass.input';

@Resolver(() => Canvass)
export class CanvassResolver {
  constructor(private readonly canvassService: CanvassService) {}

  @Mutation(() => Canvass)
  createCanvass(@Args('createCanvassInput') createCanvassInput: CreateCanvassInput) {
    return this.canvassService.create(createCanvassInput);
  }

  @Query(() => [Canvass], { name: 'canvass' })
  findAll() {
    return this.canvassService.findAll();
  }

  @Query(() => Canvass, { name: 'canvass' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.canvassService.findOne(id);
  }

  @Mutation(() => Canvass)
  updateCanvass(@Args('updateCanvassInput') updateCanvassInput: UpdateCanvassInput) {
    return this.canvassService.update(updateCanvassInput.id, updateCanvassInput);
  }

  @Mutation(() => Canvass)
  removeCanvass(@Args('id', { type: () => Int }) id: number) {
    return this.canvassService.remove(id);
  }
}
