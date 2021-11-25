/* eslint-disable consistent-return */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable semi */
import React, { ReactElement, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import getPercentage from '../utils/getPercentage';
import Tab from './Tab';
import coinlist from '../list/coins.json';

export default function WS(): ReactElement {
  const [value, setValue] = useState({
    E: '',
    e: '',
    s: '',
    c: 0,
    h: 0,
    l: 0,
    o: 0,
    q: 0,
    v: 0,
  });

  const [currency, setCurrency] = useState('');

  const arr = ['BTC', 'ETH', 'AVAX', 'WAXP', 'HIVE']
  useEffect(() => {
    const socket = io('ws://localhost:811', { transports: ['websocket'] });
    socket.on('connect', () => {
      console.log('Connection established from client');

      const msg = {
        coins: coinlist,
        pair: 'usdt',
        method: 'miniTicker',
      };

      socket.emit('events', msg, (res: any) => {
      });
      const { engine } = socket.io;
      console.log(engine.transport.name); // in most cases, prints "polling"

      // engine.once("upgrade", () => {
      //     // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
      //     console.log(engine.transport.name); // in most cases, prints "websocket"
      // });

      // engine.on("packetCreate", ({ type, data }) => {
      //     // called for each packet sent
      //     console.log('Stype', type)
      //     console.log('Sdata', data)
      // });
    });

    socket.on('msg', (res) => {
      setValue({
        E: res.data.E,
        c: res.data.c,
        e: res.data.e,
        h: res.data.h,
        l: res.data.l,
        o: res.data.o,
        q: res.data.q,
        s: res.data.s,
        v: res.data.v,
      });
    });
  }, []);
  return (
    <>
    {
      // eslint-disable-next-line consistent-return
      // eslint-disable-next-line array-callback-return
      arr.map((v) => {
        console.log(v)
          return <TableRow>
            <Tab val={value.s}/>
          </TableRow>
    })
  }
  </>
  )
  // eslint-disable-next-line no-else-return
}
