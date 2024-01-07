import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateItemInput {

  @Field(() => String)
  @IsNotEmpty()
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  brand_id: string;

  @Field(() => String)
  @IsNotEmpty()
  unit_id: string;

  @Field(() => Int)
  @IsInt()
  quantity: number;

}