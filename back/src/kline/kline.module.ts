import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Kline, KlineSchema } from '../db/Kline';
import { KlineService } from './kline.service';
import { KlineController } from './kline.controller';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forFeature([{ name: Kline.name, schema: KlineSchema }]),
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@cluster0.9xaep.mongodb.net/crypto?retryWrites=true&w=majority`)],
    providers: [KlineService],
    exports: [KlineService],
    controllers: [KlineController]
})
export class KlineModule {}
