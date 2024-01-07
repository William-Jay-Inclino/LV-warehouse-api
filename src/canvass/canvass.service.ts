import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { UpdateCanvassInput } from './dto/update-canvass.input';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { Canvass } from '@prisma/client';
import { CommonService } from 'src/__common__/common.service';

@Injectable()
export class CanvassService {

  private readonly logger = new Logger(CommonService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly common: CommonService
  ){}

  // prisma behind the scenes uses db transaction
  async create(input: CreateCanvassInput): Promise<Canvass> {
    this.logger.log('create()', input)

    try {

      await this.common.validateRcNumberUnique({
          rcNumber: input.rc_number,
          table: 'canvass'
      })

      await this.common.validateUsersAndItemsExist({
        requested_by_id: input.requested_by_id,
        noted_by_id: input.noted_by_id,
        items: input.items
      });

      const createdCanvass = await this.prisma.canvass.create({
        data: {
          rc_number: input.rc_number,
          date_requested: new Date(input.date_requested),
          purpose: input.purpose,
          notes: input.notes,
          requested_by: { connect: { id: input.requested_by_id } },
          noted_by: { connect: { id: input.noted_by_id } },
          canvass_items: {
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
        },
      });
    
      return createdCanvass;
      
    } catch (error) {
      this.logger.error('Error creating canvass:', error);
      throw new Error('Could not create canvass. Please try again.'); 
    }
  
  }

  async findAll(): Promise<Canvass[]> {
    return this.prisma.canvass.findMany({
      include: {
        requested_by: true, 
        noted_by: true,    
        canvass_items: {
          include: {
            item: {
              include: {
                unit: true, 
                brand: true
              }
            }
          }
        }, 
      },
      where: {
        is_deleted: false
      }
    });
  }

  async findOne(id: string): Promise<Canvass> {
        
    return await this.prisma.canvass.findUniqueOrThrow({
      include: {
        requested_by: true, 
        noted_by: true,    
        canvass_items: {
          include: {
            item: {
              include: {
                unit: true, 
                brand: true
              }
            }
          }
        }, 
      },
      where: {id, is_deleted: false}
    })

  }

  // use replace technique for canvass items (remove old items and add new items)
  // use also db transaction
  async update(id: string, input: UpdateCanvassInput): Promise<Canvass> {
    const transactionResult = await this.prisma.$executeRaw`BEGIN`;
    
    try {
      const existingCanvass = await this.prisma.canvass.findUniqueOrThrow({
        where: { id },
        include: { canvass_items: { include: { item: true } } },
      });

      // Delete existing canvass_items
      await this.prisma.canvassItem.deleteMany({
        where: { canvass_id: id },
      });

      // Create new canvass_items based on the provided input
      const updatedCanvass = await this.prisma.canvass.update({
        where: { id },
        data: {
          rc_number: input.rc_number ?? existingCanvass.rc_number,
          date_requested: input.date_requested
            ? new Date(input.date_requested)
            : existingCanvass.date_requested,
          purpose: input.purpose ?? existingCanvass.purpose,
          notes: input.notes ?? existingCanvass.notes,
          requested_by: {
            connect: { id: input.requested_by_id },
          },
          noted_by: {
            connect: { id: input.noted_by_id },
          },
          canvass_items: {
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
        include: { canvass_items: { include: { item: true } } },
      });

      await this.prisma.$executeRaw`COMMIT`;
      
      return updatedCanvass;
    } catch (error) {
      this.logger.error('Error updating canvass:', error);
      
      // Rollback the transaction on error
      await this.prisma.$executeRaw`ROLLBACK`;

      throw new Error(error);
    }
  }

  async remove(id: string): Promise<boolean> {
        
    const item = await this.prisma.canvass.findUniqueOrThrow({
        where: {id, is_deleted: false}
    })

    if(!item){
      throw NotFoundException
    }
    
    await this.prisma.canvass.update({
        where: { id },
        data: {
            is_deleted: true
        }
    })

    return true

  }

  async findLatestRcNumber(): Promise<string> {
    try {
        return await this.common.getLatestRcNumber({
          table: 'canvass',
          field: 'rc_number'
        })
    } catch (error) {
      Logger.error(error)
      throw new Error(error); 
    }
  } 

}
