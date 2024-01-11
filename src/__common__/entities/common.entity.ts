import { Field, ObjectType } from "@nestjs/graphql";
import { APPROVAL_STATUS, DEPARTMENT_STATUS, DIVISION_STATUS, EMPLOYEE_POSITION, REQUEST_TYPES } from "./common.enums";


// ============================= START DATA MANAGEMENT =============================

export interface Supplier { 
    id: string 
    name: string 
    contact: string
}

export interface Division { 
    id: string
    code: string
    name: string
    status: DIVISION_STATUS
}

export interface Department { 
    id: string
    division_id: string
    code: string
    name: string
    status: DEPARTMENT_STATUS
}

export interface Employee { 
    id: string 
    department_id: string
    firstname: string 
    middlename: string | null 
    lastname: string 
    position: EMPLOYEE_POSITION

    // fields that are set programmatically

    label?: string 
}

export interface Classification { 
    id: string
    name: string
}

export interface Unit { 
    id: string
    name: string
}

export interface Brand { 
    id: string
    name: string
}

export interface Vehicle {
    id: string
    name: string 
    plate_number: string
}


// ============================= END DATA MANAGEMENT =============================








// ============================= START SETTINGS =============================

export interface JOApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}

export interface RVApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}

export interface SPRApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}

export interface MEQSApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}


export interface POApproverSetting { 
    id: string 
    approver_id: string 
    label: string
    order: number
}
// ============================= END SETTINGS =============================







// ============================= START PURCHASING =============================
export interface Canvass {
    id: string
    rc_number: string
    date_requested: Date
    purpose: string
    notes: string
    requested_by_id: string
    noted_by_id: string 
}

export interface Item {
    id: string
    description: string
    brand_id: string | null
    unit_id: string
    quantity: number 
}

export interface CanvassItem {
    id: string 
    item_id: string 
    canvass_id: string
}

export interface SupplierItem {
    id: string 
    item_id: string 
    item: Item
    supplier_id: string 
    supplier: Supplier
}

export interface JO {
    id: string
    canvass_id: string
    canvass: Canvass
    supervisor_id: string 
    supervisor: Employee
    classification_id?: string
    classification: Classification | null
    jo_number: string
    date_requested: string
    equipment: string
    department_id: string,
    department: Department,
    items: JOItem[]
    approvers: JOApprover[]
    is_cancelled: boolean
    purpose: string
    notes: string

}

export interface JOItem {
    id: string 
    item_id: string 
    item: Item
}

export interface JOApprover { 
    id: string 
    approver_id: string 
    approver: Employee
    jo_id: string 
    jo: JO
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface RV {
    id: string
    canvass_id: string
    canvass: Canvass
    supervisor_id: string 
    supervisor: Employee
    classification_id: string
    classification: Classification | null
    rv_number: string
    date_requested: string
    work_order_no: string 
    work_order_date: string 
    items: RVItem[]
    approvers: RVApprover[]
    is_cancelled: boolean
    purpose: string
    notes: string
    status: APPROVAL_STATUS
    canceller_id: string 
    canceller: Employee
    requested_by_id: string 
    requested_by: Employee
}

export interface RVItem {
    id: string 
    item_id: string 
    item: Item
}

export interface RVApprover { 
    id: string 
    approver_id: string 
    approver: Employee
    rv_id: string 
    rv: RV
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface SPR {
    id: string
    canvass_id: string
    canvass: Canvass
    supervisor_id: string 
    supervisor: Employee
    classification_id?: string
    classification: Classification | null
    spr_number: string
    date_requested: string
    vehicle_id: string
    vehicle: Vehicle
    items: SPRItem[]
    approvers: SPRApprover[]
    is_cancelled: boolean
    purpose: string
    notes: string
}

export interface SPRItem {
    id: string 
    item_id: string 
    item: Item
}

export interface SPRApprover { 
    id: string 
    approver_id: string 
    approver: Employee
    spr_id: string 
    spr: SPR
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface MEQS {
    id: string
    canvass_id: string 
    canvass: Canvass
    meqs_number: string
    request_type: REQUEST_TYPES
    meqs_date: string
    purpose: string
    is_cancelled: boolean

    items: MEQSItem[]
    approvers: MEQSApprover[]
}

export interface MEQSItem {
    id: string 
    item_id: string 
    item: Item
}

export interface MEQSApprover { 
    id: string 
    approver_id: string 
    approver: Employee
    meqs_id: string 
    meqs: MEQS
    date_approval: string
    notes: string 
    status: APPROVAL_STATUS 
    label: string 
    order: number
}

export interface PO {
    id: string 
    po_number: string 
    meqs_id: string
    meqs: MEQS  
    supplier_id: string 
    supplier: Supplier 
    po_date: string 
    payment_terms: string 
}


@ObjectType()
export class RemoveResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;
}