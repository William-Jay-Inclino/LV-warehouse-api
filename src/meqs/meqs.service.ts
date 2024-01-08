import { Injectable, Logger } from '@nestjs/common';
import { CreateMeqsInput } from './dto/create-meqs.input';
import { UpdateMeqsInput } from './dto/update-meqs.input';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';
import { PrismaService } from 'src/__prisma__/prisma.service';

@Injectable()
export class MeqsService {

  private readonly logger = new Logger(MeqsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly purchasing: CommonPurchasingService
  ){}

  create(createMeqsInput: CreateMeqsInput) {
    return 'This action adds a new meq';
  }

  findAll() {
    return `This action returns all meqs`;
  }

  findOne(id: string) {
    return `This action returns a #${id} meq`;
  }

  update(id: string, updateMeqsInput: UpdateMeqsInput) {
    return `This action updates a #${id} meq`;
  }

  remove(id: string) {
    return `This action removes a #${id} meq`;
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

}
