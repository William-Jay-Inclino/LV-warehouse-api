import { Module } from '@nestjs/common';
import { RvService } from './rv.service';
import { RvResolver } from './rv.resolver';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';

@Module({
  providers: [RvResolver, RvService, CommonPurchasingService],
})
export class RvModule {}
