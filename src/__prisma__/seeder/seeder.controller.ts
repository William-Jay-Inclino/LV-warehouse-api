import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SeederService } from "./seeder.service";


@Controller('/api/v1/seeder')
export class SeederController {

    constructor(private readonly seederService: SeederService){}

    @Post('/seed-database')
    @HttpCode(HttpStatus.OK)
    async seedDatabase() {
        
        try {

            await this.seederService.seedDB()
            return 'Data seeding successfull'

        } catch (error) {
            console.error(error)
            return 'Data seeding failed'
        }
    }

    @Post('/truncate-database')
    @HttpCode(HttpStatus.OK)
    async truncateDb() {
      try {
        await this.seederService.truncateDB()
        return 'Truncate DB successful.';
      } catch (error) {
        return 'Truncate DB failed.';
      }
    }

}