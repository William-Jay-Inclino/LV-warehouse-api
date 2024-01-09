import { Module } from '@nestjs/common';
import { PoService } from './po.service';
import { PoResolver } from './po.resolver';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';

@Module({
  providers: [PoResolver, PoService, CommonPurchasingService],
})
export class PoModule {}
