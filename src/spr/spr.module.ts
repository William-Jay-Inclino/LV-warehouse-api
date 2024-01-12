import { Module } from '@nestjs/common';
import { SprService } from './spr.service';
import { SprResolver } from './spr.resolver';

@Module({
  providers: [SprResolver, SprService],
})
export class SprModule {}
