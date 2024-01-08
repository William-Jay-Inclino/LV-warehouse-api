import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PoService } from './po.service';
import { PO } from './entities/po.entity';
import { CreatePoInput } from './dto/create-po.input';
import { UpdatePoInput } from './dto/update-po.input';

@Resolver(() => PO)
export class PoResolver {
  constructor(private readonly poService: PoService) {}

  @Mutation(() => PO)
  createPo(@Args('createPoInput') createPoInput: CreatePoInput) {
    return this.poService.create(createPoInput);
  }

  @Query(() => [PO], { name: 'po' })
  findAll() {
    return this.poService.findAll();
  }

  @Query(() => PO, { name: 'po' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.poService.findOne(id);
  }

  @Mutation(() => PO)
  updatePo(@Args('updatePoInput') updatePoInput: UpdatePoInput) {
    return this.poService.update(updatePoInput.id, updatePoInput);
  }

  @Mutation(() => PO)
  removePo(@Args('id', { type: () => Int }) id: number) {
    return this.poService.remove(id);
  }
}
