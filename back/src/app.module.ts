import { Module } from '@nestjs/common';
import { WSAPIGateway } from './gateway/coin.gateway';
import { GetCmcService } from './get-cmc/get-cmc.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GetCmcController } from './get-cmc/get-cmc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cryptocurrency, CryptocurrencySchema } from './db/Schema';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    MongooseModule.forFeature([{name: Cryptocurrency.name, schema: CryptocurrencySchema}]),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@cluster0.9xaep.mongodb.net/crypto?retryWrites=true&w=majority`)
    ],
  controllers: [ GetCmcController],
  providers: [ WSAPIGateway, GetCmcService],
})
export class AppModule {}
