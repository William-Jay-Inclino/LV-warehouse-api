import { faker } from '@faker-js/faker';
import { DEPARTMENT_STATUS, DIVISION_STATUS, EMPLOYEE_POSITION, Brand, Canvass, CanvassItem, Classification, Department, Division, Employee, JO, JOApprover, JOApproverSetting, MEQS, MEQSApproverSetting, PO, POApproverSetting, RV, RVApproverSetting, SPR, SPRApproverSetting, Supplier, Unit, Item } from '../../__common__/entities';

export const suppliers: Supplier[] = [
    { 
        id: faker.string.uuid(),
        name: 'Robinson',
        contact: '+639000000000',
    },
    { 
        id: faker.string.uuid(),
        name: 'SM',
        contact: '+639000000000',
    },
    { 
        id: faker.string.uuid(),
        name: 'Puregold',
        contact: '+639000000000',
    }
]

const divId1 = faker.string.uuid()
const divId2 = faker.string.uuid()
const divId3 = faker.string.uuid()

export const divisions: Division[] = [

    {
        id: divId1,
        code: 'CICTE',
        name: 'College of Information and Communications Technology and Engineering',
        status: DIVISION_STATUS.ACTIVE
    },
    {
        id: divId2,
        code: 'NAHS',
        name: 'Nursing & Allied Health Sciences',
        status: DIVISION_STATUS.ACTIVE
    },
    {
        id: divId3,
        code: 'AB',
        name: 'Accountancy and Business',
        status: DIVISION_STATUS.ACTIVE
    }
]

const depId1 = faker.string.uuid()
const depId2 = faker.string.uuid()
const depId3 = faker.string.uuid()
const depId4 = faker.string.uuid()
const depId5 = faker.string.uuid()
const depId6 = faker.string.uuid()

export const departments: Department[] = [
    {
        id: depId1,
        division_id: divId1,
        code: 'BSIT',
        name: 'Bachelor of Science in Information Technology',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId2,
        division_id: divId1,
        code: 'BSCS',
        name: 'Bachelor of Science in Computer Science',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId3,
        division_id: divId2,
        code: 'BSN',
        name: 'Bachelor of Science in Nursing',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId4,
        division_id: divId2,
        code: 'Midwifery',
        name: '2-Year Diploma in Midwifery',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId5,
        division_id: divId3,
        code: 'BSA',
        name: 'Bachelor of Science in Accountancy',
        status: DEPARTMENT_STATUS.ACTIVE
    },
    {
        id: depId6,
        division_id: divId3,
        code: 'BSBA',
        name: 'Bachelor of Science in Business Administration',
        status: DEPARTMENT_STATUS.ACTIVE
    }
]

export const classifications: Classification[] = [
    {
        id: faker.string.uuid(),
        name: 'Classification 1'
    },
    {
        id: faker.string.uuid(),
        name: 'Classification 2'
    },
    {
        id: faker.string.uuid(),
        name: 'Classification 3'
    }
]

export const units: Unit[] = [
    {
        id: faker.string.uuid(),
        name: 'Pieces'
    },
    {
        id: faker.string.uuid(),
        name: 'Cartons'
    },
    {
        id: faker.string.uuid(),
        name: 'Pallets'
    }
]

export const brands: Brand[] = [
    {
        id: faker.string.uuid(),
        name: 'Brand X'
    },
    {
        id: faker.string.uuid(),
        name: 'Brand Y'
    },
    {
        id: faker.string.uuid(),
        name: 'Brand Z'
    } 
]

export const employees: Employee[] = [
    // Imd. Sup. = 0
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Ana Maria',
        middlename: 'Lourdes',
        lastname: 'Pastor',
        position: EMPLOYEE_POSITION.CETD,
    },
    // Budget Officer = 1
    {
        id: faker.string.uuid(),
        department_id: depId2,
        firstname: 'Suan',
        middlename: null,
        lastname: 'Ricaflor',
        position: EMPLOYEE_POSITION.BUDGET_OFFICER,
    },
    // AUDIT = 2
    {
        id: faker.string.uuid(),
        department_id: depId2,
        firstname: 'Marlon',
        middlename: null,
        lastname: 'Sanico',
        position: EMPLOYEE_POSITION.AUDIT,
    },
    // GM / OIC = 3
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Jannie Ann',
        middlename: null,
        lastname: 'Dayandayan',
        position: EMPLOYEE_POSITION.GM,
    },
    // 1st CPC Member = 4
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Jhun Rey',
        middlename: null,
        lastname: 'Nahine',
        position: EMPLOYEE_POSITION.CPC_MEMBER,
    },
    // 2nd CPC Member = 5
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Gretchen',
        middlename: null,
        lastname: 'Tagalog',
        position: EMPLOYEE_POSITION.CPC_MEMBER,
    },
    // Witness = 6
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Dionic',
        middlename: null,
        lastname: 'De La Pena',
        position: EMPLOYEE_POSITION.AUDIT,
    },
    // CPC Chairman = 7
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Anthony',
        middlename: null,
        lastname: 'Cecilio',
        position: EMPLOYEE_POSITION.CPC_MEMBER,
    },
    // Finance Manager = 8
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Frances Paula',
        middlename: null,
        lastname: 'Lumacang',
        position: EMPLOYEE_POSITION.FINANCE,
    },
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'William Jay',
        middlename: 'Intales',
        lastname: 'Inclino',
        position: EMPLOYEE_POSITION.ADMIN,
    },
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Joshua',
        middlename: 'X',
        lastname: 'Tayag',
        position: EMPLOYEE_POSITION.IT,
    },
    {
        id: faker.string.uuid(),
        department_id: depId1,
        firstname: 'Jessa',
        middlename: 'X',
        lastname: 'Pelones',
        position: EMPLOYEE_POSITION.IT,
    },
    {
        id: faker.string.uuid(),
        department_id: depId2,
        firstname: 'Joseph Ken',
        middlename: 'X',
        lastname: 'Estrera',
        position: EMPLOYEE_POSITION.WAREHOUSE_OPERATOR,
    },
    {
        id: faker.string.uuid(),
        department_id: depId2,
        firstname: 'Jared',
        middlename: 'X',
        lastname: 'Singcol',
        position: EMPLOYEE_POSITION.CETD,
    },
    {
        id: faker.string.uuid(),
        department_id: depId3,
        firstname: 'Hannah Grace',
        middlename: 'Bioco',
        lastname: 'Tudio',
        position: EMPLOYEE_POSITION.AUDIT,
    },
    {
        id: faker.string.uuid(),
        department_id: depId3,
        firstname: 'Jessa',
        middlename: '',
        lastname: 'Valida',
        position: EMPLOYEE_POSITION.AUDIT,
    },
    {
        id: faker.string.uuid(),
        department_id: depId3,
        firstname: 'Roger',
        middlename: '',
        lastname: 'Laurente',
        position: EMPLOYEE_POSITION.CETD,
    }
]

export const jo_default_approvers: JOApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 4,
    },
]

export const rv_default_approvers: RVApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 4,
    },
]

export const spr_default_approvers: SPRApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 4,
    },
]

export const meqs_default_approvers: MEQSApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[4].id,
        label: '1st CPC Member',
        order: 1,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[5].id,
        label: '2nd CPC Member',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[6].id,
        label: 'Witness',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[7].id,
        label: 'CPC Chairman',
        order: 4,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 5,
    },
]

export const po_default_approvers: POApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        label: 'Budget Approved By',
        order: 1,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[8].id,
        label: 'Checked By Finance Mngr',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audited By',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 4,
    },
]

const canvassId = faker.string.uuid()

export const canvasses: Canvass[] = [
    {
        id: canvassId,
        rc_number: '23-00001',
        date_requested: new Date("2024-01-01"),
        purpose: 'purpose',
        notes: 'notes',
        requested_by_id: employees[9].id,
        noted_by_id: employees[10].id
    }
]

const itemId = faker.string.uuid() 

export const items: Item[] = [
    {
        id: itemId,
        description: 'Item 1',
        brand_id: brands[0].id,
        unit_id: units[0].id,
        quantity: 5,
    }
]

export const canvassItems: CanvassItem[] = [
    {
        id: faker.string.uuid(),
        canvass_id: canvassId,
        item_id: itemId
    }
]