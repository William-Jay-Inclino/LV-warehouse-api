import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Employee {

  @Field(() => String)
  id: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  middlename?: string;

  @Field(() => String)
  lastname: string;

  @Field(() => Number)
  position: number;

  @Field(() => String)
  department_id: string;
  
}
