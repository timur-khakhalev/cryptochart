import React, { ReactElement, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import coinlist from '../list/coins.json'

interface Props {
    
}

export default function WS({}: Props): ReactElement {

    const [btc, setBTC] = useState({
        E: '',
        c: '',
        e: '',
        h: '',
        l: '',
        o: '',
        q: '',
        s: '',
        v: '',
    })
    const [eth, setETH] = useState({
        E: '',
        c: '',
        e: '',
        h: '',
        l: '',
        o: '',
        q: '',
        s: '',
        v: '',
    })
    useEffect(() => {
    const socket = io('ws://localhost:811', {transports: ['websocket']})
    socket.on('connect', () => {
        console.log('Connection established from client')

        const msg = {
            coins: coinlist,
            pair: 'usdt',
            method: 'miniTicker'
        }

        socket.emit('events', msg, (res: any) => {
        })
        const engine = socket.io.engine;
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

    })

        socket.on('msg', (res) => {
            console.log(res.data[0])
            Object.entries(res.data).forEach((r) => {
                return r.forEach((k) => {
                    return console.log(k)
                })
            })
            if (res.data.s === 'BTCUSDT') {
                setBTC({
                    E: res.data.E,
                    c: res.data.c,
                    e: res.data.e,
                    h: res.data.h,
                    l: res.data.l,
                    o: res.data.o,
                    q: res.data.q,
                    s: res.data.s,
                    v: res.data.v,
                })
            }
            if (res.data.s === 'ETHUSDT') {
                setETH({
                    E: res.data.E,
                    c: res.data.c,
                    e: res.data.e,
                    h: res.data.h,
                    l: res.data.l,
                    o: res.data.o,
                    q: res.data.q,
                    s: res.data.s,
                    v: res.data.v,
                })
            }
        })
    }, [])
    return (
        <>
        <div>
            <br />E: {btc.E}
            <br />Closed: {btc.c}
            <br />Name: {btc.e}
            <br />Highest: {btc.h}
            <br />Lowest: {btc.l}
            <br />Opened: {btc.o}
            <br />Q: {btc.q}
            <br />Name: {btc.s}
            <br />Volume: {btc.v}
        </div>
        <div>
            <br />E: {eth.E}
            <br />Closed: {eth.c}
            <br />Name: {eth.e}
            <br />Highest: {eth.h}
            <br />Lowest: {eth.l}
            <br />Opened: {eth.o}
            <br />Q: {eth.q}
            <br />Name: {eth.s}
            <br />Volume: {eth.v}
        </div>
        </>
    )
}
