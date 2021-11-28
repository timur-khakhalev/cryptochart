import { createSlice } from '@reduxjs/toolkit'
import { IWsConnection, IminiTicker } from '../interfaces/IWsConnection';

export interface FilteredState{
    filtered: string[]
}

const initialState: FilteredState = {
    filtered: []
}
const filteredArray: any = [];
const coinNames: string[] = [];

export const getWsSlice = createSlice({
    name: 'getWs',
    initialState,
    reducers: {
        getWsConnection: (state, action) => {
            const newestData = action.payload
            newestData.forEach((_coin: IWsConnection) => {
                const _coinConverted: IminiTicker = {
                    e: _coin.e,
                    E: Number.parseInt(_coin.E, 10),
                    s: _coin.s,
                    c: Number.parseFloat(_coin.c),
                    o: Number.parseFloat(_coin.o),
                    h: Number.parseFloat(_coin.h),
                    l: Number.parseFloat(_coin.l),
                    v: Number.parseInt(_coin.v, 10),
                    q: Number.parseFloat(_coin.q)
                }
                if (coinNames.length > 0) {
                    if (!coinNames.includes(_coinConverted.s)) coinNames.push(_coinConverted.s)
                } else coinNames.push(_coinConverted.s)
                coinNames.map((_cName: string) => {
                    if (_cName === _coinConverted.s) {
                        const index = filteredArray.findIndex((_o: IWsConnection) => _o.s === _cName)
                        if (index >= 0) {
                            filteredArray[index] = _coinConverted
                        } else {
                            filteredArray.push(_coinConverted)
                        }
                    }
                });
            });
            state.filtered = [...filteredArray]
        }
    }
})

export const { getWsConnection } = getWsSlice.actions

export default getWsSlice.reducer