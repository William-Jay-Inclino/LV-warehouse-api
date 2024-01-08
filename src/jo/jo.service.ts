import { Injectable } from '@nestjs/common';
import { CreateJoInput } from './dto/create-jo.input';
import { UpdateJoInput } from './dto/update-jo.input';

@Injectable()
export class JoService {
  create(createJoInput: CreateJoInput) {
    return 'This action adds a new jo';
  }

  findAll() {
    return `This action returns all jo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jo`;
  }

  update(id: number, updateJoInput: UpdateJoInput) {
    return `This action updates a #${id} jo`;
  }

  remove(id: number) {
    return `This action removes a #${id} jo`;
  }
}
