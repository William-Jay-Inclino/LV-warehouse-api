import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UnitService } from './unit.service';
import { Unit } from './entities/unit.entity';
import { CreateUnitInput } from './dto/create-unit.input';
import { UpdateUnitInput } from './dto/update-unit.input';

@Resolver(() => Unit)
export class UnitResolver {
  constructor(private readonly unitService: UnitService) {}

  @Query(() => [Unit])
  units() {
    return this.unitService.findAll();
  }
  
  @Query(() => Unit)
  unit(@Args('id', { type: () => String }) id: string) {
    return this.unitService.findOne(id);
  }

  @Mutation(() => Unit)
  createUnit(@Args('data') createUnitInput: CreateUnitInput) {
    return this.unitService.create(createUnitInput);
  }

  @Mutation(() => Unit)
  updateUnit(
    @Args('id') id: string,
    @Args('data') updateUnitInput: UpdateUnitInput
  ) {
    return this.unitService.update(id, updateUnitInput);
  }

  @Mutation(() => Boolean)
  removeUnit(@Args('id', { type: () => String }) id: string) {
    return this.unitService.remove(id);
  }
}
