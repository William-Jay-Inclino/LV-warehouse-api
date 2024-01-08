import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsArray, ValidateNested, IsInt } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateItemInput } from 'src/item/dto/create-item.input';

@InputType()
export class UpdateRvInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  supervisor_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  classification_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_requested?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  work_order_no?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  work_order_date?: string;

  @Field(() => [CreateItemInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  items: CreateItemInput[];

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  purpose?: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?: string;

  @Field(() => Int, {nullable: true})
  @IsInt()
  @IsOptional()
  status?: number;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  canceller_id?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  requested_by_id?: string;

}
