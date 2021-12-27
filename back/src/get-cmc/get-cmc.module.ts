import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Cryptocurrency, CryptocurrencySchema } from '../db/Schema';
import { GetCmcService } from './get-cmc.service';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule, MongooseModule.forFeature([{ name: Cryptocurrency.name, schema: CryptocurrencySchema }]),
        MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@cluster0.9xaep.mongodb.net/crypto?retryWrites=true&w=majority`)],
    providers: [GetCmcService],
    exports: [GetCmcService]
})
export class GetCmcModule {}
