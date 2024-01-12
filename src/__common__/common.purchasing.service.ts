import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../__prisma__/prisma.service';
import { DefaultApprover } from './entities/approver-setting.entity';
import { CreateItemInput } from 'src/item/dto/create-item.input';

@Injectable()
export class CommonPurchasingService {

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

    async validateRcNumberUnique(payload: {rcNumber: string, table: string, field: string}): Promise<void> {
      const existingCanvass = await this.prisma[payload.table].findUnique({
        where: { [payload.field]: payload.rcNumber },
      });
  
      if (existingCanvass) {
        throw new ConflictException(`${payload.table.toUpperCase()} with ${payload.field} ${payload.rcNumber} already exists.`);
      }
    }

    async getDefaultApprovers(payload: {table: string}): Promise<DefaultApprover[]> {

      return await this.prisma[payload.table].findMany({
        where: {
          is_deleted: false
        }
      }) as DefaultApprover[]

    }

    async validateIds(payload: {
      requested_by_id?: string, 
      noted_by_id?: string, 
      canceller_id?: string, 
      supervisor_id?: string,
      canvass_id?: string,
      classification_id?: string,
    }): Promise<void> {

        if(payload.requested_by_id){
          const isExist = await this.validateUserExists(payload.requested_by_id);
          if (!isExist) {
            throw new NotFoundException(`Employee(requested_by_id) with ID ${payload.requested_by_id} not found`);
          }
        }

        if(payload.noted_by_id){
          const isExist = await this.validateUserExists(payload.noted_by_id);
          if (!isExist) {
            throw new NotFoundException(`Employee(noted_by_id) with ID ${payload.noted_by_id} not found`);
          }
        }

        if(payload.canceller_id){
          const isExist = await this.validateUserExists(payload.canceller_id);
          if (!isExist) {
            throw new NotFoundException(`Employee(canceller_id) with ID ${payload.canceller_id} not found`);
          }
        }

        if(payload.supervisor_id){
          const isExist = await this.validateUserExists(payload.supervisor_id);
          if (!isExist) {
            throw new NotFoundException(`Employee(supervisor_id) with ID ${payload.supervisor_id} not found`);
          }
        }

        if(payload.canvass_id){
          const isExist = await this.prisma.canvass.findUnique({where: { id: payload.canvass_id, is_deleted: false }})
          if (!isExist) {
            throw new NotFoundException(`Canvass with ID ${payload.canvass_id} not found`);
          }
        }

        if(payload.classification_id){
          const isExist = await this.prisma.classification.findUnique({where: { id: payload.classification_id, is_deleted: false }})
          if (!isExist) {
            throw new NotFoundException(`Classification with ID ${payload.classification_id} not found`);
          }
        }
    }

    async validateItems(items: CreateItemInput[]){
      await Promise.all(items.map((item) => this.validateBrandAndUnitExist(item)));
    }
    
    private async validateUserExists(userId: string): Promise<boolean> {
      console.log('validateUserExists()', userId)
      const user = await this.prisma.employee.findUnique({ where: { id: userId, is_deleted: false } });
      return !!user;
      }
    
    private async validateBrandAndUnitExist(item: CreateItemInput): Promise<void> {
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
