import { Injectable } from '@nestjs/common';
import { CreateMeqInput } from './dto/create-meq.input';
import { UpdateMeqInput } from './dto/update-meq.input';

@Injectable()
export class MeqsService {
  create(createMeqInput: CreateMeqInput) {
    return 'This action adds a new meq';
  }

  findAll() {
    return `This action returns all meqs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meq`;
  }

  update(id: number, updateMeqInput: UpdateMeqInput) {
    return `This action updates a #${id} meq`;
  }

  remove(id: number) {
    return `This action removes a #${id} meq`;
  }
}
