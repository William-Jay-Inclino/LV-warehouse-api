import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCanvassInput } from './dto/create-canvass.input';
import { UpdateCanvassInput } from './dto/update-canvass.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemInput } from 'src/item/dto/create-item.input';
import { Canvass } from '@prisma/client';

@Injectable()
export class CanvassService {

  constructor(private readonly prisma: PrismaService){}

  // prisma behind the scenes uses db transaction
  async create(input: CreateCanvassInput): Promise<Canvass> {
    await this.validateUsersAndItemsExist(input);
  
    const createdCanvass = await this.prisma.canvass.create({
      data: {
        rc_number: input.rc_number,
        date_requested: input.date_requested,
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
  }

  findAll() {
    return `This action returns all canvass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} canvass`;
  }

  update(id: number, updateCanvassInput: UpdateCanvassInput) {
    return `This action updates a #${id} canvass`;
  }

  remove(id: number) {
    return `This action removes a #${id} canvass`;
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
    const user = await this.prisma.employee.findUnique({ where: { id: userId } });
    return !!user;
  }

  private async validateBrandAndUnitExist(item: CreateItemInput): Promise<void> {
    const brand = await this.prisma.brand.findUnique({ where: { id: item.brand_id } });
    const unit = await this.prisma.unit.findUnique({ where: { id: item.unit_id } });

    if (!brand || !unit) {
      throw new NotFoundException(`Brand or unit not found for item`);
    }
  }

}
