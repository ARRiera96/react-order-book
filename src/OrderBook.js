// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import KrakenClient from 'kraken-api';
import OrderBookTable from "./OrderBookTable";
import PairSelector from "./PairSelector";
import {Container, Row, Col} from 'react-bootstrap';
const kraken       = new KrakenClient('', '');

const OrderBook = () => {
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);
    const [assetPair, setAssetPair] = useState('XETHZUSD');
    const [assetPairs, setAssetPairs] = useState([]);

    async function requestOrderBook() {
        const { result } = await kraken.api('Depth', { pair : assetPair , count: 20});
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
            let {base, quote, wsname} = result[assetPair];
            let keys = Object.keys(assetPairs);
            let pairKey = keys.includes(base) ? base : (keys.includes(quote) ? quote: '');
            if(pairKey && !assetPair.endsWith('.d')){
                assetPairs[pairKey].push({assetPair, wsname});
            }
        });
        setAssetPairs(assetPairs);
    }

    useEffect(() => {
        requestAssetPairs();
    }, []);

    useEffect(() => {
        requestOrderBook();
    }, [assetPair]);

    return (
        <div className="bg-dark pt-4">
            <Container>
                <Row className="pb-2 ml-1">
                    <h3 className="text-light">Order Book</h3>
                </Row>
                <Row className="pb-3 ml-1">
                    <PairSelector pairsByGroupAbrv={assetPairs} defaultAssetPair={assetPair} setAssetPair={setAssetPair} />
                </Row>
                <Row>
                    <Col>
                        <h4 className="text-light">Bids</h4>
                        <OrderBookTable requests={bids} reverseColumns={ true}/>
                    </Col>
                    <Col>
                        <h4 className="text-light">Asks</h4>
                        <OrderBookTable requests={asks}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OrderBook;

