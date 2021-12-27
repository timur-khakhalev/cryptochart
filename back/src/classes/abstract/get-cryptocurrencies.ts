import { Observable } from "rxjs";
import { IGatewayInput } from "src/interfaces/ICoin";

export abstract class GetCryptocurrencies implements IGatewayInput {
    constructor (
        public method: string,
        public pairs?: string[],
        public pair?: string
        ) {
    }
    
    abstract getCryptoData(): Observable<unknown>
}
