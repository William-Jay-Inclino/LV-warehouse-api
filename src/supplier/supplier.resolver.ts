import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Query(() => [Supplier])
  suppliers() {
    return this.supplierService.findAll();
  }
  
  @Query(() => Supplier)
  supplier(@Args('id', { type: () => String }) id: string) {
    return this.supplierService.findOne(id);
  }

  @Mutation(() => Supplier)
  createSupplier(@Args('input') createSupplierInput: CreateSupplierInput) {
    return this.supplierService.create(createSupplierInput);
  }

  @Mutation(() => Supplier)
  updateSupplier(
    @Args('id') id: string,
    @Args('input') updateSupplierInput: UpdateSupplierInput
  ) {
    return this.supplierService.update(id, updateSupplierInput);
  }

  @Mutation(() => Boolean)
  removeSupplier(@Args('id', { type: () => String }) id: string) {
    return this.supplierService.remove(id);
  }
}
