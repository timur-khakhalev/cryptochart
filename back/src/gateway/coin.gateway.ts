import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { map, Observable } from 'rxjs';
import { WebSocketAPI } from '../classes/web-socket-api';
import { IGatewayInput } from '../interfaces/ICoin';
import { Injectable } from '@nestjs/common';
import { KlinePayloadDto } from '../db/Kline.dto';
import { KlineService } from 'src/kline/kline.service';

@Injectable()
@WebSocketGateway(811, {transports: ['websocket'], cors: true})
export class WSAPIGateway {

  constructor(
    private klineService: KlineService
  ){
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('$CoinTicker')
  handleTicker(): Observable<void> {
    const method = '!miniTicker@arr'
    const coins = new WebSocketAPI(method)
    return coins.getCryptoData().pipe(map((c: string) => {
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
    const method = 'kline_1d'
    const coins = new WebSocketAPI(method, data.pairs)
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
            if (checkIfExist.data[checkIfExist.data.length - 1]) {
              const checkToDelete: number = k.t - checkIfExist.data[0].t
              if (checkToDelete >= 604800000) { // Delete elements older than 7 days
                await this.klineService.deleteElement(checkIfExist.data[0].t)
              }
              if (checkIfExist.data[checkIfExist.data.length - 1].t !== k.t) {
                await this.klineService.updateData({ pair: k.s }, {data: _klineFormated})
              }
            }
          } else {
              await this.klineService.addData({
                pair: k.s,
                data: _klineFormated
              })
          }
        }
      })
    }))
  }
}
