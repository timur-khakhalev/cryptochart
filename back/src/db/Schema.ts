import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

    @Prop()
    urls: string[]

    @Prop()
    date_added: string
}

export const CryptocurrencySchema = SchemaFactory.createForClass(Cryptocurrency)