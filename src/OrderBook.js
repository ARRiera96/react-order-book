// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import KrakenClient from 'kraken-api';
import OrderBookTable from "./OrderBookTable";
import {Container, Row, Col} from 'react-bootstrap';
const kraken       = new KrakenClient('', '');

const OrderBook = () => {
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);

    async function requestOrderBook() {
        let pair = 'XETHZUSD';
        const { result } = await kraken.api('Depth', { pair : pair , count: 25});
        // const { asks, bids } = result[pair];
        const { asks, bids } = result[pair];
        const sortFunction = (a,b) => {
            return b[0] - a[0];
        };
        asks.sort(sortFunction);
        bids.sort(sortFunction);
        setAsks(asks || []);
        setBids(bids || []);
    }

    useEffect(() => {
        requestOrderBook();
    }, []);

    return (
        <div className="bg-dark">
            <h2 className="text-light">Order Book (ETH/USD)</h2>
            <Container>
                <Row>
                    <Col>
                        <OrderBookTable requests={bids} reverseColumns={ true}/>
                    </Col>
                    <Col>
                        <OrderBookTable requests={asks}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderBook;

