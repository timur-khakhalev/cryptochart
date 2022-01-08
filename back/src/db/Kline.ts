import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type KlineDocument = Kline & Document

class KlineData {
    @Prop()
    t: number

    @Prop()
    T: number

    @Prop()
    s: string

    @Prop()
    i: string

    @Prop()
    f: number

    @Prop()
    L: number

    @Prop()
    o: number

    @Prop()
    c: number

    @Prop()
    h: number

    @Prop()
    l: number

    @Prop()
    v: number

    @Prop()
    n: number

    @Prop()
    x: boolean

    @Prop()
    q: number

    @Prop()
    V: number

    @Prop()
    Q: number
}

@Schema()
export class Kline {

    @Prop()
    pair: string

    @Prop([KlineData])
    data: string
}

export const KlineSchema = SchemaFactory.createForClass(Kline)