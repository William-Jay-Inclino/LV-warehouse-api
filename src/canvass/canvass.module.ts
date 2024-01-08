import { Module } from '@nestjs/common';
import { CanvassService } from './canvass.service';
import { CanvassResolver } from './canvass.resolver';
import { CommonPurchasingService } from 'src/__common__/common.purchasing.service';

@Module({
  providers: [CanvassResolver, CanvassService, CommonPurchasingService],
})
export class CanvassModule {}
