import React, { FC, useState, useContext } from 'react'
import { Dialog, Collapse, DialogTitle, Box, Card, Avatar, Button, ButtonGroup, Typography } from '@mui/material'
import { IosShare, Tag, ExpandMore, ExpandLess, Chat, Forum, Explore, Reddit, Twitter, Facebook } from '@mui/icons-material/';
import { AreaChart, Area, Tooltip, XAxis, YAxis } from 'recharts';
import { IMetadata } from '../interfaces/IWsConnection'
import '../styles/Metadata.scss'

export const Metadata: FC<IMetadata> = ({ open, onClose, p, urls, kline, logo, slug, category, name, symbol, date_added}) => {
    const [collapse, setCollapse] = useState({
        social: false,
        chats: false,
        message_board: false,
        explorer: false
    })
    return (
        <Dialog open={open!} onClose={onClose!}>
            {urls && logo
            ? <Card sx={{m: '0 auto'}}>
                    <Avatar sx={{ display: 'inline-block', top: '.5em', m: '0 .5em' }} src={logo} /><Typography variant='h4' sx={{ display: 'inline-block' }}>{name}</Typography>
                    <Box className='Badge BadgeHead' >{symbol}</Box>
                    <Box className='Badge BadgeHead'>{category}</Box>
                    <Box sx={{mx: '.5em'}}>
                        <Typography variant="caption">
                            Date added at {new Date(Date.parse(`${date_added}`)).toLocaleDateString('ru-RU')}
                        </Typography>
                    </Box>
                    <Box>
                        <Box className='Badge'><a href={urls[0].website[0]}><Typography><IosShare sx={{top: '3px', position: 'relative'}} />Website</Typography></a></Box>
                        {urls[0].source_code[0]
                        ? <Box className='Badge'><a href={urls[0].source_code[0]}><Typography><IosShare sx={{ top: '3px', position: 'relative' }} />Source code</Typography></a></Box>
                        : ''}
                        {urls[0].technical_doc[0]
                        ? <Box className='Badge'><a href={urls[0].technical_doc[0]}><Typography><IosShare sx={{ top: '3px', position: 'relative' }} />Whitepapers</Typography></a></Box>
                        : ''}
                    </Box>
                    <Box>
                        {urls[0].facebook[0] ? <Box className='Badge' onClick={() => setCollapse({ social: !collapse.social, chats: false, message_board: false, explorer: false })}><Typography><Tag sx={{ top: '7px', position: 'relative', m: '0 .2em' }} />Social media {collapse.social ? <ExpandLess sx={{ top: '3px', position: 'relative' }} /> : <ExpandMore sx={{ top: '3px', position: 'relative' }} />}</Typography></Box>
                        : urls[0].reddit[0] ? <Box className='Badge' onClick={() => setCollapse({ social: !collapse.social, chats: false, message_board: false, explorer: false })}><Typography><Tag sx={{ top: '7px', position: 'relative', m: '0 .2em' }} />Social media {collapse.social ? <ExpandLess sx={{ top: '3px', position: 'relative' }} /> : <ExpandMore sx={{ top: '3px', position: 'relative' }} />}</Typography></Box>
                        : urls[0].twitter[0] ? <Box className='Badge' onClick={() => setCollapse({ social: !collapse.social, chats: false, message_board: false, explorer: false })}><Typography><Tag sx={{ top: '7px', position: 'relative', m: '0 .2em' }} />Social media {collapse.social ? <ExpandLess sx={{ top: '3px', position: 'relative' }} /> : <ExpandMore sx={{ top: '3px', position: 'relative' }} />}</Typography></Box>
                        : ''}
                        {urls[0].chat[0]
                        ? <Box className='Badge' onClick={() => setCollapse({ social: false, chats: !collapse.chats, message_board: false, explorer: false })}><Typography><Chat sx={{ top: '7px', position: 'relative', m: '0 .2em' }} />Chats{collapse.chats ? <ExpandLess sx={{ top: '3px', position: 'relative' }} /> : <ExpandMore sx={{ top: '3px', position: 'relative' }} />}</Typography></Box>
                        : ''}
                        {urls[0].message_board[0]
                        ? <Box className='Badge' onClick={() => setCollapse({ social: false, chats: false, message_board: !collapse.message_board, explorer: false })}><Typography><Forum sx={{ top: '7px', position: 'relative', m: '0 .2em' }} />Message Boards{collapse.message_board ? <ExpandLess sx={{ top: '3px', position: 'relative' }} /> : <ExpandMore sx={{ top: '3px', position: 'relative' }} />}</Typography></Box>
                        : ''}
                        <Box className='Badge' onClick={() => setCollapse({ social: false, chats: false, message_board: false, explorer: !collapse.explorer })}><Typography><Explore sx={{ top: '7px', position: 'relative', m: '0 .2em' }} />Explorer{collapse.explorer ? <ExpandLess sx={{ top: '3px', position: 'relative' }} /> : <ExpandMore sx={{ top: '3px', position: 'relative' }} />}</Typography></Box>
                    </Box>
                    <Box sx={{m: '1em'}}>
                        <Collapse in={collapse.social}>
                            {urls[0].facebook[0] ? <Box className='BadgeLink'><a href={urls[0].facebook[0]}><Typography><Facebook sx={{ top: '3px', position: 'relative' }} />Facebook</Typography></a></Box> : ''}
                            {urls[0].reddit[0] ? <Box className='BadgeLink'><a href={urls[0].reddit[0]}><Typography><Reddit sx={{ top: '3px', position: 'relative' }} />Reddit</Typography></a></Box> : ''}
                            {urls[0].twitter[0] ? <Box className='BadgeLink'><a href={urls[0].twitter[0]}><Typography><Twitter sx={{ top: '3px', position: 'relative' }} />Twitter</Typography></a></Box> : ''}
                        </Collapse>
                        <Collapse in={collapse.chats}>
                            {urls[0].chat.map((item, i) => {
                                return <Box key={i} className='BadgeLink'><a href={item}><Typography><IosShare sx={{ top: '3px', position: 'relative' }} />{item}</Typography></a></Box>
                            })}
                        </Collapse>
                        <Collapse in={collapse.message_board}>
                            {urls[0].message_board.map((item, i) => {
                                return <Box key={i} className='BadgeLink'><a href={item}><Typography><IosShare sx={{ top: '3px', position: 'relative' }} />{item}</Typography></a></Box>
                            })}
                        </Collapse>
                        <Collapse in={collapse.explorer}>
                            {urls[0].explorer.map((item, i) => {
                                return <Box key={i} className='BadgeLink'><a href={item}><Typography><IosShare sx={{ top: '3px', position: 'relative' }} />{item.length > 35 ? `${item.substring(0, 35)}...` : item}</Typography></a></Box>
                            })}
                        </Collapse>
                    </Box>
                    <Box sx={{m: '0 auto', width: '25em'}}>
                        <Typography align='center'>
                            {symbol}/{p}
                        </Typography>
                        <AreaChart width={400} height={200} data={kline}>
                            <YAxis dataKey="c"/>
                            <XAxis dataKey="t" />
                            <Tooltip />
                            <Area type="monotone" dot={true} dataKey="c" />
                        </AreaChart>
                    </Box>
                    </Card>
                : <Box sx={{ m: '1em' }}>No data</Box>}
                </Dialog>
        )
}
