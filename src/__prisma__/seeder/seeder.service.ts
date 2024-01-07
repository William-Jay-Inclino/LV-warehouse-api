import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import * as data from "./mock-data";

@Injectable()
export class SeederService {

    constructor(private readonly prisma: PrismaService) {}


    async seedDB() {
        console.log('seeding database...')
        await this.truncateDB()
        await this.seedSupplier()
        await this.seedDivision()
        await this.seedDepartment()
        await this.seedClassification()
        await this.seedUnit()
        await this.seedBrand()
        await this.seedEmployee()
        await this.seedJOApproverSetting()
        await this.seedRVApproverSetting()
        await this.seedSPRApproverSetting()
        await this.seedMEQSApproverSetting()
        await this.seedPOApproverSetting()
        await this.seedCanvass()
        await this.seedItem()
        await this.seedCanvassItem()
        console.log('seeding database successfull...')
    }

    async truncateDB() {
        await this.prisma.truncateDB()
    }

    async seedSupplier() {
        console.log('seeding supplier table...')

        await this.prisma.supplier.createMany({
            data: data.suppliers
        })

    }

    async seedDivision() {
        console.log('seeding division table...')

        await this.prisma.division.createMany({
            data: data.divisions
        })

    }

    async seedDepartment() {
        console.log('seeding department table...')

        await this.prisma.department.createMany({
            data: data.departments
        })

    }

    async seedClassification() {
        console.log('seeding classification table...')

        await this.prisma.classification.createMany({
            data: data.classifications
        })

    }

    async seedUnit() {
        console.log('seeding unit table...')

        await this.prisma.unit.createMany({
            data: data.units
        })

    }

    async seedBrand() {
        console.log('seeding brand table...')

        await this.prisma.brand.createMany({
            data: data.brands
        })

    }

    async seedEmployee() {
        console.log('seeding employee table...')

        await this.prisma.employee.createMany({
            data: data.employees
        })

    }

    async seedJOApproverSetting() {
        console.log('seeding jo_approver_setting table...')

        await this.prisma.jOApproverSetting.createMany({
            data: data.jo_default_approvers,
        })

    }

    async seedRVApproverSetting() {
        console.log('seeding rv_approver_setting table...')

        await this.prisma.rVApproverSetting.createMany({
            data: data.rv_default_approvers,
        })

    }

    async seedSPRApproverSetting() {
        console.log('seeding spr_approver_setting table...')

        await this.prisma.sPRApproverSetting.createMany({
            data: data.spr_default_approvers,
        })

    }

    async seedMEQSApproverSetting() {
        console.log('seeding meqs_approver_setting table...')

        await this.prisma.mEQSApproverSetting.createMany({
            data: data.meqs_default_approvers,
        })

    }

    async seedPOApproverSetting() {
        console.log('seeding po_approver_setting table...')

        await this.prisma.pOApproverSetting.createMany({
            data: data.po_default_approvers,
        })

    }

    async seedCanvass() {
        console.log('seeding canvass table...')
        
        await this.prisma.canvass.createMany({
            data: data.canvasses
        })

    }

    async seedItem() {
        console.log('seeding item table...')
        
        await this.prisma.item.createMany({
            data: data.items
        })

    }

    async seedCanvassItem() {
        console.log('seeding canvass_item table...')
        
        await this.prisma.canvassItem.createMany({
            data: data.canvassItems
        })

    }

}