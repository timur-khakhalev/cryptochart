import { GetCryptocurrencies } from "./abstract/get-cryptocurrencies";
import { IGatewayInput } from "src/interfaces/ICoin";
import { WebSocket } from "ws";
import { Logger } from "@nestjs/common";
import { Observable } from "rxjs";

export class WebSocketAPI extends GetCryptocurrencies implements IGatewayInput {
    private readonly logger = new Logger(WebSocketAPI.name)
    private baseUrl: string
    private params: string[]
    private reqParams: object
    private url: string
    constructor(method: string, pairs?: string[], pair?: string, ) {
        super(method, pairs, pair)
        this.baseUrl = 'wss://stream.binance.com:9443/stream?streams='
        if (pairs) {
            this.params = Object.entries(pairs).map(([_k, _v]) => {
                return `${_v.toLowerCase()}@${method}`
            })
        } else {
            this.url = `${method}`
        }
        this.reqParams = {
            "method": "SUBSCRIBE",
            "params": this.params,
            "id": 1
        }
    }

    getCryptoData(): Observable<unknown> {
        const stream$ = new Observable((observer) => {

            const ws = new WebSocket(`${this.baseUrl}${this.url}`)
            ws.on('open', () => {
                this.logger.log(`Binance WS connection established to method ${this.method}`)
            })
            ws.onmessage = (msg: any) => {
                const message = JSON.parse(msg.data)
                observer.next(message)
            }
            ws.on('error', (err: any) => {
                this.logger.log(err)
            })
            ws.on('close', (event) => {
                this.logger.log('Connection closed')
                this.logger.log(`At ${this.method} was error`, event)
            })
        })
        return stream$
    }

    getKlineData(): Observable<unknown> {
        const stream$ = new Observable((observer) => {

            const ws = new WebSocket(`wss://stream.binance.com:9443/ws/1234`)
            ws.onopen = () => {
                // console.log(JSON.stringify(this.reqParams))
                ws.send(JSON.stringify(this.reqParams))
            }
            ws.on('open', () => {
                this.logger.log(`Binance WS connection established to method ${this.method}`)
            })
            ws.onmessage = (msg: any) => {
                const message = JSON.parse(msg.data)
                if (message.k) {
                    // console.log('message', message)
                    observer.next(message)
                }
            }
            // ws.on('error', (err: any) => {
            //     this.logger.log(err)
            // })
            ws.on('close', (event) => {
                this.logger.log('Connection closed')
                this.logger.log(`At ${this.method} was error`, event)
            })
        })
        return stream$
    }
}
