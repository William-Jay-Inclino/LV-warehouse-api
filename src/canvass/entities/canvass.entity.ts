import { ObjectType, Field } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { CanvassItem } from './canvass-item.entity';

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

  @Field(() => Employee)
  requested_by: Employee;

  @Field(() => String)
  noted_by_id: string;

  @Field(() => Employee)
  noted_by: Employee;

  @Field(() => [CanvassItem])
  canvass_items: CanvassItem[];
}


