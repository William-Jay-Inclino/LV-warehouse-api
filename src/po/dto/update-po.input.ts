import { CreatePoInput } from './create-po.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePoInput extends PartialType(CreatePoInput) {
  @Field(() => Int)
  id: number;
}
