import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { APPROVAL_STATUS } from 'src/__common__/entities';
import { Employee } from 'src/employee/entities/employee.entity';
import { MEQS } from 'src/meqs/entities/meqs.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { POApprover } from './po-approver.entity';
import { POItem } from './po-item.entity';

registerEnumType(APPROVAL_STATUS, {
  name: 'APPROVAL_STATUS', 
});

@ObjectType()
export class PO {

  @Field(() => String)
  id: string;

  @Field(() => String)
  meqs_id: string;

  @Field(() => MEQS)
  meqs: MEQS;

  @Field(() => String)
  po_number: string;

  @Field(() => String)
  supplier_id: string;

  @Field(() => Supplier)
  supplier: Supplier;

  @Field(() => String)
  po_date: string;

  @Field(() => String)
  payment_terms: string;

  @Field(() => String)
  purpose: string;

  @Field(() => String, {nullable: true})
  notes: string | null;

  @Field(() => APPROVAL_STATUS)
  status: APPROVAL_STATUS;

  @Field(() => String, {nullable: true})
  canceller_id: string;

  @Field(() => Employee, {nullable: true})
  canceller: Employee;

  @Field(() => [POApprover])
  po_approvers: POApprover[];

  @Field(() => [POItem])
  po_items: POItem[];

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

}
