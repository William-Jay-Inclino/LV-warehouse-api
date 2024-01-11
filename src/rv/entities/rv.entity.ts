import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { RVItem } from './rv-item.entity';
import { Canvass } from 'src/canvass/entities/canvass.entity';
import { Classification } from 'src/classification/entities/classification.entity';
import { RVApprover } from './rv-approver.entity';
import { APPROVAL_STATUS } from 'src/__common__/entities';

registerEnumType(APPROVAL_STATUS, {
  name: 'APPROVAL_STATUS', 
});

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

  @Field(() => String, {nullable: true})
  classification_id: string | null;

  @Field(() => Classification, {nullable: true})
  classification: Classification | null

  @Field(() => String)
  rv_number: string;

  @Field(() => String)
  date_requested: string;

  @Field(() => String, {nullable: true})
  work_order_no: string;

  @Field(() => String, {nullable: true})
  work_order_date: string;

  @Field(() => [RVItem])
  rv_items: RVItem[];

  @Field(() => [RVApprover])
  rv_approvers: RVApprover[];

  @Field(() => String)
  purpose: string;

  @Field(() => String, {nullable: true})
  notes: string;

  @Field(() => APPROVAL_STATUS)
  status: APPROVAL_STATUS

  @Field(() => String, {nullable: true})
  canceller_id: string;

  @Field(() => Employee, {nullable: true})
  canceller: Employee;

  @Field(() => String)
  requested_by_id: string;

  @Field(() => Employee)
  requested_by: Employee;

  @Field(() => Boolean)
  is_referenced: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
