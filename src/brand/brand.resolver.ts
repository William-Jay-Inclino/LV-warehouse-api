import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BrandService } from './brand.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';

@Resolver(() => Brand)
export class BrandResolver {
  constructor(private readonly brandService: BrandService) {}

  @Query(() => [Brand])
  brands() {
    return this.brandService.findAll();
  }
  
  @Query(() => Brand)
  brand(@Args('id', { type: () => String }) id: string) {
    return this.brandService.findOne(id);
  }

  @Mutation(() => Brand)
  createBrand(@Args('data') createBrandInput: CreateBrandInput) {
    return this.brandService.create(createBrandInput);
  }

  @Mutation(() => Brand)
  updateBrand(
    @Args('id') id: string,
    @Args('data') updateBrandInput: UpdateBrandInput
  ) {
    return this.brandService.update(id, updateBrandInput);
  }

  @Mutation(() => Boolean)
  removeBrand(@Args('id', { type: () => String }) id: string) {
    return this.brandService.remove(id);
  }
}
