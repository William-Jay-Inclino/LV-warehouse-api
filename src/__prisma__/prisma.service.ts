import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService){
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                }
            }
        })
    }

    async truncateDB() {
        console.log('truncating database...')

        try {
            await this.$transaction([
                this.jOApproverSetting.deleteMany(),
                this.rVApproverSetting.deleteMany(),
                this.sPRApproverSetting.deleteMany(),
                this.mEQSApproverSetting.deleteMany(),
                this.pOApproverSetting.deleteMany(),
                this.item.deleteMany(),
                this.canvassItem.deleteMany(),
                this.canvass.deleteMany(),
                this.employee.deleteMany(),
                this.department.deleteMany(),
                this.division.deleteMany(),
                this.supplier.deleteMany(),
                this.classification.deleteMany(),
                this.unit.deleteMany(),
                this.brand.deleteMany(),
            ])
            console.log('truncate successfull...')
        } catch (error) {
            console.error(error)
        }

    }

}
