import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PoService } from './po.service';
import { Po } from './entities/po.entity';
import { CreatePoInput } from './dto/create-po.input';
import { UpdatePoInput } from './dto/update-po.input';

@Resolver(() => Po)
export class PoResolver {
  constructor(private readonly poService: PoService) {}

  @Mutation(() => Po)
  createPo(@Args('createPoInput') createPoInput: CreatePoInput) {
    return this.poService.create(createPoInput);
  }

  @Query(() => [Po], { name: 'po' })
  findAll() {
    return this.poService.findAll();
  }

  @Query(() => Po, { name: 'po' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.poService.findOne(id);
  }

  @Mutation(() => Po)
  updatePo(@Args('updatePoInput') updatePoInput: UpdatePoInput) {
    return this.poService.update(updatePoInput.id, updatePoInput);
  }

  @Mutation(() => Po)
  removePo(@Args('id', { type: () => Int }) id: number) {
    return this.poService.remove(id);
  }
}
