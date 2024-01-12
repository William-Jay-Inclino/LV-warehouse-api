import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateMeqsInput } from './dto/create-meqs.input';
import { UpdateMeqsInput } from './dto/update-meqs.input';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { MEQS, MEQSApproverSetting } from '@prisma/client';
import { APPROVAL_STATUS } from 'src/__common__/entities';

@Injectable()
export class MeqsService {

  private readonly logger = new Logger(MeqsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly purchasing: CommonPurchasingService
  ){}

  async create(input: CreateMeqsInput): Promise<MEQS> {
    this.logger.log('create()', input)

    const transactionResult = await this.prisma.$executeRaw`BEGIN`;

    try {

      await this.purchasing.validateRcNumberUnique({
        rcNumber: input.meqs_number,
        table: 'mEQS',
        field: 'meqs_number'
      })

      if(!input.jo_id && !input.rv_id && !input.spr_id){
        throw new BadRequestException("There must be atleast 1 reference ID either jo_id/rv_id/spr_id")
      }

      let table = ''
      let rc_id = ''

      if(input.jo_id){
        table = 'jO'
        rc_id = input.jo_id
      } else if(input.rv_id){
        table = 'rV'
        rc_id = input.rv_id
      } else {
        table = 'sPR'
        rc_id = input.spr_id
      }

      // Validate if jo/rv/spr is already reference 
      const isRequestReferenced = await this.isRequestReferenced({table, rc_id})

      if(isRequestReferenced){
        throw new BadRequestException(`${table.toUpperCase()} with id ${rc_id} had already been referenced`)
      }

      this.logger.log('creating...')

      const createdMeqs = await this.prisma.mEQS.create({
        data: {
          jo_id: input.jo_id || null,
          rv_id: input.rv_id || null,
          spr_id: input.spr_id || null,
          meqs_number: input.meqs_number,
          request_type: input.request_type,
          meqs_date: new Date(input.meqs_date),
          purpose: input.purpose,
          notes: input.notes,
          status: input.status || APPROVAL_STATUS.PENDING,
          meqs_items: {
            create: input.items.map((item) => ({
              item: {
                create: {
                  description: item.description,
                  brand: item.brand_id ? { connect: { id: item.brand_id } } : undefined,
                  unit: { connect: { id: item.unit_id } },
                  quantity: item.quantity,
                  supplier_items: {
                    create: item.supplier_items.map( (supplierItem) => ({
                      price: supplierItem.price,
                      supplier_id: supplierItem.supplier_id
                    }))
                  }
                },
              },
            })),
          },
          meqs_approvers: {
            create: input.approvers.map((approver) => ({
              approver: { connect: { id: approver.approver_id } },
              status: approver.status || APPROVAL_STATUS.PENDING,
              label: approver.label,
              order: approver.order,
            })),
          },
        },
      });

      // set is_reference to true either jo, rv, or spr table

      const updatedRvJoSpr = await this.prisma[table].update({
        where: { id: rc_id },
        data: {
          is_referenced: true
        }
      })

      await this.prisma.$executeRaw`COMMIT`;

      this.logger.log('meqs successfully created')

      return await this.findOne(createdMeqs.id);
    } catch (error) {

      this.logger.error('Error creating MEQS:', error);

      // Rollback the transaction on error
      await this.prisma.$executeRaw`ROLLBACK`;

      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      throw new Error('Could not create MEQS. Please refresh the page and try again.');
    }
  }

  async findAll(): Promise<MEQS[]> {
    return await this.prisma.mEQS.findMany({
      include: {
        jo: {
          include: {
            requested_by: true
          }
        },
        rv: {
          include: {
            requested_by: true
          }
        },
        spr: {
          include: {
            requested_by: true
          }
        },
        canceller: true,
        pos: true,
        meqs_items: {
          include: {
            item: {
              include: {
                unit: true, 
                brand: true,
                supplier_items: {
                  include: {
                    supplier: true
                  }
                }
              }
            }
          }
        }, 
        meqs_approvers: {
          include: {
            approver: true 
          }
        }
      },
      where: {
        is_deleted: false
      },
      orderBy: {
        meqs_number: 'desc'
      }
    });
  }

  async findOne(id: string): Promise<MEQS> {
    return await this.prisma.mEQS.findUniqueOrThrow({
      include: {
        jo: {
          include: {
            requested_by: true
          }
        },
        rv: {
          include: {
            requested_by: true
          }
        },
        spr: {
          include: {
            requested_by: true
          }
        },
        canceller: true,
        pos: true,
        meqs_items: {
          include: {
            item: {
              include: {
                unit: true, 
                brand: true,
                supplier_items: {
                  include: {
                    supplier: true
                  }
                }
              }
            }
          }
        }, 
        meqs_approvers: {
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

  async update(id: string, input: UpdateMeqsInput): Promise<MEQS> {
    const transactionResult = await this.prisma.$executeRaw`BEGIN`;
    
    try {
      const existingMEQS = await this.prisma.mEQS.findUnique({
        where: { id },
        include: { meqs_items: { include: { item: true } } },
      });

      if(!existingMEQS){
        throw new NotFoundException(`MEQS with ID ${id} not found`)
      }

      if(input.items && input.items.length > 0){

        // Delete existing meqs_items
        await this.prisma.mEQSItem.deleteMany({
          where: { meqs_id: id },
        });
      }

      const updatedMEQS = await this.prisma.mEQS.update({
        where: { id },
        data: {
          meqs_date: input.meqs_date ? new Date(input.meqs_date) : existingMEQS.meqs_date,
          purpose: input.purpose ?? existingMEQS.purpose,
          notes: input.notes ?? existingMEQS.notes,
          status: input.status ?? existingMEQS.status,
          ...(input.items ? {
            meqs_items: {
              create: input.items.map((item) => ({
                item: {
                  create: {
                    description: item.description,
                    brand: item.brand_id ? { connect: { id: item.brand_id } } : undefined,
                    unit: { connect: { id: item.unit_id } },
                    quantity: item.quantity,
                    supplier_items: {
                      create: item.supplier_items.map((supplierItem) => ({
                        price: supplierItem.price,
                        supplier_id: supplierItem.supplier_id,
                      })),
                    },
                  },
                },
              })),
            },
          } : {}),
        },
        include: { meqs_items: { include: { item: true } } },
      });

      await this.prisma.$executeRaw`COMMIT`;
      
      return await this.findOne(updatedMEQS.id)
    } catch (error) {
      this.logger.error('Error updating meqs:', error);
      
      // Rollback the transaction on error
      await this.prisma.$executeRaw`ROLLBACK`;

      if(error instanceof BadRequestException || error instanceof ConflictException || error instanceof NotFoundException) {
        throw error
      }

      throw new Error('Could not update MEQS. Please refresh the page and try again.'); 
    }
  }

  async remove(id: string): Promise<boolean> {
        
    const item = await this.prisma.mEQS.findUniqueOrThrow({
        where: {id, is_deleted: false}
    })
    
    await this.prisma.mEQS.update({
        where: { id },
        data: {
            is_deleted: true
        }
    })

    return true

  }

  async findLatestMeqsNumber(): Promise<string> {
    try {
        return await this.purchasing.getLatestRcNumber({
          table: 'mEQS',
          field: 'meqs_number'
        })
    } catch (error) {
      Logger.error(error)
      throw new Error(error); 
    }
  }

  private async isRequestReferenced(payload: {rc_id: string, table: string}): Promise<boolean> {

    const item = await this.prisma[payload.table].findUnique({
      select: {
        is_referenced: true
      },
      where: {
        id: payload.rc_id,
        is_deleted: false
      }
    })

    if(!item){
      throw new NotFoundException(`${payload.table.toUpperCase()} with ID ${payload.rc_id} not found`)
    }

    return item.is_referenced

  }

  async findAllDefaultMeqsApprovers(): Promise<MEQSApproverSetting[]> {
    return await this.prisma.mEQSApproverSetting.findMany({
      include: {
        approver: true
      },
      orderBy: {
        order: 'asc'
      },
      where: {
        is_deleted: false
      }
    })
  }

}
