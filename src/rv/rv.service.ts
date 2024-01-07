import { Injectable, Logger } from '@nestjs/common';
import { CreateRvInput } from './dto/create-rv.input';
import { UpdateRvInput } from './dto/update-rv.input';
import { CommonService } from 'src/__common__/common.service';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { RV } from '@prisma/client';
import { APPROVAL_STATUS } from 'src/__common__/entities';

@Injectable()
export class RvService {

  private readonly logger = new Logger(CommonService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly common: CommonService
  ){}

  async create(input: CreateRvInput): Promise<RV> {
    this.logger.log('create()', input)

    try {

      await this.common.validateRcNumberUnique({
          rcNumber: input.rv_number,
          table: 'rV',
          field: 'rv_number'
      })

      await this.common.validateIds({
        requested_by_id: input.requested_by_id,
        supervisor_id: input.supervisor_id,
        canvass_id: input.canvass_id,
        classification_id: input.classification_id
      });

      await this.common.validateItems(input.items)

      const createdRv = await this.prisma.rV.create({
        data: {
          rv_number: input.rv_number,
          date_requested: new Date(input.date_requested),
          purpose: input.purpose,
          notes: input.notes,
          status: APPROVAL_STATUS.PENDING,
          work_order_no: input.work_order_no || null,
          work_order_date: new Date(input.work_order_date) || null,
          canvass: { connect: { id: input.canvass_id } },
          classification: { connect: { id: input.classification_id } },
          requested_by: { connect: { id: input.requested_by_id } },
          supervisor: { connect: { id: input.supervisor_id } },
          rv_items: {
            create: input.items.map((item) => ({
              item: {
                create: {
                  description: item.description,
                  brand: { connect: { id: item.brand_id } },
                  unit: { connect: { id: item.unit_id } },
                  quantity: item.quantity,
                },
              },
            })),
          },
          rv_approvers: {
            create: input.approvers.map((approver) => ({
              approver: { connect: { id: approver.approver_id } },
              status: approver.status || APPROVAL_STATUS.PENDING,
              label: approver.label,
              order: approver.order,
            })),
          },
        }
      });
    
      return createdRv;
      
    } catch (error) {
      this.logger.error('Error creating RV:', error);
      throw new Error('Could not create RV. Please try again.'); 
    }
  
  }

  async findAll(): Promise<RV[]> {
    return this.prisma.rV.findMany({
      include: {
        canvass: true,
        supervisor: true,
        canceller: true,
        requested_by: true, 
        rv_items: {
          include: {
            item: {
              include: {
                unit: true, 
                brand: true
              }
            }
          }
        }, 
        rv_approvers: {
          include: {
            approver: true 
          }
        }
      },
      where: {
        is_deleted: false
      }
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} rv`;
  }

  update(id: string, updateRvInput: UpdateRvInput) {
    return `This action updates a #${id} rv`;
  }

  remove(id: string) {
    return `This action removes a #${id} rv`;
  }

  async findLatestRvNumber(): Promise<string> {
    try {
        return await this.common.getLatestRcNumber({
          table: 'rV',
          field: 'rv_number'
        })
    } catch (error) {
      Logger.error(error)
      throw new Error(error); 
    }
  }

}
