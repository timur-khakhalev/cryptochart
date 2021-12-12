/* eslint-disable no-continue */
import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { IWsConnection, IminiTicker, ICells } from '../interfaces/IWsConnection';
import { getPercentage } from '../utils/utils';
import pairs from '../list/pairs.json'

export interface FilteredState{
    filtered: ICells[],
    sortBy: string,
    sortType: boolean,
    coins: string[],
    coinsArrFilter: string[],
    metadata: string[],
    search: string,
    dnwPagination: number,
    upwPagination: number
}

const initialState: FilteredState = {
    filtered: [],
    sortBy: '',
    sortType: false,
    coins: [],
    coinsArrFilter: [],
    metadata: [],
    search: '',
    dnwPagination: 0,
    upwPagination: 50
}
const filteredArray: any = [];
let buff: any = []
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
            // console.log(metaData.length)
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
                    urls: {
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
                    },
                    logo: '',
                    slug: '',
                    description: '',
                    category: '',
                    name: '',
                    symbol: ''
                }
                coinNames.add(_coin.s)
                // console.log(metaData.length)
                // metaData.forEach((c: any) => {
                //     console.log(c.symbol)
                // })
                // for (let x of metaData) {
                //     x.forEach((_c: any) => console.log(_c))
                // }
                coinNames.forEach((_cName: any) => {
                    if (_cName === _coinConverted.sp) {
                        // console.log(metaData)
                        pairs.all.forEach(x => {
                            let i = _coinConverted.sp.indexOf(x)
                            if (i > 1) {
                                _coinConverted.s = _coinConverted.sp.slice(0, i)
                            }
                        })
                        symbolsSet.add(_coinConverted.s)
                        state.metadata = [...symbolsSet]
                        // console.log(_coinConverted.s)
                        _coinConverted.p = pairs.all.find(x => {
                            let i = _coinConverted.sp.indexOf(x)
                            if (i > 1) {
                                return _coinConverted.sp.slice(i)
                            }
                        })!
                                                // const _searchInMeta = metaData.find((_x: any) => {
                        //     // console.log(`${_coinConverted.s} // ${_x.symbol}`)
                        //     _coinConverted.s === _x.symbol
                        // })
                        // console.log(_searchInMeta)
                        // console.log(_coinConverted)
                        // let i: number;
                        // for (let x of pairs.all) {
                        //     i = _coinConverted.s.indexOf(x)
                        //     if (i > 2) {
                        //         _coinConverted.s = _coinConverted.s.slice(0, i)
                        //         _coinConverted.p = _cName.slice(_coinConverted.s.indexOf(x), x.length)
                        //     }
                        // }
                        const index = filteredArray.findIndex((_o: IWsConnection) => _o.sp === _cName)
                        if (index >= 0) {
                            // let buffer: any = []
                            metaData.forEach((_c: any) => {
                                if (_c.symbol === _coinConverted.s) {
                                    _coinConverted.logo = _c.logo
                                }
                            })
                            filteredArray[index] = _coinConverted
                        } else {
                            filteredArray.push(_coinConverted)
                        }
                    }
                })
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
            state.coinsArrFilter = action.payload.coins
        },
        getData: (state, action) => {
            // axios.get('http://localhost:3000/get-cmc').then((res) => {
            //     state.metadata.push(res.data)
            // })
            // console.log(state.metadata)
        },
        searchField: (state, action) => {
            state.search = action.payload
        },
        pagination: (state, action) => {
            if (action.payload.direction === 'back') {
                if (state.dnwPagination > 0) {
                    state.dnwPagination -= 50
                    state.upwPagination -= 50
                }
            } else {
                    state.dnwPagination += 50
                    state.upwPagination += 50
            }
        }
    }
})

export const { getWsConnection, setSortBy, setCoins, getData, searchField, pagination } = getWsSlice.actions

export default getWsSlice.reducer