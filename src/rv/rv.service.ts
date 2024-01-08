import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRvInput } from './dto/create-rv.input';
import { UpdateRvInput } from './dto/update-rv.input';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { RV } from '@prisma/client';
import { APPROVAL_STATUS } from 'src/__common__/entities';

@Injectable()
export class RvService {

  private readonly logger = new Logger(RvService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly purchasing: CommonPurchasingService
  ){}

  async create(input: CreateRvInput): Promise<RV> {
    this.logger.log('create()', input)

    const transactionResult = await this.prisma.$executeRaw`BEGIN`;

    try {

      await this.purchasing.validateRcNumberUnique({
          rcNumber: input.rv_number,
          table: 'rV',
          field: 'rv_number'
      })

      const isCanvassReferenced = await this.isCanvassReferenced(input.canvass_id)

      if(isCanvassReferenced){
        throw new BadRequestException("Canvass had already been referenced")
      }

      const createdRv = await this.prisma.rV.create({
        data: {
          rv_number: input.rv_number,
          date_requested: new Date(input.date_requested),
          purpose: input.purpose,
          notes: input.notes,
          status: APPROVAL_STATUS.PENDING,
          work_order_no: input.work_order_no || null,
          work_order_date: input.work_order_date ? new Date(input.work_order_date) : null,
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
      
      const updatedCanvass = await this.prisma.canvass.update({
        where: { id: input.canvass_id },
        data: {
          is_referenced: true
        }
      })
      
      await this.prisma.$executeRaw`COMMIT`;

      this.logger.log('Successfully created RV', createdRv)
      return await this.findOne(createdRv.id)
      
    } catch (error) {
      this.logger.error('Error creating RV:', error);

      // Rollback the transaction on error
      await this.prisma.$executeRaw`ROLLBACK`;

      if(error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }

      throw new Error('Could not create RV. Please refresh the page and try again.'); 
    }
  
  }

  async findAll(): Promise<RV[]> {
    return await this.prisma.rV.findMany({
      include: {
        classification: true,
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
      },
      orderBy: {
        rv_number: 'desc'
      }
    });
  }

  async findOne(id: string): Promise<RV> {
    return await this.prisma.rV.findUniqueOrThrow({
      include: {
        classification: true,
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
        id,
        is_deleted: false
      }
    });
  }

  async update(id: string, input: UpdateRvInput): Promise<RV> {
    const transactionResult = await this.prisma.$executeRaw`BEGIN`;
    
    try {
      const existingRV = await this.prisma.rV.findUnique({
        where: { id },
        include: { rv_items: { include: { item: true } } },
      });

      if(!existingRV){
        throw new NotFoundException(`RV with ID ${id} not found`)
      }

      // Delete existing canvass_items
      await this.prisma.rVItem.deleteMany({
        where: { rv_id: id },
      });

      // Create new canvass_items based on the provided input
      const updatedRV = await this.prisma.rV.update({
        where: { id },
        data: {
          date_requested: input.date_requested ? new Date(input.date_requested) : existingRV.date_requested,
          purpose: input.purpose ?? existingRV.purpose,
          notes: input.notes ?? existingRV.notes,
          work_order_no: input.work_order_no ?? existingRV.work_order_no,
          work_order_date: input.work_order_date ? new Date(input.work_order_date) : existingRV.work_order_date, 
          status: input.status ?? existingRV.status,
          classification: { connect: { id: input.classification_id } },
          canceller: { connect: { id: input.canceller_id } },
          requested_by: { connect: { id: input.requested_by_id } },
          supervisor: { connect: { id: input.supervisor_id } },
          rv_items: {
            create: input.items?.map((item) => ({
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
        },
        include: { rv_items: { include: { item: true } } },
      });

      await this.prisma.$executeRaw`COMMIT`;
      
      return await this.findOne(updatedRV.id)
    } catch (error) {
      this.logger.error('Error updating rv:', error);
      
      // Rollback the transaction on error
      await this.prisma.$executeRaw`ROLLBACK`;

      if(error instanceof BadRequestException || error instanceof ConflictException || error instanceof NotFoundException) {
        throw error
      }

      throw new Error('Could not update rv. Please refresh the page and try again.'); 
    }
  }

  async remove(id: string): Promise<boolean> {
        
    const item = await this.prisma.rV.findUniqueOrThrow({
        where: {id, is_deleted: false}
    })
    
    await this.prisma.rV.update({
        where: { id },
        data: {
            is_deleted: true
        }
    })

    return true

  }

  async findLatestRvNumber(): Promise<string> {
    try {
        return await this.purchasing.getLatestRcNumber({
          table: 'rV',
          field: 'rv_number'
        })
    } catch (error) {
      Logger.error(error)
      throw new Error(error); 
    }
  }

  private async isCanvassReferenced(canvassId: string): Promise<boolean> {

    const canvass = await this.prisma.canvass.findUniqueOrThrow({
      select: {
        is_referenced: true
      },
      where: {
        id: canvassId,
        is_deleted: false
      }
    })

    if(!canvass){
      throw new NotFoundException(`Canvass with ID ${canvassId} not found`)
    }

    return canvass.is_referenced

  }

}
