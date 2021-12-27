import { Injectable } from '@nestjs/common';
import { WebSocketAPI } from 'src/classes/web-socket-api';
import { map, Observable } from 'rxjs';

@Injectable()
export class WsapigatewayService {

    getData() {
        const method = '!miniTicker@arr'
        const coins = new WebSocketAPI(method)
        return coins.getCryptoData()
    }
}
