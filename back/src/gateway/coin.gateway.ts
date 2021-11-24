import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { from, of, take, map, Observable } from 'rxjs';
import { WebSocketAPI } from '../classes/web-socket-api';
import * as coinlist from '../list/coins.json'


@WebSocketGateway(811, {transports: ['websocket', 'polling'], cors: true})
export class WSAPIGateway {

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleMessage(@MessageBody() data: {method: string, coins?: {name: string, symbol: string}[], pair?: string}): Observable<void> {
    console.log('data',data)
    const coins = new WebSocketAPI(data.method, data.coins, data.pair)
    return coins.getCryptoData().pipe(map((c: string) => {
      this.server.emit('msg', c)
    }))
  }
}