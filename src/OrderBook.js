// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import KrakenClient from 'kraken-api';
import OrderBookTable from "./OrderBookTable";
import {Container, Row, Col} from 'react-bootstrap';
const kraken       = new KrakenClient('', '');

const OrderBook = () => {
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);
    const [assetPair, setAssetPair] = useState('XETHZUSD');

    async function requestOrderBook() {
        const { result } = await kraken.api('Depth', { pair : assetPair , count: 25});
        const { asks, bids } = result[assetPair];
        const sortFunction = (a,b) => {
            return b[0] - a[0];
        };
        asks.sort(sortFunction);
        bids.sort(sortFunction);
        setAsks(asks || []);
        setBids(bids || []);
    }

    async function requestAssetPairs() {
        const { result } = await kraken.api('AssetPairs');
        const assetPairs = {
            'XXBT': [],
            'XETH': []
        };
        Object.keys(result).forEach((assetPair) => {
            let base = result[assetPair].base;
            console.log(base);
            if(Object.keys(assetPairs).includes(base)){
                assetPairs[base].push(assetPair);
            }
        });
        console.log(assetPairs);
    }

    useEffect(() => {
        requestOrderBook();
        requestAssetPairs();
    }, []);

    return (
        <div className="bg-dark">
            <Container>
                <Row >
                    <h3 className="text-light">Order Book (ETH/USD)</h3>
                </Row>
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

