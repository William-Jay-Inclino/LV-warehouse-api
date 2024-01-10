import { Injectable, Logger } from '@nestjs/common';
import { CreateUnitInput } from './dto/create-unit.input';
import { UpdateUnitInput } from './dto/update-unit.input';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { Unit } from '@prisma/client';

@Injectable()
export class UnitService {

  private readonly logger = new Logger(UnitService.name);

  constructor(private readonly prisma: PrismaService) {}

  create(createUnitInput: CreateUnitInput) {
    return 'This action adds a new unit';
  }

  async findAll(): Promise<Unit[]> {

    return await this.prisma.unit.findMany({
        where: {
            is_deleted: false
        }
    })

}

  findOne(id: string) {
    return `This action returns a #${id} unit`;
  }

  update(id: string, updateUnitInput: UpdateUnitInput) {
    return `This action updates a #${id} unit`;
  }

  remove(id: string) {
    return `This action removes a #${id} unit`;
  }
}
