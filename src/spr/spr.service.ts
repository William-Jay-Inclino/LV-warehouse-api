import { Injectable } from '@nestjs/common';
import { CreateSprInput } from './dto/create-spr.input';
import { UpdateSprInput } from './dto/update-spr.input';

@Injectable()
export class SprService {
  create(createSprInput: CreateSprInput) {
    return 'This action adds a new spr';
  }

  findAll() {
    return `This action returns all spr`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spr`;
  }

  update(id: number, updateSprInput: UpdateSprInput) {
    return `This action updates a #${id} spr`;
  }

  remove(id: number) {
    return `This action removes a #${id} spr`;
  }
}
