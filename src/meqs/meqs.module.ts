import { Module } from '@nestjs/common';
import { MeqsService } from './meqs.service';
import { MeqsResolver } from './meqs.resolver';

@Module({
  providers: [MeqsResolver, MeqsService],
})
export class MeqsModule {}
