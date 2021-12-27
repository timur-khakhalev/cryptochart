import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Kline, KlineDocument } from 'src/db/Kline';
import { KlineDto } from 'src/db/Kline.dto';

@Injectable()
export class KlineService {
    constructor(
        @InjectModel(Kline.name) private KlineModel: Model<KlineDocument>
    ){}

    async getData() {
        return this.KlineModel.find().exec()
    }

    async getPair(query: any) {
        return await this.KlineModel.findOne(query)
    }

    async updateData(filter: object, data: object) {
        const updating = await this.KlineModel.updateOne(filter, {$push: data})
        // console.log(filter)
        // console.log(data)
        // console.log(updating)
        return updating
    }

    async addData(Data: KlineDto) { 
        const createdData = new this.KlineModel(Data)
        await createdData.save()
    }
}
