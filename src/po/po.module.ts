import { Module } from '@nestjs/common';
import { PoService } from './po.service';
import { PoResolver } from './po.resolver';

@Module({
  providers: [PoResolver, PoService],
})
export class PoModule {}
