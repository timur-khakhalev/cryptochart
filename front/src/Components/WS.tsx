/* eslint-disable no-unused-expressions */
import React, { ReactElement, useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client';
import {
  TableCell, TableRow, Avatar
} from '@mui/material';
import { getPercentage, SeparateDigits } from '../utils/utils';
import { RootState } from '../redux/store'
import { getWsConnection } from '../redux/slice';
import { Cells } from './Cells'
import { ICells } from '../interfaces/IWsConnection';

export default function WS(): ReactElement {
  const filtered = useSelector((state: RootState) => state.getWsSlice.filtered)
  const sortBy = useSelector((state: RootState) => state.getWsSlice.sortBy)
  const metadata = useSelector((state: RootState) => state.getWsSlice.metadata)
  const searchValue = useSelector((state: RootState) => state.getWsSlice.search)
  const coinsArrFilter = useSelector((state: RootState) => state.getWsSlice.coinsArrFilter)
  const dnwPagination = useSelector((state: RootState) => state.getWsSlice.dnwPagination)
  const upwPagination = useSelector((state: RootState) => state.getWsSlice.upwPagination)
  const dispatch = useDispatch()
  useEffect(
    () => {
    const prevSort: string = sortBy
    const socket = io('ws://localhost:811', { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log('Connection established from client');

      const msg = {
        // coins: coinlist,
        // pair: 'usdt',
        method: '!miniTicker@arr',
      };
      socket.emit('events', msg, (res: any) => {
      });
    });

    socket.on('msg', (res) => {
      dispatch(getWsConnection({data: res.data, sort: sortBy}))
    });
    return () => {
      prevSort !== sortBy
      socket.disconnect()
    }
  },
    [sortBy]
    );
    // console.log('meta', metadata)
    // console.log(coinsArrFilter)
  if (filtered) {
    return (
      <>
      {
          (filtered).map((f: ICells, i: number) => {
            // console.log(coinsArrFilter)
            if (coinsArrFilter.length > 0) {
                for (let _coin of coinsArrFilter) {
                  if (f.p === _coin) {
                    const changePercent = getPercentage(f.c, f.o)
                    // if (i < 30) {
                    if (searchValue) {
                      if (f.s.match(searchValue)) {
                        return <Cells
                          s={f.s}
                          p={f.p}
                          c={f.c}
                          o={f.o}
                          h={f.h}
                          l={f.l}
                          v={f.v}
                          q={f.q}
                          i={i}
                          logo={f.logo}
                          changePercent={changePercent} />
                      }
                    } else {
                      return <Cells
                        s={f.s}
                        p={f.p}
                        c={f.c}
                        o={f.o}
                        h={f.h}
                        l={f.l}
                        v={f.v}
                        q={f.q}
                        i={i}
                        logo={f.logo}
                        changePercent={changePercent} />
                    }
                  // }
                }
            }
          } else {
              const changePercent = getPercentage(f.c, f.o)
                if (searchValue) {
                  if (f.s.match(searchValue)) {
                      return <Cells
                            s={f.s}
                            p={f.p}
                            c={f.c}
                            o={f.o}
                            h={f.h}
                            l={f.l}
                            v={f.v}
                            q={f.q}
                            i={i}
                            logo={f.logo}
                            changePercent={changePercent}/>
                  }
                } else {
                  if (i >= dnwPagination && i < upwPagination) {
                    return <Cells
                      s={f.s}
                      p={f.p}
                      c={f.c}
                      o={f.o}
                      h={f.h}
                      l={f.l}
                      v={f.v}
                      q={f.q}
                      i={i}
                      logo={f.logo}
                      changePercent={changePercent} />
                  }
                }
              }
          })
    }
    </>
    )
  } else {
    return (
      <>
      Loading
      </>
    )
  }
  // eslint-disable-next-line no-else-return
}
