import { GetCryptocurrencies } from "./abstract/get-cryptocurrencies";
import { ICryptocurrencies } from "src/interfaces/ICoin";
import { WebSocket } from "ws";
import { Logger } from "@nestjs/common";
import { Observable } from "rxjs";

export class WebSocketAPI extends GetCryptocurrencies implements ICryptocurrencies {
    private readonly logger = new Logger(WebSocketAPI.name)
    private baseUrl: string
    private url: string
    constructor(method: string, coin?: { name: string, symbol: string }[], pair?: string, ) {
        super(method, coin, pair)
        this.baseUrl = 'wss://stream.binance.com:9443/stream?streams='
        if (coin) {
            this.url = coin.map((c) => {
                return `${c.symbol.toLowerCase()}${pair}@${method}`
            }).join('/')
        } else {
            this.url = `${method}`
        }
    }

    getCryptoData(): Observable<unknown> {
        const stream$ = new Observable((observer) => {

            const ws = new WebSocket(`${this.baseUrl}${this.url}`)
            ws.on('open', () => {
                this.logger.log('Binance WS connection established')
            })
            ws.onmessage = (msg: any) => {
                const message = JSON.parse(msg.data)
                observer.next(message)
            }
            ws.on('close', () => {
                this.logger.log('Connection closed')
            })
        })
        return stream$
    }
}
