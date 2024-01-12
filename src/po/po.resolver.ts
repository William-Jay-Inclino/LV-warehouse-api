import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PoService } from './po.service';
import { PO } from './entities/po.entity';
import { CreatePoInput } from './dto/create-po.input';
import { UpdatePoInput } from './dto/update-po.input';

@Resolver(() => PO)
export class PoResolver {
  constructor(private readonly poService: PoService) {}

  @Mutation(() => PO)
  createPo(@Args('input') createPoInput: CreatePoInput) {
    return this.poService.create(createPoInput);
  }

  @Query(() => [PO])
  pos() {
    return this.poService.findAll();
  }

  @Query(() => PO)
  po(@Args('id', { type: () => String }) id: string) {
    return this.poService.findOne(id);
  }

  @Mutation(() => PO)
  updatePo(
    @Args('id') id: string,
    @Args('input') updatePoInput: UpdatePoInput
  ) {
    return this.poService.update(id, updatePoInput);
  }

  @Mutation(() => PO)
  removePo(@Args('id', { type: () => String }) id: string) {
    return this.poService.remove(id);
  }

  @Query(() => String)
  po_number() {
    return this.poService.findLatestPoNumber()
  }
  
}
