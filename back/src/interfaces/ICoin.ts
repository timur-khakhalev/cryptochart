export interface IMiniTicker {
    eventType: string,
    eventTime: Date,
    symbol: string,
    c: string,
    o: string,
    h: string,
    l: string,
    volume: string,
    quote: string
}

// export interface ICryptocurrencies {
//     readonly method: string,
//     readonly coin?: {name: string, symbol: string}[]
//     readonly pair?: string,
// }

export interface IGatewayInput {
    readonly method: string,
    readonly pairs?: string[],
    readonly pair?: string
}