import React, { useState, useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Box, Paper, Chip, TextField, Button, IconButton, Table, TableBody, TableCell, TableSortLabel, TableContainer, TableHead, TableRow, Popover, Typography
} from '@mui/material';
import { AttachMoney, ArrowBack, ArrowForward} from '@mui/icons-material';
import axios from 'axios'
import WS from '../components/WS';
import { RootState } from '../redux/store'
import { setSortBy, setCoins, searchField, pagination } from '../redux/slice';
import pairs from '../list/pairs.json';

export default function Main(): ReactElement {
    const sortBy = useSelector((state: RootState) => state.getWsSlice.sortBy)
    const metadata = useSelector((state: RootState) => state.getWsSlice.metadata)
    const coinsArrFilter = useSelector((state: RootState) => state.getWsSlice.coinsArrFilter)
    const [ascSort, setSort] = useState({ sortByColumn: '', sortDirection: false})
    const [_coin, _setCoin] = useState<Set<string>>(new Set())
    const dispatch = useDispatch()
    const handleSort = (sortBy: string): void => {
        setSort({ sortByColumn: sortBy, sortDirection: !ascSort.sortDirection})
        dispatch(setSortBy({sorting: sortBy, sortType: ascSort.sortDirection}))
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

    const handleSendMeta = () => { //TODO:Переделать в отдельную функцию и сохранить
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

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchField(event.target.value.toUpperCase()))
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
                  return <Chip variant={_coin.has(p) ? 'filled' : 'outlined'} onClick={() => { handleCoins(p); }} sx={{ m: '.5em' }} label={p} />
              })}
              </Box>
          </Popover>
        <Paper sx={{ m: '1em', p: '1em' }}>
              <TextField
                sx={{bottom: '.3em', width: '7.5em'}}
                id="search"
                margin="dense"
                size="small"
                label="Search Coin"
                onChange={handleChangeSearch}
              />
              <Box sx={{mx: '.5em', display: 'inline-block'}}>
                  Pages
                  <IconButton onClick={() => dispatch(pagination({ direction: 'back' }))}>
                      <ArrowBack />
                  </IconButton>
                  <IconButton onClick={() => dispatch(pagination({ direction: 'forward' }))}>
                      <ArrowForward />
                  </IconButton>
              </Box>
            {pairs.main.map((p: string) => {
                return <Chip sx={{m: '.5em' }} variant={ _coin.has(p) ? 'filled' : 'outlined' } onClick={() => { handleCoins(p); }} label={p} />
            })}
            <Button startIcon={<AttachMoney/>} size="small" color="inherit" variant="outlined" onClick={handleClick}>Fiats {coinsArrFilter.length > 0 ? `(${coinsArrFilter.length})` : ''}</Button>
              <Table stickyHeader >
                <TableHead>
                    <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Logo</TableCell>
                          <TableCell>Symbol</TableCell>
                          <TableCell><TableSortLabel direction={ascSort.sortDirection && ascSort.sortByColumn === 'price' ? 'asc' : !ascSort.sortDirection && ascSort.sortByColumn === 'price' ? 'desc' : 'asc'} active={true} onClick={() => handleSort('price')} >Price</TableSortLabel></TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort.sortDirection && ascSort.sortByColumn === 'change' ? 'asc' : !ascSort.sortDirection && ascSort.sortByColumn === 'change' ? 'desc' : 'asc'} active={true} onClick={() => handleSort('change')}>Change, 24h</TableSortLabel></TableCell>
                        <TableCell align="center">H/L price, 24h</TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort.sortDirection && ascSort.sortByColumn === 'coinVolume' ? 'asc' : !ascSort.sortDirection && ascSort.sortByColumn === 'coinVolume' ? 'desc' : 'asc'} active={true} onClick={() => handleSort('coinVolume')}>Coin Volume, 24h</TableSortLabel></TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort.sortDirection && ascSort.sortByColumn === 'pairVolume' ? 'asc' : !ascSort.sortDirection && ascSort.sortByColumn === 'pairVolume' ? 'desc' : 'asc'} active={true} onClick={() => handleSort('pairVolume')}>Pair Volume, 24h</TableSortLabel></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <WS/>
                </TableBody>
            </Table>
              <Box sx={{m: '0 auto', width: '10em'}}>
                  Pages
                  <IconButton onClick={() => dispatch(pagination({ direction: 'back' }))}>
                      <ArrowBack />
                  </IconButton>
                  <IconButton onClick={() => dispatch(pagination({ direction: 'forward' }))}>
                      <ArrowForward />
                  </IconButton>
              </Box>
        </Paper>
    </div>
  );
}
