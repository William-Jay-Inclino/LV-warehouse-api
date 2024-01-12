import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SupplierItem } from 'src/item/entities/supplier-item.entity';
import { PO } from 'src/po/entities/po.entity';

@ObjectType()
export class Supplier {
  
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  contact: string;

  @Field(() => [SupplierItem])
  supplier_items: SupplierItem[];

  @Field(() => [PO])
  pos: PO[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
