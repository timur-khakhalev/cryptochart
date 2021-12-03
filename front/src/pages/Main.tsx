import React, { useState, useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Paper from '@mui/material/Paper';
import {
    Box, Chip, Button, Table, TableBody, TableCell, TableSortLabel, TableContainer, TableHead, TableRow,
} from '@mui/material';
import Popover from '@mui/material/Popover'
import axios from 'axios'
import WS from '../components/WS';
import { RootState } from '../redux/store'
import { setSortBy, setCoins } from '../redux/slice';
import pairs from '../list/pairs.json';

export default function Main(): ReactElement {
    const sortBy = useSelector((state: RootState) => state.getWsSlice.sortBy)
    const metadata = useSelector((state: RootState) => state.getWsSlice.metadata)
    const coinsArrFilter = useSelector((state: RootState) => state.getWsSlice.coinsArrFilter)
    const [ascSort, setSort] = useState(false)
    const [_coin, _setCoin] = useState<Set<string>>(new Set())
    const dispatch = useDispatch()
    const heads = {
        price: 'Price',
        change: 'Change, 24h',
        hl: 'H/L Price, 24h',
        cv: 'Coin Volume, 24h',
        pv: 'Pair Volume, 24h'
    }
    const handleSort = (sortBy: string): void => {
        setSort(!ascSort)
        dispatch(setSortBy({sorting: sortBy, sortType: ascSort}))
    }

    const __coinsArrayToRedux: string[] = []
    const handleCoins = (coin: string): void => {
        if (_coin.has(coin)) {
            _coin.delete(coin)
            _setCoin((prev: any) => new Set(prev))
        } else {
            _setCoin((prev: any) => new Set(prev.add(coin)))
        }
        _coin.forEach((e) => {
            __coinsArrayToRedux.push(e)
        })
        dispatch(setCoins({coins: __coinsArrayToRedux}))
    }

    const handleSendMeta = () => {
        // console.log(metadata)
        const buffSet = new Set()
        let buff: any = []
        // metadata.forEach((_m) => {
        //     let i: number
        //     for (let x of pairs.main) {
        //         i = _m.indexOf(x)
        //         if (i > 2) {
        //             buffSet.add(_m.slice(0, i))
        //         }
        //     }
        // })
        metadata.forEach((_m) => {
            if (_m !== '' && _m !== 'GXS' && _m !== 'NANO' && _m !== 'IOTA' && _m !== 'YOYO' && _m !== 'GHS' && _m !== 'IOS' && _m !== 'FRON') {
                buffSet.add(_m)
            }
        })
        // if (buffSet.delete('GXS')) {
        //     buffSet.add('GXC')
        // }
        pairs.fiat.forEach((_c) => {
            buffSet.delete(_c)
        })
        buff = [...buffSet]
        console.log(buff)
        axios.post(`http://localhost:3000/get-cmc?symbol=${buff.join(',')}`).then((r) => {
            console.log(r)
        })
    }

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

  return (
    <div>
          <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
              }}
          >
              <Box sx={{width: '22.5em'}}>
              {pairs.fiat.map((p: string, i: number) => {
                  return <Chip variant={_coin.has(p) ? 'filled' : 'outlined'} onDelete={() => handleCoins(p)} onClick={() => { handleCoins(p); }} sx={{ m: '.5em' }} label={p} />
              })}
              </Box>
          </Popover>
        <Paper sx={{ m: '1em', p: '1em' }}>
            {pairs.main.map((p: string) => {
                return <Chip variant={ _coin.has(p) ? 'filled' : 'outlined' } onDelete={() => handleCoins(p)} onClick={() => { handleCoins(p); }} sx={{m: '.5em'}} label={p} />
            })}
            <Button color="info" variant="outlined" onClick={handleClick}>Fiats {coinsArrFilter.length > 0 ? `(${coinsArrFilter.length})` : ''}</Button>
              <Button onClick={() => handleSendMeta()}>
                  Send nudes
              </Button>
              <Table stickyHeader >
                <TableHead>
                    <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Logo</TableCell>
                          <TableCell>Symbol</TableCell>
                          <TableCell><TableSortLabel direction={ascSort || sortBy === heads.price ? 'desc' : 'asc'} active={true} onClick={() => handleSort('price')} >{heads.price}</TableSortLabel></TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort || sortBy === heads.change ? 'desc' : 'asc'} active={true} onClick={() => handleSort('change')}>{heads.change}</TableSortLabel></TableCell>
                        <TableCell align="center">H/L price, 24h</TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort ? 'desc' : 'asc'} active={true} onClick={() => handleSort('coinVolume')}>Coin Volume</TableSortLabel></TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort ? 'desc' : 'asc'} active={true} onClick={() => handleSort('pairVolume')}>Pair Volume, 24h</TableSortLabel></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <WS/>
                </TableBody>
            </Table>
        </Paper>
    </div>
  );
}
