import { Module } from '@nestjs/common';
import { WSAPIGateway } from 'src/gateway/coin.gateway';
import { KlineModule } from 'src/kline/kline.module';

@Module({
    imports: [KlineModule],
    providers: [WSAPIGateway],
    exports: [WSAPIGateway]

})
export class WsapigatewayModule {}
