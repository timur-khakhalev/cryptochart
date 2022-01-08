import { HttpService } from '@nestjs/axios';
import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { map, Observable } from 'rxjs';
import { Cryptocurrency, CryptoDocument } from 'src/db/Schema';
import { CryptocurrencyDto } from 'src/db/Schema.dto';


@Injectable()
export class GetCmcService {
    constructor(
    @InjectModel(Cryptocurrency.name) private cryptoModel: Model<CryptoDocument>, 
    private http: HttpService,
    ){
    }

    getMetadata(params: {symbol: string}): any {
        const header: AxiosRequestHeaders = { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY }
        return this.http.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${params['symbol']}&aux=urls,logo,description,platform,date_added`, {headers: header})
        .pipe(
            map((res)=> {
                    return params['symbol'].split(',').map(async (r) => {
                        if (res.data.data) {
                            return await this.addDataToDb({
                            name: res.data.data[r.toUpperCase()]['name'],
                            symbol: res.data.data[r.toUpperCase()]['symbol'],
                            category: res.data.data[r.toUpperCase()]['category'],
                            description: res.data.data[r.toUpperCase()]['description'],
                            slug: res.data.data[r.toUpperCase()]['slug'],
                            logo: res.data.data[r.toUpperCase()]['logo'],
                            date_added: res.data.data[r.toUpperCase()]['date_added'],
                            urls: res.data.data[r.toUpperCase()]['urls']
                        })
                        }
                    })
            })
        )
    }

    async addDataToDb(addDataDto: CryptocurrencyDto): Promise<Cryptocurrency> {
        const createdData = new this.cryptoModel(addDataDto)
        return await createdData.save()
    }

    async getDataFromDb(): Promise<Cryptocurrency[]> {
        return await this.cryptoModel.find().exec()
    }
}
