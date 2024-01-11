import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RvService } from './rv.service';
import { RV } from './entities/rv.entity';
import { CreateRvInput } from './dto/create-rv.input';
import { UpdateRvInput } from './dto/update-rv.input';
import { RVApproverSetting } from './entities/rv-approver-setting.entity';
import { RemoveResponse } from 'src/__common__/entities';

@Resolver(() => RV)
export class RvResolver {
  constructor(private readonly rvService: RvService) {}

  @Mutation(() => RV)
  createRv(@Args('input') createRvInput: CreateRvInput) {
    return this.rvService.create(createRvInput);
  }

  @Query(() => [RV])
  rvs() {
    return this.rvService.findAll();
  }

  @Query(() => [RVApproverSetting])
  default_rv_approvers() {
    return this.rvService.findAllDefaultRvApprovers();
  }

  @Query(() => RV)
  rv(@Args('id', { type: () => String }) id: string) {
    return this.rvService.findOne(id);
  }

  @Mutation(() => RV)
  updateRv(
    @Args('id') id: string,
    @Args('input') updateRvInput: UpdateRvInput
  ) {
    return this.rvService.update(id, updateRvInput);
  }

  @Mutation(() => RemoveResponse)
  removeRv(@Args('id', { type: () => String }) id: string) {
    return this.rvService.remove(id);
  }

  @Query(() => String)
  rv_number() {
    return this.rvService.findLatestRvNumber()
  }

}
