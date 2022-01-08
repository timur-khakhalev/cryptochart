import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CryptocurrencyDto } from 'src/db/Schema.dto';
import { GetCmcService } from './get-cmc.service';

@Controller('get-cmc')
export class GetCmcController {
    constructor(private getCMCService:GetCmcService){}

    //Manual adding coin's metadata below
    // @Post('/tocmc') 
    // async getCmcMeta(@Query() params: {symbol: string}): Promise<any> {
    //     return await this.getCMCService.getMetadata(params)
    // }

    @Get()
    getData() {
        return this.getCMCService.getDataFromDb()
    }

}
