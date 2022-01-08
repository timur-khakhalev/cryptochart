/* eslint-disable react/no-unknown-property */
import React, { FC, useState } from 'react'
import { Avatar, TableRow, TableCell, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AreaChart, Area, Tooltip, XAxis } from 'recharts';
import { Metadata } from './Metadata'
import { ICells, IChartData } from '../interfaces/IWsConnection'
import { SeparateDigits } from '../utils/utils';
import '../styles/cells.scss'

const useStyles = makeStyles({
    coinHeader: {
        cursor: 'pointer'
    }
})
export const Cells: FC<ICells> = ({ i, c, s, sp, p, h, l, v, q, kline, logo, changePercent, urls, slug, description, category, name, symbol, date_added}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const convertedKline: any = []
    kline.forEach((i: IChartData) => {
        convertedKline.push({ t: new Date(i.t).toLocaleString('ru-RU'), Price: i.c})
    })
    return (<>
            <TableRow className='Cell' key={i}>
                <TableCell>{i! + 1}</TableCell>
                <TableCell>
                <Box className={classes.coinHeader} onClick={() => setOpen(true)}>
                    <div className='Symbol'>
                            <div className='Symbol_logo'>
                                <Avatar sx={{ width: '24px', height: '24px' }} src={logo} />
                            </div>
                            <div className='Symbol_txt'>
                                {s}/{p}
                            </div>
                        </div>
                    </Box>
                </TableCell>
                <TableCell>{c > 0.0001 ? c.toFixed(4) : c}</TableCell>
            <TableCell align="center" sx={changePercent! > 0 ? { color: '#16c784', fontWeight: 500 } : { color: '#ea3943', fontWeight: 500 }}>{changePercent}</TableCell>
                <TableCell align="center" >{h > 0.0001 ? h.toFixed(4) : h} / {l > 0.0001 ? l.toFixed(4) : l}</TableCell>
                <TableCell align="center">{SeparateDigits(v.toFixed(0))}</TableCell>
            <TableCell align="center">{SeparateDigits(q.toFixed(2))}</TableCell>
                <TableCell align="center">
                    <AreaChart width={150} height={80} data={convertedKline}>
                    <XAxis dataKey="t" />
                    <Tooltip/>
                    <Area type="monotone" dot={true} dataKey="Price" stroke={changePercent! > 0 ? '#16c784' : '#ea3943'} fill={changePercent! > 0 ? '#16c784' : '#ea3943'}/>
                    </AreaChart>
                </TableCell>
            </TableRow>
                <Metadata open={open} onClose={() => setOpen(false)} p={p} urls={urls} kline={kline} logo={logo} slug={slug} description={description} category={category} name={name} symbol={symbol} date_added={date_added} />
            </>
    )
}

export default Cells