import { InputType, Field, Int } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateItemInput } from '../../item/dto/create-item.input';
import { CreateRvApproverInput } from './create-rv-approver.input';

@InputType()
export class CreateRvInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  canvass_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  supervisor_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  classification_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  rv_number: string;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_requested: string;

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

  @Field(() => [CreateRvApproverInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRvApproverInput)
  approvers: CreateRvApproverInput[];

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  purpose: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  notes?: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  status: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  requested_by_id: string;



}
