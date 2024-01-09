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

  findOne(id: string) {
    return `This action returns a #${id} po`;
  }

  update(id: string, updatePoInput: UpdatePoInput) {
    return `This action updates a #${id} po`;
  }

  remove(id: string) {
    return `This action removes a #${id} po`;
  }
}
