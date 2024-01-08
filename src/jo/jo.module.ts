import { Module } from '@nestjs/common';
import { JoService } from './jo.service';
import { JoResolver } from './jo.resolver';

@Module({
  providers: [JoResolver, JoService],
})
export class JoModule {}
