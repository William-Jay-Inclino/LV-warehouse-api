import { Injectable, Logger } from '@nestjs/common';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { Supplier } from '@prisma/client';

@Injectable()
export class SupplierService {

  private readonly logger = new Logger(SupplierService.name);

  constructor(private readonly prisma: PrismaService) {}


  create(createSupplierInput: CreateSupplierInput) {
    return 'This action adds a new supplier';
  }

  async findAll(): Promise<Supplier[]> {

    return await this.prisma.supplier.findMany({
        where: {
            is_deleted: false
        }
    })

}

  findOne(id: string) {
    return `This action returns a #${id} supplier`;
  }

  update(id: string, updateSupplierInput: UpdateSupplierInput) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: string) {
    return `This action removes a #${id} supplier`;
  }
}
