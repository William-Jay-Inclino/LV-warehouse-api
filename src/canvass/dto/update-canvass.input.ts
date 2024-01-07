// update-canvass.input.ts

import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { CreateCanvassInput } from './create-canvass.input';
import { CreateItemInput } from '../../item/dto/create-item.input';

@InputType()
export class UpdateCanvassInput extends PartialType(CreateCanvassInput) {

  // @Field(() => String, { nullable: true })
  // @IsOptional()
  // rc_number?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  date_requested?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  purpose?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  notes?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  requested_by_id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  noted_by_id?: string;

  @Field(() => [CreateItemInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  items: CreateItemInput[];

}
