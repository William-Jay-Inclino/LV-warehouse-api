import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BrandModule } from './brand/brand.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { SeederModule } from './prisma/seeder/seeder.module';
import { CanvassModule } from './canvass/canvass.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    BrandModule,
    PrismaModule,
    CommonModule,
    SeederModule,
    CanvassModule,
    ItemModule,
  ],
})
export class AppModule {}

