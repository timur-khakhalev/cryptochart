import { Module } from '@nestjs/common';
import { WSAPIGateway } from 'src/gateway/coin.gateway';
import { KlineModule } from 'src/kline/kline.module';
import { Kline, KlineDocument } from '../db/Kline';
import { Model } from 'mongoose';
import { KlineService } from 'src/kline/kline.service';
import { WsapigatewayService } from './wsapigateway.service';

@Module({
    imports: [KlineModule],
    providers: [WSAPIGateway, WsapigatewayService],
    exports: [WSAPIGateway]

})
export class WsapigatewayModule {}
