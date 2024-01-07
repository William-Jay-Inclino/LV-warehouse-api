import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Item {

  @Field(() => String)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  brand_id: string;

  @Field(() => String)
  unit_id: string;

  @Field(() => Number)
  quantity: string;

}
