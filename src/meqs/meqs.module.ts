import { Module } from '@nestjs/common';
import { MeqsService } from './meqs.service';
import { MeqsResolver } from './meqs.resolver';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';

@Module({
  providers: [MeqsResolver, MeqsService, CommonPurchasingService],
})
export class MeqsModule {}
