import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Brand } from 'src/brand/entities/brand.entity';
import { Unit } from 'src/unit/entities/unit.entity';

@ObjectType()
export class Item {

  @Field(() => String)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  brand_id: string;

  @Field(() => Brand)
  brand: Brand;

  @Field(() => String)
  unit_id: string;

  @Field(() => Unit)
  unit: Unit;

  @Field(() => Int)
  quantity: string;

}

