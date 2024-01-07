import { Module } from '@nestjs/common';
import { CanvassService } from './canvass.service';
import { CanvassResolver } from './canvass.resolver';

@Module({
  providers: [CanvassResolver, CanvassService],
})
export class CanvassModule {}
