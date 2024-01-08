import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateItemInput } from '../../item/dto/create-item.input';
import { CreateMeqsApproverInput } from './create-meqs-approver.input';
import { REFERENCE_TYPES } from '../entities/meqs.enums';
import { APPROVAL_STATUS } from 'src/__common__/entities';

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
  jo_id: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  rv_id: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsString()
  spr_id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  meqs_number: string;

  @Field(() => Int)
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

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  requested_by_id: string;

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

  @Field(() => [CreateMeqsApproverInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMeqsApproverInput)
  approvers: CreateMeqsApproverInput[];

}
