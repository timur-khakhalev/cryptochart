import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export type CryptoDocument = Cryptocurrency

@Schema()
export class Cryptocurrency {
    @Prop()
    name: string

    @Prop()
    symbol: string

    @Prop()
    category: string

    @Prop()
    description: string

    @Prop()
    slug: string

    @Prop()
    logo: string

    // @Prop([String])
    // urls: { website: string[]; witter: string[]; message_board: string[]; chat: string[]; facebook: any[]; explorer: string[]; reddit: string[]; technical_doc: string[]; source_code: string[]; announcement: string[] };

    @Prop()
    date_added: string
}

export const CryptocurrencySchema = SchemaFactory.createForClass(Cryptocurrency)