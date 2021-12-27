import { Controller, Get } from '@nestjs/common';
import { KlineService } from './kline.service';

@Controller('kline')
export class KlineController {
    constructor(private klineService:KlineService){}

    @Get('get')
    getKlineData() {
        return this.klineService.getData()
    }
}
