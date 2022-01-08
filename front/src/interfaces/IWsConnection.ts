interface _KlineData {
    t: number, //start time
    T: number, //close time
    s: string, //symbold
    i: string, //interval
    o: number,
    c: number,
    h: number,
    l: number,
    x: boolean, //is this kline closed?
    q: number
}

export interface IKline {
    kline?: _KlineData[]
}

export interface IChartData {
    t: number, //start time
    T: number, //close time
    s: string, //symbold
    i: string, //interval
    o: number,
    c: number,
    h: number,
    l: number,
    x: boolean, //is this kline closed?
    q: number
}

export interface IWsConnection extends IKline {
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
    q: string,
}

export interface IMetadata extends IKline {
    open?: boolean,
    p: string,
    onClose?: any,
    urls?: { website: string[], twitter: string[], message_board: string[], chat: string[], facebook: string[], explorer: string[], reddit: string[], technical_doc: string[], source_code: string[], announcement: string[] }[],
    logo?: string,
    slug?: string,
    description?: string,
    category?: string,
    symbol?: string,
    name?: string,
    date_added?: string,
}

export interface ICells extends IKline, IMetadata {
    s: string,
    sp?: string,
    p: string,
    c: number,
    o: number,
    h: number,
    l: number,
    v: number,
    q: number,
    kline: [],
    changePercent?: number;
    i?: number;
}

export interface ICoin extends IKline, IMetadata {
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
}