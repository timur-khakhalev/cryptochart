import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetCmcController } from './get-cmc/get-cmc.controller';
import { GetCmcModule } from './get-cmc/get-cmc.module';
import { WsapigatewayModule } from './wsapigateway/wsapigateway.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    GetCmcModule,
    WsapigatewayModule
    ],
  controllers: [ GetCmcController],
})
export class AppModule {}
