import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { RVItem } from './rv-item.entity';
import { Canvass } from 'src/canvass/entities/canvass.entity';
import { Classification } from 'src/classification/entities/classification.entity';
import { RVApprover } from './rv-approver.entity';

@ObjectType()
export class RV {
  
  @Field(() => String)
  id: string;

  @Field(() => String)
  canvass_id: string;

  @Field(() => Canvass)
  canvass: Canvass;

  @Field(() => String)
  supervisor_id: string;

  @Field(() => Employee)
  supervisor: Employee;

  @Field(() => String)
  classification_id: string;

  @Field(() => Classification)
  classification: Classification

  @Field(() => String)
  rv_number: string;

  @Field(() => String)
  date_requested: string;

  @Field(() => String)
  work_order_no: string;

  @Field(() => String)
  work_order_date: string;

  @Field(() => [RVItem])
  rv_items: RVItem[];

  @Field(() => [RVApprover])
  approvers: RVApprover[];

  @Field(() => String)
  purpose: string;

  @Field(() => String)
  notes: string;

  @Field(() => Int)
  status: number

  @Field(() => String)
  canceller_id: string;

  @Field(() => Employee)
  canceller: Employee;

  @Field(() => String)
  requested_by_id: string;

  @Field(() => Employee)
  requested_by: Employee;

}
