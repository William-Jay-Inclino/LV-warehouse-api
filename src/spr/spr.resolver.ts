import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SprService } from './spr.service';
import { SPR } from './entities/spr.entity';
import { CreateSprInput } from './dto/create-spr.input';
import { UpdateSprInput } from './dto/update-spr.input';

@Resolver(() => SPR)
export class SprResolver {
  constructor(private readonly sprService: SprService) {}

  @Mutation(() => SPR)
  createSpr(@Args('createSprInput') createSprInput: CreateSprInput) {
    return this.sprService.create(createSprInput);
  }

  @Query(() => [SPR], { name: 'spr' })
  findAll() {
    return this.sprService.findAll();
  }

  @Query(() => SPR, { name: 'spr' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sprService.findOne(id);
  }

  @Mutation(() => SPR)
  updateSpr(@Args('updateSprInput') updateSprInput: UpdateSprInput) {
    return this.sprService.update(updateSprInput.id, updateSprInput);
  }

  @Mutation(() => SPR)
  removeSpr(@Args('id', { type: () => Int }) id: number) {
    return this.sprService.remove(id);
  }
}
