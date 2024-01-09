import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePoInput } from './dto/create-po.input';
import { UpdatePoInput } from './dto/update-po.input';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';
import { PO } from '@prisma/client';
import { APPROVAL_STATUS } from 'src/__common__/entities';

@Injectable()
export class PoService {

  private readonly logger = new Logger(PoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly purchasing: CommonPurchasingService
  ){}

  async create(input: CreatePoInput): Promise<PO> {
    this.logger.log('create()', input)

    const transactionResult = await this.prisma.$executeRaw`BEGIN`;

    try {

      await this.purchasing.validateRcNumberUnique({
        rcNumber: input.po_number,
        table: 'pO',
        field: 'po_number'
      })

      const isPoExist = await this.isPoExist( { meqs_id: input.meqs_id, supplier_id: input.supplier_id } )

      if(isPoExist){
        this.logger.error(`PO with meqs_id ${input.meqs_id} and supplier_id ${input.supplier_id} already exist`)
        throw new ConflictException('PO already exist!')
      }

      const isSupplierExistInMeqs = await this.isSupplierExistInMeqs( { meqs_id: input.meqs_id, supplier_id: input.supplier_id } )

      if(!isSupplierExistInMeqs){
        this.logger.error(`Supplier with ${input.supplier_id} does not exist in meqs id ${input.meqs_id}`)
        throw new BadRequestException('Supplier does not exist in MEQS')
      }

      this.logger.log('creating...')

      const createdPo = await this.prisma.pO.create({
        data: {
          po_number: input.po_number,
          meqs: { connect: { id: input.meqs_id } },
          supplier: { connect: { id: input.supplier_id } },
          po_date: new Date(input.po_date),
          payment_terms: input.payment_terms,
          purpose: input.purpose,
          notes: input.notes || null,
          status: input.status || APPROVAL_STATUS.PENDING,
          po_items: {
            create: input.items.map((item) => ({
              item: {
                create: {
                  description: item.description,
                  brand: { connect: { id: item.brand_id } },
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
          po_approvers: {
            create: input.approvers.map((approver) => ({
              approver: { connect: { id: approver.approver_id } },
              status: approver.status || APPROVAL_STATUS.PENDING,
              label: approver.label,
              order: approver.order,
            })),
          },
        },
      });

      await this.prisma.$executeRaw`COMMIT`;

      this.logger.log('po successfully created')

      return await this.findOne(createdPo.id);
    } catch (error) {

      this.logger.error('Error creating PO:', error);

      // Rollback the transaction on error
      await this.prisma.$executeRaw`ROLLBACK`;

      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }

      throw new Error('Could not create PO. Please refresh the page and try again.');
    }
  }

  async findAll(): Promise<PO[]> {
    return await this.prisma.pO.findMany({
      include: {
        meqs: true,
        supplier: true,
        canceller: true,
        po_items: {
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
        po_approvers: {
          include: {
            approver: true 
          }
        }
      },
      where: {
        is_deleted: false
      },
      orderBy: {
        po_number: 'desc'
      }
    });
  }

  async findOne(id: string): Promise<PO> {
    return await this.prisma.pO.findUniqueOrThrow({
      include: {
        meqs: true,
        supplier: true,
        canceller: true,
        po_items: {
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
        po_approvers: {
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

  async update(id: string, input: UpdatePoInput): Promise<PO> {
    const transactionResult = await this.prisma.$executeRaw`BEGIN`;
    
    try {
      const existingPO = await this.prisma.pO.findUnique({
        where: { id },
        include: { po_items: { include: { item: true } } },
      });

      if(!existingPO){
        throw new NotFoundException(`PO with ID ${id} not found`)
      }

      if(input.items && input.items.length > 0){

        // Delete existing meqs_items
        await this.prisma.pOItem.deleteMany({
          where: { po_id: id },
        });
      }

      const updatedPO = await this.prisma.pO.update({
        where: { id },
        data: {
          po_date: input.po_date ? new Date(input.po_date) : existingPO.po_date,
          payment_terms: input.payment_terms ?? existingPO.payment_terms,
          purpose: input.purpose ?? existingPO.purpose,
          notes: input.notes ?? existingPO.notes,
          status: input.status ?? existingPO.status,
          ...(input.items ? {
            po_items: {
              create: input.items.map((item) => ({
                item: {
                  create: {
                    description: item.description,
                    brand: { connect: { id: item.brand_id } },
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
        include: { po_items: { include: { item: true } } },
      });

      await this.prisma.$executeRaw`COMMIT`;
      
      return await this.findOne(updatedPO.id)
    } catch (error) {
      this.logger.error('Error updating po:', error);
      
      // Rollback the transaction on error
      await this.prisma.$executeRaw`ROLLBACK`;

      if(error instanceof BadRequestException || error instanceof ConflictException || error instanceof NotFoundException) {
        throw error
      }

      throw new Error('Could not update PO. Please refresh the page and try again.'); 
    }
  }

  async remove(id: string): Promise<boolean> {
        
    const item = await this.prisma.pO.findUniqueOrThrow({
        where: {id, is_deleted: false}
    })
    
    await this.prisma.pO.update({
        where: { id },
        data: {
            is_deleted: true
        }
    })

    return true

  }

  async findLatestPoNumber(): Promise<string> {
    try {
        return await this.purchasing.getLatestRcNumber({
          table: 'pO',
          field: 'po_number'
        })
    } catch (error) {
      Logger.error(error)
      throw new Error(error); 
    }
  }

  private async isPoExist(payload: {meqs_id: string, supplier_id: string}): Promise<boolean> {

    const meqs = await this.prisma.pO.findFirst({
      where: {
        meqs_id: payload.meqs_id,
        supplier_id: payload.supplier_id,
        is_deleted: false,
        status: {
          not: APPROVAL_STATUS.CANCELLED
        }
      }
    })

    if(meqs){
      return true
    }

    return false

  }

  private async isSupplierExistInMeqs(payload: { meqs_id: string; supplier_id: string }): Promise<boolean> {
    const { meqs_id, supplier_id } = payload;

    // Check if there is a SupplierItem associated with the given MEQS and Supplier
    const supplierItem = await this.prisma.supplierItem.findFirst({
      where: {
        item: {
          meqs_items: {
            some: {
              meqs_id,
            },
          },
        },
        supplier_id,
      },
    });

    // Return true if the SupplierItem exists, otherwise return false
    return !!supplierItem;
  }

}
