import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SprService } from './spr.service';
import { Spr } from './entities/spr.entity';
import { CreateSprInput } from './dto/create-spr.input';
import { UpdateSprInput } from './dto/update-spr.input';

@Resolver(() => Spr)
export class SprResolver {
  constructor(private readonly sprService: SprService) {}

  @Mutation(() => Spr)
  createSpr(@Args('createSprInput') createSprInput: CreateSprInput) {
    return this.sprService.create(createSprInput);
  }

  @Query(() => [Spr], { name: 'spr' })
  findAll() {
    return this.sprService.findAll();
  }

  @Query(() => Spr, { name: 'spr' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sprService.findOne(id);
  }

  @Mutation(() => Spr)
  updateSpr(@Args('updateSprInput') updateSprInput: UpdateSprInput) {
    return this.sprService.update(updateSprInput.id, updateSprInput);
  }

  @Mutation(() => Spr)
  removeSpr(@Args('id', { type: () => Int }) id: number) {
    return this.sprService.remove(id);
  }
}
