import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Canvass {

  @Field(() => String)
  id: string;

  @Field(() => String)
  rc_number: string;

  @Field(() => String)
  date_requested: string;

  @Field(() => String)
  purpose: string;

  @Field(() => String)
  notes: string;

  @Field(() => String)
  requested_by_id: string;

  @Field(() => String)
  noted_by_id: string;

}
