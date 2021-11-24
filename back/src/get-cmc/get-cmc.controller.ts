import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CryptocurrencyDto } from 'src/db/Schema.dto';
import { GetCmcService } from './get-cmc.service';

@Controller('get-cmc')
export class GetCmcController {
    constructor(private getCMCService:GetCmcService){}

    @Post()
    getCmcMeta(@Query() params: string): any{
        return this.getCMCService.getMetadata(params)
    }

    @Post()
    async addData(@Query() CryptocurrencyDto: CryptocurrencyDto){
        console.log('controller',CryptocurrencyDto)
        await this.getCMCService.addData(CryptocurrencyDto)
    }

    @Get()
    getData() {
        return this.getCMCService.getData()
    }

}
