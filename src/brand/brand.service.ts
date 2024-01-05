import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Brand } from './entities/brand.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class BrandService {

    private readonly logger = new Logger(BrandService.name);

    constructor(private readonly prisma: PrismaService) {}

    async create(createBrandInput: CreateBrandInput): Promise<Brand> {

        try {
            
            return await this.prisma.brand.create({
                data: { ...createBrandInput }
            })

        } catch (error) {
            this.logger.error(`Failed to create brand: ${error.message}`);
            throw new InternalServerErrorException('Failed to create brand');
        }
        
    }

    async findAll(): Promise<Brand[]> {

        return await this.prisma.brand.findMany({
            where: {
                is_deleted: false
            }
        })

    }

    async findOne(id: string): Promise<Brand> {
        
        return await this.prisma.brand.findUniqueOrThrow({
            where: {id, is_deleted: false}
        })


    }

    async update(id: string, updateBrandInput: UpdateBrandInput): Promise<Brand> {
        
        await this.findOne(id)

        return await this.prisma.brand.update( {
            where: { id },
            data: { ...updateBrandInput }
        } )

    }

    async remove(id: string): Promise<boolean> {
        
        await this.findOne(id)
        
        await this.prisma.brand.update({
            where: { id },
            data: {
                is_deleted: true
            }
        })

        return true

    }
}
