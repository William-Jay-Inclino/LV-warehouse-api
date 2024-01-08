import { Injectable } from '@nestjs/common';
import { CreatePoInput } from './dto/create-po.input';
import { UpdatePoInput } from './dto/update-po.input';

@Injectable()
export class PoService {
  create(createPoInput: CreatePoInput) {
    return 'This action adds a new po';
  }

  findAll() {
    return `This action returns all po`;
  }

  findOne(id: number) {
    return `This action returns a #${id} po`;
  }

  update(id: number, updatePoInput: UpdatePoInput) {
    return `This action updates a #${id} po`;
  }

  remove(id: number) {
    return `This action removes a #${id} po`;
  }
}
