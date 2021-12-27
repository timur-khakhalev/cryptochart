import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { map, Observable } from 'rxjs';
import { WebSocketAPI } from '../classes/web-socket-api';
import { IGatewayInput } from '../interfaces/ICoin';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { KlinePayloadDto } from '../db/Kline.dto';
import { KlineService } from 'src/kline/kline.service';
import { WsapigatewayService } from 'src/wsapigateway/wsapigateway.service';

@Injectable()
@WebSocketGateway(811, {transports: ['websocket'], cors: true})
export class WSAPIGateway {

  constructor(
    private klineService: KlineService, private WsApiService: WsapigatewayService
  ){
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('$CoinTicker')
  handleTicker(): Observable<void> {
    const method = '!miniTicker@arr'
    // const coins = new WebSocketAPI(method)
    return this.WsApiService.getData().pipe(map((c: string) => {
      this.server.emit('CoinTicker$', c)
    }))
  }

  @SubscribeMessage('$KlineFromDb')
  handleKlineDb() {
    return this.klineService.getData()
  }

  @SubscribeMessage('$Kline')
  handleKline(@MessageBody() data: IGatewayInput): Observable<void> {
    const pairNames = new Set()
    const coins = new WebSocketAPI(data.method, data.pairs)
    return coins.getKlineData().pipe(map((c: KlinePayloadDto) => {
      const {k} = c
      pairNames.add(k.s)
      const _klineFormated: any = {
          t: k.t,
          T: k.T,
          s: k.s,
          i: k.i,
          f: k.f,
          L: k.L,
          o: +k.o,
          c: +k.c,
          h: +k.h,
          l: +k.l,
          v: +k.v,
          n: k.n,
          x: k.x,
          q: +k.q,
          V: +k.V,
          Q: +k.Q,
        }
      pairNames.forEach(async (_pair) => {
        if (_pair === k.s) {
          const checkIfExist: any = await this.klineService.getPair({pair: k.s})
          if (checkIfExist) {
            if (checkIfExist.h8[checkIfExist.h8.length - 1].t !== k.t) {
              await this.klineService.updateData({ pair: k.s }, {h8: _klineFormated})
            }
          } else {
            await this.klineService.addData({
              pair: k.s,
              h8: _klineFormated
            })
          }
        }
      })
    }))
  }
}
