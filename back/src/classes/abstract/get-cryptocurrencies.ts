import { Observable } from "rxjs";
import { ICryptocurrencies } from "src/interfaces/ICoin";

export abstract class GetCryptocurrencies implements ICryptocurrencies {
    constructor (
        public method: string,
        public coin?: { name: string, symbol: string }[],
        public pair?: string
        ) {
    }
    
    abstract getCryptoData(): Observable<unknown>
}
