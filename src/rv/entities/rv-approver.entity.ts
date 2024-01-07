import { Field, Int, ObjectType } from "@nestjs/graphql";
import { RV } from "./rv.entity";
import { Employee } from "src/employee/entities/employee.entity";


@ObjectType()
export class RVApprover {

    @Field(() => String)
    id: string;

    @Field(() => String)
    approver_id: string

    @Field(() => Employee)
    approver: Employee

    @Field(() => String)
    rv_id: string

    @Field(() => RV)
    rv: RV
    
    @Field(() => String)
    date_approval: string
    
    @Field(() => String)
    notes: string 

    @Field(() => Int)
    status: number

    @Field(() => String)
    label: string
    
    @Field(() => Int)
    order: number
}