import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import { CreateItemInput } from 'src/item/dto/create-item.input';

@Injectable()
export class CommonService {

    constructor(private readonly prisma: PrismaService) {}
    
    async getLatestRcNumber(payload: {table: string, field: string}): Promise<string> {
        const currentYear = new Date().getFullYear().toString().slice(-2);
    
        const latestItem = await this.prisma[payload.table].findFirst({
          where: { [payload.field]: { startsWith: currentYear } },
          orderBy: { [payload.field]: 'desc' },
        });
    
        if (latestItem) {
          const latestNumericPart = parseInt(latestItem[payload.field].slice(-5), 10);
          const newNumericPart = latestNumericPart + 1;
          const newRcNumber = `${currentYear}-${newNumericPart.toString().padStart(5, '0')}`;
          return newRcNumber;
        } else {
          // If no existing rc_number with the current year prefix, start with '00001'
          return `${currentYear}-00001`;
        }
    }

    async validateRcNumberUnique(payload: {rcNumber: string, table: string}): Promise<void> {
        const existingCanvass = await this.prisma[payload.table].findUnique({
          where: { rc_number: payload.rcNumber },
        });
    
        if (existingCanvass) {
          throw new Error(`Canvass with rc_number ${payload.rcNumber} already exists.`);
        }
    }

    async validateUsersAndItemsExist(payload: {requested_by_id: string, noted_by_id: string, items: CreateItemInput[]}): Promise<void> {

        const requestedBy = await this.validateUserExists(payload.requested_by_id);
        if (!requestedBy) {
          throw new NotFoundException(`Employee(requestedBy) with ID ${payload.requested_by_id} not found`);
        }
    
        const notedBy = await this.validateUserExists(payload.noted_by_id);
        if (!notedBy) {
          throw new NotFoundException(`Employee(notedBy) with ID ${payload.noted_by_id} not found`);
        }
    
        await Promise.all(payload.items.map((item) => this.validateBrandAndUnitExist(item)));
      }
    
    async validateUserExists(userId: string): Promise<boolean> {
        const user = await this.prisma.employee.findUnique({ where: { id: userId, is_deleted: false } });
        return !!user;
      }
    
    async validateBrandAndUnitExist(item: CreateItemInput): Promise<void> {
        const brand = await this.prisma.brand.findUnique({ where: { id: item.brand_id, is_deleted: false } });
        const unit = await this.prisma.unit.findUnique({ where: { id: item.unit_id, is_deleted: false } });
    
        if (!brand) {
          throw new NotFoundException(`Brand with id ${brand.id} not found`);
        }
        if (!unit) {
          throw new NotFoundException(`Unit with id ${unit.id} not found`);
        }
      }

}
