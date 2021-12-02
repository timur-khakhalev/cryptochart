import React, { useState, useEffect, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Paper from '@mui/material/Paper';
import {
    Box, Chip, Button, Table, TableBody, TableCell, TableSortLabel, TableContainer, TableHead, TableRow,
} from '@mui/material';
import Popover from '@mui/material/Popover'
import WS from '../components/WS';
import { RootState } from '../redux/store'
import { setSortBy, setCoins } from '../redux/slice';
import pairs from '../list/pairs.json';

export default function Main(): ReactElement {
    const sortBy = useSelector((state: RootState) => state.getWsSlice.sortBy)
    const [ascSort, setSort] = useState(false)
    const [_coin, _setCoin] = useState<Set<string>>(new Set())
    const _coinSet = new Set()
    const dispatch = useDispatch()
    const headers = {
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

    const handleCoins = (coin: string): void => {
        // _coinSet.add(coin)
        if (_coin.has(coin)) {
            _coin.delete(coin)
            _setCoin((prev: any) => new Set(prev))
        } else {
            _setCoin((prev: any) => new Set(prev.add(coin)))
        }
        // console.log(_coinSet)
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

    console.log('sortBy', sortBy)
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
            <Button color="info" variant="contained" onClick={handleClick}>Fiats</Button>
              <Table stickyHeader >
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Symbol</TableCell>
                          <TableCell><TableSortLabel direction={ascSort || sortBy === headers.price ? 'desc' : 'asc'} active={true} onClick={() => handleSort('price')} >{headers.price}</TableSortLabel></TableCell>
                          <TableCell><TableSortLabel direction={ascSort || sortBy === headers.change ? 'desc' : 'asc'} active={true} onClick={() => handleSort('change')}>{headers.change}</TableSortLabel></TableCell>
                        <TableCell>H/L price, 24h</TableCell>
                          <TableCell><TableSortLabel direction={ascSort ? 'desc' : 'asc'} active={true} onClick={() => handleSort('coinVolume')}>Coin Volume</TableSortLabel></TableCell>
                          <TableCell><TableSortLabel direction={ascSort ? 'desc' : 'asc'} active={true} onClick={() => handleSort('pairVolume')}>Pair Volume, 24h</TableSortLabel></TableCell>
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
