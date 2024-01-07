import { Module } from '@nestjs/common';
import { RvService } from './rv.service';
import { RvResolver } from './rv.resolver';
import { CommonService } from 'src/__common__/common.service';

@Module({
  providers: [RvResolver, RvService, CommonService],
})
export class RvModule {}
