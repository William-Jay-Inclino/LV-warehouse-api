import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { UpdateCanvassInput } from './dto/update-canvass.input';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { CreateItemInput } from 'src/item/dto/create-item.input';
import { Canvass } from '@prisma/client';

@Injectable()
export class CanvassService {

  constructor(private readonly prisma: PrismaService){}

  // prisma behind the scenes uses db transaction
  async create(input: CreateCanvassInput): Promise<Canvass> {
    console.log('create()', input)

    try {

      await this.validateUsersAndItemsExist(input);

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
      console.error('Error creating canvass:', error);
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
    console.error('Error updating canvass:', error);
    
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

  private async validateUsersAndItemsExist(input: CreateCanvassInput): Promise<void> {
    const userExists = await this.validateUserExists(input.requested_by_id);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${input.requested_by_id} not found`);
    }

    const notedUserExists = await this.validateUserExists(input.noted_by_id);
    if (!notedUserExists) {
      throw new NotFoundException(`User with ID ${input.noted_by_id} not found`);
    }

    await Promise.all(input.items.map((item) => this.validateBrandAndUnitExist(item)));
  }

  private async validateUserExists(userId: string): Promise<boolean> {
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
