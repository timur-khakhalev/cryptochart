import React, { FC } from 'react'
import { Avatar, TableRow, TableCell } from '@mui/material'
import { ICells } from '../interfaces/IWsConnection'
import { SeparateDigits } from '../utils/utils';

export const Cells: FC<ICells> = ({ i, c, s, p, h, l, v, q, logo, changePercent}) => {
    return (
            <TableRow>
                <TableCell>{i! + 1}</TableCell>
                <TableCell><Avatar sx={{ width: 24, height: 24 }} src={logo} /></TableCell>
                <TableCell>{s}/{p}</TableCell>
                <TableCell>{c > 0.0001 ? c.toFixed(4) : c}</TableCell>
                <TableCell align="center" sx={changePercent! > 0 ? { color: '#16c784' } : { color: '#ea3943' }} >{changePercent}</TableCell>
                <TableCell align="center" >{h > 0.0001 ? h.toFixed(4) : h} / {l > 0.0001 ? l.toFixed(4) : l}</TableCell>
                <TableCell align="center">{SeparateDigits(v.toFixed(0))}</TableCell>
                <TableCell align="center">{SeparateDigits(q.toFixed(2))}</TableCell>
            </TableRow>
    )
}
