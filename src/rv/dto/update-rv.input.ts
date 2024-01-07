import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray, ValidateNested, IsInt } from 'class-validator';
import { CreateRvInput } from './create-rv.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateItemInput } from 'src/item/dto/create-item.input';

@InputType()
export class UpdateRvInput extends PartialType(CreateRvInput) {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  canvass_id?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  supervisor_id?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  classification_id?: string;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_requested?: string;

  @Field(() => String)
  @IsOptional()
  @IsString()
  work_order_no?: string;

  @Field(() => String)
  @IsOptional()
  @IsString()
  work_order_date?: string;

  @Field(() => [CreateItemInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  items: CreateItemInput[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  purpose?: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  notes?: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  status?: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  canceller_id?: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  requested_by_id?: string;

}
