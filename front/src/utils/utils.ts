export function getPercentage(partialValue: number, totalValue: number): number {
    return Number.parseFloat(((partialValue / totalValue - 1) * 100).toFixed(2));
}

export function SeparateDigits(x: string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function klineSaveOrUpdate(data: any, array: any[], names: Set<string>): void {
    names.add(data.s)
    names.forEach((_kName: string) => {
        if (_kName === data.s) {
            const index = array.findIndex((_o: any) => _o.s === _kName)
            if (index >= 0) {
                array[index] = {
                t: data.t,
                T: data.T,
                s: data.s,
                i: data.i,
                o: data.o,
                c: data.c,
                h: data.h,
                l: data.l,
                x: data.x,
                q: data.q
                }
            } else {
                array.push(data)
            }
        }
    })
}