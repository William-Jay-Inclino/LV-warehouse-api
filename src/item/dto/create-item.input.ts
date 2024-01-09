import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  brand_id: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  unit_id: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  // @Field(() => [CreateSupplierItemInput], {nullable: true})
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateSupplierItemInput)
  // supplier_items?: CreateSupplierItemInput[];

}