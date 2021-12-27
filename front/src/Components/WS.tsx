/* eslint-disable no-unused-expressions */
import React, { ReactElement, useEffect, Suspense, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client';
import { Snack } from './Snack';
import { getPercentage } from '../utils/utils';
import { RootState } from '../redux/store'
import { getWsConnection, getKlineData, getKlineFromDb, snackToggle } from '../redux/slice';
// import { Cells } from './Cells'
import { ICells } from '../interfaces/IWsConnection';

const Cells = React.lazy(() => import('./Cells'))
export default function WS(): ReactElement {
  const [alert, setAlert] = useState<{ show: boolean, message: string, type: string }>({
    show: false,
    message: '',
    type: ''
  })
  const coinTicker = useSelector((state: RootState) => state.getWsSlice.coinTicker)
  const sortBy = useSelector((state: RootState) => state.getWsSlice.sortBy)
  const checkKline = useSelector((state: RootState) => state.getWsSlice.checkKlineIsReady)
  const klinePairs = useSelector((state: RootState) => state.getWsSlice.klinePairs)
  const searchValue = useSelector((state: RootState) => state.getWsSlice.search)
  const pairFilter = useSelector((state: RootState) => state.getWsSlice.pairFilter)
  const dnwPagination = useSelector((state: RootState) => state.getWsSlice.dnwPagination)
  const upwPagination = useSelector((state: RootState) => state.getWsSlice.upwPagination)
  const dispatch = useDispatch()
  useEffect(() => {
    const prevSort: string = sortBy
    const socket = io('ws://localhost:811', { transports: ['websocket'] });
    socket.on('connect', () => {
      setAlert({
        show: true,
        message: 'Connection established!',
        type: 'success'
      })
      dispatch(snackToggle())
      const msg = {
        // coins: coinlist,
        // pair: 'usdt',
        // method: '!miniTicker@arr',
      };
      socket.emit('$CoinTicker', msg, (res: any) => {
      });
      if (checkKline) {
        let buff: string[] = []
        Object.values(klinePairs).map((v, i) => {
          if (buff.length < 200) {
            buff.push(v)
            const msgKline = {
              pairs: buff,
              method: 'kline_8h'
            }
            socket.emit('$Kline', msgKline, (res: any) => console.log('data sent', res))
            buff = []
          }
        })
        console.log(checkKline)
        socket.emit('$KlineFromDb', 'llsl', (res: any) => dispatch(getKlineFromDb({data: res})))
      }
    });

    socket.on('connect_error', (err) => {
      setAlert({
        show: true,
        message: JSON.stringify(err),
        type: 'error'
      })
      console.log(err)
      dispatch(snackToggle())
    })

    socket.on('CoinTicker$', (res) => {
      dispatch(getWsConnection({data: res.data, sort: sortBy}))
    });
    return () => {
      prevSort !== sortBy
      socket.disconnect()
    }
  }, [sortBy, checkKline]);
  if (coinTicker) {
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <Suspense fallback={<>Loading..</>}>
        {
          alert.show ? <Snack message={alert.message} type={alert.type} /> : ''
        }
      {
      (coinTicker).map((f: ICells, i: number) => {
            if (pairFilter.length > 0) {
                for (let _coin of pairFilter) {
                  if (f.p === _coin) {
                    const changePercent = getPercentage(f.c, f.o)
                    if (searchValue) {
                      if (f.s.match(searchValue)) {
                        return <Cells
                          urls={f.urls} logo={f.logo} slug={f.slug} description={f.description} category={f.category} name={f.name} symbol={f.symbol} date_added={f.date_added}
                          kline={f.kline}
                          key={i}
                          sp={f.sp}
                          s={f.s}
                          p={f.p}
                          c={f.c}
                          o={f.o}
                          h={f.h}
                          l={f.l}
                          v={f.v}
                          q={f.q}
                          i={i}
                          changePercent={changePercent} />
                      }
                    } else {
                      return <Cells
                        urls={f.urls} logo={f.logo} slug={f.slug} description={f.description} category={f.category} name={f.name} symbol={f.symbol} date_added={f.date_added}
                        kline={f.kline}
                        key={i}
                        sp={f.sp}
                        s={f.s}
                        p={f.p}
                        c={f.c}
                        o={f.o}
                        h={f.h}
                        l={f.l}
                        v={f.v}
                        q={f.q}
                        i={i}
                        changePercent={changePercent} />
                    }
                }
            }
          } else {
              const changePercent = getPercentage(f.c, f.o)
                if (searchValue) {
                  if (f.s.match(searchValue)) {
                      return <Cells
                        urls={f.urls} logo={f.logo} slug={f.slug} description={f.description} category={f.category} name={f.name} symbol={f.symbol} date_added={f.date_added}
                        kline={f.kline}
                        key={i}
                        sp={f.sp}
                        s={f.s}
                        p={f.p}
                        c={f.c}
                        o={f.o}
                        h={f.h}
                        l={f.l}
                        v={f.v}
                        q={f.q}
                        i={i}
                        changePercent={changePercent}/>
                  }
                } else {
                  if (i >= dnwPagination && i < upwPagination) {
                    return <Cells
                      urls={f.urls} logo={f.logo} slug={f.slug} description={f.description} category={f.category} name={f.name} symbol={f.symbol} date_added={f.date_added}
                      kline={f.kline}
                      key={i}
                      sp={f.sp}
                      s={f.s}
                      p={f.p}
                      c={f.c}
                      o={f.o}
                      h={f.h}
                      l={f.l}
                      v={f.v}
                      q={f.q}
                      i={i}
                      changePercent={changePercent} />
                  }
                }
              }
          })
    }
    </Suspense>
    )
  } else {
    return (
      <>
      Loading
      </>
    )
  }
}
