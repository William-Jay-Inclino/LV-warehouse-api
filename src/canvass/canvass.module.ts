import { Module } from '@nestjs/common';
import { CanvassService } from './canvass.service';
import { CanvassResolver } from './canvass.resolver';
import { CommonService } from 'src/__common__/common.service';

@Module({
  providers: [CanvassResolver, CanvassService, CommonService],
})
export class CanvassModule {}
