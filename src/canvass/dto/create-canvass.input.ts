import { InputType, Field } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateItemInput } from '../../item/dto/create-item.input';

@InputType()
export class CreateCanvassInput {

  @Field(() => String)
  @IsNotEmpty()
  rc_number: string;

  @Field(() => String)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_requested: string;

  @Field(() => String)
  @IsNotEmpty()
  purpose: string;

  @Field(() => String)
  notes: string;

  @Field(() => String)
  @IsNotEmpty()
  requested_by_id: string;

  @Field(() => String)
  @IsNotEmpty()
  noted_by_id: string;

  @Field(() => [CreateItemInput])
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemInput)
  items: CreateItemInput[];

}
