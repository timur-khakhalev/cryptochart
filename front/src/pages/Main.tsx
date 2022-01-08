import React, { useState, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Box, Paper, Button, IconButton, Table, TableBody, TableCell, TableSortLabel, TableContainer, TableHead, TableRow, Popover, Typography
} from '@mui/material';
import { AttachMoney, ArrowBack, ArrowForward} from '@mui/icons-material';
import TableRows from '../components/TableRows';
import { Snack } from '../components/Snack'
import { RootState } from '../redux/store'
import { setSortBy, pairFiltering, searchField, pagination, snackToggle } from '../redux/slice';
import pairs from '../list/pairs.json';
import '../styles/chip.scss'
import '../styles/search.scss'

export default function Main(): ReactElement {
    const pairFilter = useSelector((state: RootState) => state.getWsSlice.pairFilter)
    const [alert, setAlert] = useState<{ show: boolean, message: string, type: string }>({
        show: false,
        message: '',
        type: ''
    })
    const [ascSort, setSort] = useState({ sortByColumn: '', sortDirection: false})
    const [_coin, _setCoin] = useState<Set<string>>(new Set())
    const dispatch = useDispatch()
    const handleSort = (sortBy: string): void => {
        setSort({ sortByColumn: sortBy, sortDirection: !ascSort.sortDirection})
        dispatch(setSortBy({sorting: sortBy, sortType: ascSort.sortDirection}))
        setAlert({
            show: true,
            message: 'Pending request..',
            type: 'info'
        })
        dispatch(snackToggle())
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
        dispatch(pairFiltering({pairs: __coinsArrayToRedux}))
    }

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            dispatch(searchField(event.target.value.toUpperCase().replace(/[^\w]/g, '')))
        }, 500)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

  return (
    <div>
          {
              alert.show ? <Snack message={alert.message} type={alert.type} /> : ''
          }
          <Popover open={open} anchorEl={anchorEl} id={id} onClose={handleClose} anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
              }}
          >
              <Box sx={{width: '22.5em', py: '1em'}}>
                  {pairs.fiat.map((p: string, i: number) => <div className={_coin.has(p) ? 'Chip Chip_fiats Chip_active' : 'Chip Chip_fiats'} role='button' tabIndex={0} key={i} onClick={() => { handleCoins(p); } }>{p}</div>)}
              </Box>
          </Popover>
        <Paper sx={{ m: '1em', p: '1em' }}>
              <div className="searchFieldArea">
                  <input type="search" placeholder='Search Coins' className="searchFieldArea_input" onChange={handleChangeSearch}/>
              </div>
              <Box sx={{mx: '.5em', display: 'inline-block'}}>
                  Pages
                  <IconButton onClick={() => dispatch(pagination({ direction: 'back' }))}>
                      <ArrowBack />
                  </IconButton>
                  <IconButton onClick={() => dispatch(pagination({ direction: 'forward' }))}>
                      <ArrowForward />
                  </IconButton>
              </Box>
              Filters: {pairFilter.length > 0 ? `(${pairFilter.length})` : '(0)'}
            {pairs.main.map((p: string, i: number) => {
                return <div className={_coin.has(p) ? 'Chip Chip_active' : 'Chip'} role='button' key={i} onClick={() => { handleCoins(p); }}>{p}</div>
            })}
              <Button className='Chip' startIcon={<AttachMoney />} variant='contained' sx={{borderRadius: '40px', m: '0 .5em', p: '0 1em', height: '2.3em'}} color='inherit' role='button' onClick={handleClick}>Fiats</Button>
              <Table stickyHeader >
                <TableHead>
                    <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell onClick={() => handleSort('default')}>Symbol</TableCell>
                          <TableCell><TableSortLabel direction={ascSort.sortDirection && ascSort.sortByColumn === 'price' ? 'asc' : !ascSort.sortDirection && ascSort.sortByColumn === 'price' ? 'desc' : 'asc'} active={true} onClick={() => handleSort('price')} >Price</TableSortLabel></TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort.sortDirection && ascSort.sortByColumn === 'change' ? 'asc' : !ascSort.sortDirection && ascSort.sortByColumn === 'change' ? 'desc' : 'asc'} active={true} onClick={() => handleSort('change')}>Change, 24h</TableSortLabel></TableCell>
                        <TableCell align="center">H/L price, 24h</TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort.sortDirection && ascSort.sortByColumn === 'coinVolume' ? 'asc' : !ascSort.sortDirection && ascSort.sortByColumn === 'coinVolume' ? 'desc' : 'asc'} active={true} onClick={() => handleSort('coinVolume')}>Coin Volume, 24h</TableSortLabel></TableCell>
                          <TableCell align="center"><TableSortLabel direction={ascSort.sortDirection && ascSort.sortByColumn === 'pairVolume' ? 'asc' : !ascSort.sortDirection && ascSort.sortByColumn === 'pairVolume' ? 'desc' : 'asc'} active={true} onClick={() => handleSort('pairVolume')}>Pair Volume, 24h</TableSortLabel></TableCell>
                          <TableCell align="center">Change, Last 7 days</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRows/>
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
