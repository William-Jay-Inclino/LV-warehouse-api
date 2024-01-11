import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMeqsApproverInput } from './create-meqs-approver.input';
import { REFERENCE_TYPES } from '../entities/meqs.enums';
import { APPROVAL_STATUS } from 'src/__common__/entities';
import { CreateItemWithSupplierInput } from 'src/item/dto/create-item-with-suppliers.input';

registerEnumType(REFERENCE_TYPES, {
  name: 'REFERENCE_TYPES', 
});

registerEnumType(APPROVAL_STATUS, {
  name: 'APPROVAL_STATUS', 
});

@InputType()
export class CreateMeqsInput {

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  jo_id: string | null;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  rv_id: string | null;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  spr_id: string | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  meqs_number: string;

  @Field(() => REFERENCE_TYPES)
  @IsNotEmpty()
  @IsInt()
  reference_type: REFERENCE_TYPES;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  meqs_date: string;

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

  @Field(() => [CreateItemWithSupplierInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemWithSupplierInput)
  items: CreateItemWithSupplierInput[];

  @Field(() => [CreateMeqsApproverInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsApproverInput)
  approvers: CreateMeqsApproverInput[];

}
