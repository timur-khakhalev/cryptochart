export class KlinePayloadDto {
    result: string
    e: string;
    E: number;
    s: string;
    k: {
        t: number;
        T: number;
        s: string;
        i: string;
        f: number;
        L: number;
        o: string;
        c: string;
        h: string;
        l: string;
        v: string;
        n: number;
        x: boolean;
        q: string;
        V: string;
        Q: string;
    }
}

class KlineData {
    t: number;
    T: number;
    s: string;
    i: string;
    f: number;
    L: number;
    o: number;
    c: number;
    h: number;
    l: number;
    v: number;
    n: number;
    x: boolean;
    q: number;
    V: number;
    Q: number;
}

export class KlineDto{
    pair: string;
    data: KlineData;
}
