import { Injectable, Logger } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { PrismaService } from 'src/__prisma__/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {

  private readonly logger = new Logger(EmployeeService.name);

  constructor(
    private readonly prisma: PrismaService,
  ){}

  create(createEmployeeInput: CreateEmployeeInput) {
    return 'This action adds a new employee';
  }

  async findAll(): Promise<Employee[]> {
    return await this.prisma.employee.findMany({
      where: {
        is_deleted: false
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeInput: UpdateEmployeeInput) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
