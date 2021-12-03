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

export default function WS(): ReactElement {
  const filtered = useSelector((state: RootState) => state.getWsSlice.filtered)
  const sortBy = useSelector((state: RootState) => state.getWsSlice.sortBy)
  const metadata = useSelector((state: RootState) => state.getWsSlice.metadata)
  const coinsArrFilter = useSelector((state: RootState) => state.getWsSlice.coinsArrFilter)
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
          (filtered).map((f: any, i: number) => {
            // console.log(coinsArrFilter)
            if (coinsArrFilter.length > 0) {
                for (let _coin of coinsArrFilter) {
                  if (f.p === _coin) {
                    const changePercent = getPercentage(f.c, f.o)
                    // if (i < 30) {
                      return <TableRow>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell><Avatar sx={{ width: 24, height: 24 }} src={f.logo} /></TableCell>
                                <TableCell>{f.s}/{f.p} {f.sp}</TableCell>
                                <TableCell>{f.c > 0.0001 ? f.c.toFixed(4) : f.c}</TableCell>
                                <TableCell sx={changePercent > 0 ? { color: '#16c784'} : { color: '#ea3943' }} >{changePercent}</TableCell>
                                <TableCell>{f.h > 0.0001 ? f.h.toFixed(4) : f.h} / {f.l > 0.0001 ? f.l.toFixed(4) : f.l}</TableCell>
                                <TableCell>{SeparateDigits(f.v.toFixed(0))}</TableCell>
                                <TableCell>{SeparateDigits(f.q.toFixed(2))}</TableCell>
                            </TableRow>
                  // }
                }
            }
          } else {
              const changePercent = getPercentage(f.c, f.o)
              if (i < 30) {
                return <TableRow>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell><Avatar sx={{ width: 24, height: 24 }} src={f.logo} /></TableCell>
                  <TableCell>{f.s}/{f.p} {f.sp}</TableCell>
                  <TableCell>{f.c > 0.0001 ? f.c.toFixed(4) : f.c}</TableCell>
                  <TableCell align="center" sx={changePercent > 0 ? { color: '#16c784' } : { color: '#ea3943' }} >{changePercent}</TableCell>
                  <TableCell align="center" >{f.h > 0.0001 ? f.h.toFixed(4) : f.h} / {f.l > 0.0001 ? f.l.toFixed(4) : f.l}</TableCell>
                  <TableCell align="center">{SeparateDigits(f.v.toFixed(0))}</TableCell>
                  <TableCell align="center">{SeparateDigits(f.q.toFixed(2))}</TableCell>
                </TableRow>
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
