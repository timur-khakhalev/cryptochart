import React, { ReactElement, useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client';
import {
  TableCell, TableRow,
} from '@mui/material';
import { getPercentage, SeparateDigits } from '../utils/utils';
import { RootState } from '../redux/store'
import { getWsConnection } from '../redux/slice';

export default function WS(): ReactElement {
  const filtered = useSelector((state: RootState) => state.getWsSlice.filtered)
  const dispatch = useDispatch()

  useEffect(() => {
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
      const { engine } = socket.io;
      console.log(engine.transport.name); // in most cases, prints "polling"
    });

      socket.on('msg', (res) => {
        dispatch(getWsConnection(res.data))
      });
  }, []);
  if (filtered) {
    return (
      <>
      {
          filtered.map((f: any, i: number) => {
            const changePercent = getPercentage(f.c, f.o)
              if (i < 30) {
              return <TableRow>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{f.s}</TableCell>
                  <TableCell>{f.c > 0.0001 ? f.c.toFixed(4) : f.c}</TableCell>
                <TableCell sx={changePercent > 0 ? { color: '#16c784'} : { color: '#ea3943' }} >{changePercent}</TableCell>
                  <TableCell>{f.h > 0.0001 ? f.h.toFixed(4) : f.h} / {f.l > 0.0001 ? f.l.toFixed(4) : f.l}</TableCell>
                  <TableCell>{SeparateDigits(f.v.toFixed(0))}</TableCell>
                  <TableCell>{SeparateDigits(f.q.toFixed(2))}</TableCell>
              </TableRow>
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
