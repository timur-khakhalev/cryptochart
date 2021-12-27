/* eslint-disable no-continue */
import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { IWsConnection, IminiTicker, ICells, IKline } from '../interfaces/IWsConnection';
import { getPercentage, klineSaveOrUpdate } from '../utils/utils';
import pairs from '../list/pairs.json'

export interface coinTickerState{
    coinTicker: ICells[],
    klineFromDb: any[]
    sortBy: string,
    sortType: boolean,
    pairFilter: string[],
    metadata: string[],
    search: string,
    dnwPagination: number,
    upwPagination: number,
    checkKlineIsReady: boolean,
    klinePairs: object,
    snack: boolean
}

const initialState: coinTickerState = {
    coinTicker: [],
    klineFromDb: [],
    sortBy: '',
    sortType: false,
    pairFilter: [],
    metadata: [],
    search: '',
    dnwPagination: 0,
    upwPagination: 30,
    checkKlineIsReady: false,
    klinePairs: {},
    snack: false
}
const coinTickerArray: any = [];
const klineArray: any = []
const klineCoinNames: any = new Set()
let metaData: any = []
const coinNames: any = new Set()
const symbolsSet: any = new Set()

export const getWsSlice = createSlice({
    name: 'getWs',
    initialState,
    reducers: {
        getWsConnection: (state, action) => {
            const newestData = action.payload.data
            function getDatas() {
                axios.get('http://localhost:3000/get-cmc').then((res) => {
                    metaData = res.data
                })
            }
            if (metaData.length === 0) {
                getDatas()
            }
            newestData.forEach((_coin: IWsConnection) => {
                const _coinConverted: IminiTicker = {
                    e: _coin.e,
                    E: +_coin.E,
                    sp: _coin.s,
                    s: '',
                    p: '',
                    c: +_coin.c,
                    o: +_coin.o,
                    h: +_coin.h,
                    l: +_coin.l,
                    v: +_coin.v,
                    q: +_coin.q,
                    urls: [{
                        website: [],
                        twitter: [],
                        message_board: [],
                        chat: [],
                        facebook: [],
                        explorer: [],
                        reddit: [],
                        technical_doc: [],
                        source_code: [],
                        announcement: []
                    }],
                    logo: '',
                    slug: '',
                    description: '',
                    date_added: '',
                    category: '',
                    name: '',
                    symbol: '',
                    kline: []
                }
                coinNames.add(_coin.s)
                state.klinePairs = [...coinNames]
                state.checkKlineIsReady = true
                coinNames.forEach((_cName: any) => {
                    if (_cName === _coinConverted.sp) {
                        pairs.all.forEach(x => { // Creates pair for every coin
                            let i = _coinConverted.sp.indexOf(x)
                            if (i > 1) {
                                _coinConverted.s = _coinConverted.sp.slice(0, i)
                            }
                        })
                        symbolsSet.add(_coinConverted.s)
                        _coinConverted.p = pairs.all.find(x => {
                            let i = _coinConverted.sp.indexOf(x)
                            if (i > 1) {
                                return _coinConverted.sp.slice(i)
                            }
                        })!
                        const index = coinTickerArray.findIndex((_o: IWsConnection) => _o.sp === _cName)
                        if (index >= 0) {
                            metaData.forEach((_c: any) => {
                                if (_c.symbol === _coinConverted.s) {
                                    _coinConverted.urls = _c.urls
                                    _coinConverted.logo = _c.logo
                                    _coinConverted.slug = _c.slug
                                    _coinConverted.description = _c.description
                                    _coinConverted.category = _c.category
                                    _coinConverted.symbol = _c.symbol
                                    _coinConverted.name = _c.name
                                    _coinConverted.date_added = _c.date_added
                                }
                            })
                            const klineIndex = state.klineFromDb.findIndex((_o: any) => _o.pair === _cName)
                            if (klineIndex >= 0) {
                                _coinConverted.kline = JSON.parse(JSON.stringify(state.klineFromDb[klineIndex].h8))
                            }
                            coinTickerArray[index] = JSON.parse(JSON.stringify(_coinConverted))
                        } else {
                            coinTickerArray.push(_coinConverted)
                        }
                    }
                })
            });
            switch (state.sortBy) {
                case 'price':
                    state.sortType ? state.coinTicker = [...coinTickerArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.c < b.c) return -1
                        if (a.c > b.c) return 1
                        else return 0
                    })] : state.coinTicker = [...coinTickerArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.c > b.c) return -1
                        if (a.c < b.c) return 1
                        else return 0
                    })]
                    break
                case 'change':
                    state.sortType ? state.coinTicker = [...coinTickerArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (getPercentage(a.c, a.o) < getPercentage(b.c, b.o)) return -1
                        if (getPercentage(a.c, a.o) > getPercentage(b.c, b.o)) return 1
                        else return 0
                    })] : state.coinTicker = [...coinTickerArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (getPercentage(a.c, a.o) > getPercentage(b.c, b.o)) return -1
                        if (getPercentage(a.c, a.o) < getPercentage(b.c, b.o)) return 1
                        else return 0
                    })]
                    break
                case 'coinVolume':
                    state.sortType ? state.coinTicker = [...coinTickerArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.v < b.v) return -1
                        if (a.v > b.v) return 1
                        else return 0
                    })] : state.coinTicker = [...coinTickerArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.v > b.v) return -1
                        if (a.v < b.v) return 1
                        else return 0
                    })]
                    break
                case 'pairVolume':
                    state.sortType ? state.coinTicker = [...coinTickerArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.q < b.q) return -1
                        if (a.q > b.q) return 1
                        else return 0
                    })] : state.coinTicker = [...coinTickerArray.sort((a: IminiTicker, b: IminiTicker) => {
                        if (a.q > b.q) return -1
                        if (a.q < b.q) return 1
                        else return 0
                    })]
                    break
                default:
                    state.coinTicker = [...coinTickerArray]
            }
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload.sorting
            state.sortType = action.payload.sortType
        },
        pairFiltering: (state, action) => {
            state.pairFilter = action.payload.pairs
        },
        searchField: (state, action) => {
            state.search = action.payload
        },
        pagination: (state, action) => {
            if (action.payload.direction === 'back') {
                if (state.dnwPagination > 0) {
                    state.dnwPagination -= 30
                    state.upwPagination -= 30
                }
            } else {
                    state.dnwPagination += 30
                    state.upwPagination += 30
            }
        },
        getKlineData: (state, action) => {
            // klineSaveOrUpdate(action.payload.data, klineArray, klineCoinNames)
        },
        getKlineFromDb: (state, action) => {
            state.klineFromDb = action.payload.data
        },
        snackToggle: (state) => { state.snack = !state.snack }
    }
})

export const { getWsConnection, setSortBy, pairFiltering, searchField, pagination, getKlineData, getKlineFromDb, snackToggle } = getWsSlice.actions

export default getWsSlice.reducer