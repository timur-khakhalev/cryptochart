export interface IWsConnection {
    _coin: string[],
    coinId: string,
    _o: number,
    e: string,
    E: string,
    sp: string,
    s: string,
    p: string,
    c: string,
    o: string,
    h: string,
    l: string,
    v: string,
    q: string
}

export interface IminiTicker {
    e: string,
    E: number,
    sp: string,
    s: string,
    p: string,
    c: number,
    o: number,
    h: number,
    l: number,
    v: number,
    q: number,
    urls: {website: string[], twitter: string[], message_board: string[], chat: string[], facebook: string[], explorer: string[], reddit: string[], technical_doc: string[], source_code: string[], announcement: string[]},
    logo: string,
    slug: string,
    description: string,
    category: string,
    symbol: string,
    name: string
}