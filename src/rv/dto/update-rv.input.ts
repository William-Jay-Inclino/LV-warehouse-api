import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray, ValidateNested, IsInt } from 'class-validator';
import { CreateRvInput } from './create-rv.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateItemInput } from 'src/item/dto/create-item.input';

@InputType()
export class UpdateRvInput extends PartialType(CreateRvInput) {

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  canvass_id?: string;

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  supervisor_id?: string;

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  classification_id?: string;

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_requested?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  work_order_no?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  work_order_date?: string;

  @Field(() => [CreateItemInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  items: CreateItemInput[];

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  purpose?: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?: string;

  @Field(() => Int, {nullable: true})
  @IsInt()
  @IsNotEmpty()
  status?: number;

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  canceller_id?: string;

  @Field(() => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  requested_by_id?: string;

}
