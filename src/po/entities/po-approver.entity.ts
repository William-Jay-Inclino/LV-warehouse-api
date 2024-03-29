import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PO } from "./po.entity";
import { Employee } from "src/employee/entities/employee.entity";


@ObjectType()
export class POApprover {

    @Field(() => String)
    id: string;

    @Field(() => String)
    approver_id: string

    @Field(() => Employee)
    approver: Employee

    @Field(() => String)
    po_id: string

    @Field(() => PO)
    pos: PO
    
    @Field(() => String, {nullable: true})
    date_approval: string | null
    
    @Field(() => String, {nullable: true})
    notes: string | null

    @Field(() => Int)
    status: number

    @Field(() => String)
    label: string
    
    @Field(() => Int)
    order: number

    @Field(() => Date)
    created_at: Date;
  
    @Field(() => Date)
    updated_at: Date;
}