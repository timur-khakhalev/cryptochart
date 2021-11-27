/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable dot-notation */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable semi */
import React, { ReactElement, useEffect, useState, useReducer } from 'react';
import { io } from 'socket.io-client';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import getPercentage from '../utils/getPercentage';
import Tab from './Tab';
import { reduc, initialState } from '../reducer/reducer'
import coinlist from '../list/coins.json';

export default function WS(): ReactElement {
  const [state, dispatch] = useReducer(reduc, initialState)
  const { products, filtered }: any = state

  const arr = ['BTC', 'ETH', 'AVAX', 'WAXP', 'HIVE', 'GTC', 'STORJ', 'DEXE', 'PYR', 'MASK']
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

      // eslint-disable-next-line react/no-this-in-sfc
      socket.on('msg', (res) => {
        dispatch({type: 'set', payload: res.data})
      });
  }, []);
  if (filtered) {
    return (
      <>
      {
        // eslint-disable-next-line array-callback-return
          filtered.map((f: any, i: number) => {
            // eslint-disable-next-line dot-notation
              // eslint-disable-next-line react/no-array-index-key
              if (i < 30) {
              return <>
                <TableRow>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{f.s}</TableCell>
                  <TableCell>{Number.parseFloat(f.c).toFixed(4)}</TableCell>
                  <TableCell>{getPercentage(f.c, f.o)}</TableCell>
                  <TableCell>{Number.parseFloat(f.h).toFixed(4)} / {Number.parseFloat(f.l).toFixed(4)}</TableCell>
                  <TableCell>{Number.parseFloat(f.q).toFixed(2)}</TableCell>
              </TableRow>
            </>
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
