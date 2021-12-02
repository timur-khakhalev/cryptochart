import { createSlice } from '@reduxjs/toolkit'
import { IWsConnection, IminiTicker } from '../interfaces/IWsConnection';
import { getPercentage } from '../utils/utils';

export interface FilteredState{
    filtered: string[],
    sortBy: string,
    sortType: boolean,
    coins: string[]
}

const initialState: FilteredState = {
    filtered: [],
    sortBy: '',
    sortType: false,
    coins: []
}
const filteredArray: any = [];
const coinNames: string[] = [];

export const getWsSlice = createSlice({
    name: 'getWs',
    initialState,
    reducers: {
        getWsConnection: (state, action) => {
            const newestData = action.payload.data
            newestData.forEach((_coin: IWsConnection) => {
                const _coinConverted: IminiTicker = {
                    e: _coin.e,
                    E: +_coin.E,
                    s: _coin.s,
                    c: +_coin.c,
                    o: +_coin.o,
                    h: +_coin.h,
                    l: +_coin.l,
                    v: +_coin.v,
                    q: +_coin.q
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
            switch (state.sortBy) {
                case 'price':
                    state.sortType ? state.filtered = [...filteredArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.c < b.c) return -1
                        if (a.c > b.c) return 1
                        else return 0
                    })] : state.filtered = [...filteredArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.c > b.c) return -1
                        if (a.c < b.c) return 1
                        else return 0
                    })]
                    break
                case 'change':
                    state.sortType ? state.filtered = [...filteredArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (getPercentage(a.c, a.o) < getPercentage(b.c, b.o)) return -1
                        if (getPercentage(a.c, a.o) > getPercentage(b.c, b.o)) return 1
                        else return 0
                    })] : state.filtered = [...filteredArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (getPercentage(a.c, a.o) > getPercentage(b.c, b.o)) return -1
                        if (getPercentage(a.c, a.o) < getPercentage(b.c, b.o)) return 1
                        else return 0
                    })]
                    break
                case 'coinVolume':
                    state.sortType ? state.filtered = [...filteredArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.v < b.v) return -1
                        if (a.v > b.v) return 1
                        else return 0
                    })] : state.filtered = [...filteredArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.v > b.v) return -1
                        if (a.v < b.v) return 1
                        else return 0
                    })]
                    break
                case 'pairVolume':
                    state.sortType ? state.filtered = [...filteredArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.q < b.q) return -1
                        if (a.q > b.q) return 1
                        else return 0
                    })] : state.filtered = [...filteredArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.q > b.q) return -1
                        if (a.q < b.q) return 1
                        else return 0
                    })]
                    break
                default:
                    state.filtered = [...filteredArray]
            }
            state.filtered = [...filteredArray]
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload.sorting
            state.sortType = action.payload.sortType
        },
        setCoins: (state, action) => {
            state.coins = action.payload.coins
        }
    }
})

export const { getWsConnection, setSortBy, setCoins } = getWsSlice.actions

export default getWsSlice.reducer