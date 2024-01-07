import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BrandModule } from './brand/brand.module';
import { PrismaModule } from './__prisma__/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './__common__/common.module';
import { SeederModule } from './__prisma__/seeder/seeder.module';
import { CanvassModule } from './canvass/canvass.module';
import { ItemModule } from './item/item.module';
import { EmployeeModule } from './employee/employee.module';
import { UnitModule } from './unit/unit.module';
import { RvModule } from './rv/rv.module';
import { ClassificationModule } from './classification/classification.module';

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
    EmployeeModule,
    UnitModule,
    RvModule,
    ClassificationModule,
  ],
})
export class AppModule {}

