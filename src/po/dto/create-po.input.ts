import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateItemInput } from '../../item/dto/create-item.input';
import { CreatePoApproverInput } from './create-po-approver.input';
import { APPROVAL_STATUS } from 'src/__common__/entities';

registerEnumType(APPROVAL_STATUS, {
  name: 'APPROVAL_STATUS', 
});

@InputType()
export class CreatePoInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  meqs_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  po_number: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsString()
  supplier_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  po_date: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  payment_terms: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  purpose: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  notes?: string | null;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  status: APPROVAL_STATUS;

  @Field(() => [CreateItemInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  items: CreateItemInput[];

  @Field(() => [CreatePoApproverInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePoApproverInput)
  approvers: CreatePoApproverInput[];

}
