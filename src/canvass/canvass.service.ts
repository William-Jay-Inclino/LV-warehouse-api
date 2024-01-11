import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { UpdateCanvassInput } from './dto/update-canvass.input';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { Canvass } from '@prisma/client';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';

@Injectable()
export class CanvassService {

  private readonly logger = new Logger(CanvassService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly purchasing: CommonPurchasingService
  ){}

  // prisma behind the scenes uses db transaction
  async create(input: CreateCanvassInput): Promise<Canvass> {
    this.logger.log('create()', input)

    try {

      await this.purchasing.validateRcNumberUnique({
          rcNumber: input.rc_number,
          table: 'canvass',
          field: 'rc_number'
      })

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
                  brand: item.brand_id ? { connect: { id: item.brand_id } } : undefined,
                  unit: { connect: { id: item.unit_id } },
                  quantity: item.quantity,
                },
              },
            })),
          },
        },
      });
      
      this.logger.log('Successfully created canvass')
      return await this.findOne(createdCanvass.id)
      
    } catch (error) {
      this.logger.error('Error creating canvass:', error);

      if(error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }

      throw new Error('Could not create canvass. Please refresh the page and try again.'); 
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
      },
      orderBy: {
        rc_number: 'desc'
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
      const existingCanvass = await this.prisma.canvass.findUnique({
        where: { id },
        include: { canvass_items: { include: { item: true } } },
      });

      if(!existingCanvass){
        throw new NotFoundException(`Canvass with ID ${id} not found`)
      }

      if(input.items && input.items.length > 0){
        // Delete existing meqs_items
        await this.prisma.canvassItem.deleteMany({
          where: { canvass_id: id },
        });
        
      }

      const updatedCanvass = await this.prisma.canvass.update({
        where: { id },
        data: {
          date_requested: input.date_requested ? new Date(input.date_requested) : existingCanvass.date_requested,
          purpose: input.purpose ?? existingCanvass.purpose,
          notes: input.notes ?? existingCanvass.notes,
          requested_by: input.requested_by_id
            ? { connect: { id: input.requested_by_id } }
            : { connect: { id: existingCanvass.requested_by_id } },
          noted_by: input.noted_by_id
            ? { connect: { id: input.noted_by_id } }
            : { connect: { id: existingCanvass.noted_by_id } },
          canvass_items: {
            create: input.items?.map((item) => ({
              item: {
                create: {
                  description: item.description,
                  brand: item.brand_id ? { connect: { id: item.brand_id } } : undefined,
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
      
      return await this.findOne(updatedCanvass.id)
    } catch (error) {
      this.logger.error('Error updating canvass:', error);
      
      // Rollback the transaction on error
      await this.prisma.$executeRaw`ROLLBACK`;

      if(error instanceof BadRequestException || error instanceof ConflictException || error instanceof NotFoundException) {
        throw error
      }

      throw new Error('Could not create canvass. Please refresh the page and try again.'); 
    }
  }

  async remove(id: string): Promise<{success: boolean, msg: string}> {
        
    const item = await this.prisma.canvass.findUniqueOrThrow({
        where: {id, is_deleted: false}
    })

    if(item.is_referenced){
      return {
        success: false,
        msg: "Unable to delete this canvass because it is referenced in either RV, SPR, or JO"
      }
    }
    
    await this.prisma.canvass.update({
        where: { id },
        data: {
            is_deleted: true
        }
    })

    return {
      success: true,
      msg: "Canvass successfully deleted"
    }

  }

  async findLatestRcNumber(): Promise<string> {
    try {
        return await this.purchasing.getLatestRcNumber({
          table: 'canvass',
          field: 'rc_number'
        })
    } catch (error) {
      Logger.error(error)
      throw new Error(error); 
    }
  } 

}
