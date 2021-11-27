import React, { ReactElement } from 'react';
import Paper from '@mui/material/Paper';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import WS from '../components/WS';

export default function Main(): ReactElement {
  return (
    <div>
        <Paper sx={{ m: '1em', p: '1em' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Change, 24h</TableCell>
                        <TableCell>H/L price, 24h</TableCell>
                        <TableCell>Coin Volume, 24h</TableCell>
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
