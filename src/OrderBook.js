// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import KrakenClient from 'kraken-api';
import BookSide from "./BookSide";
const key          = ''; // API Key
const secret       = ''; // API Private Key
const kraken       = new KrakenClient(key, secret);

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
            <h2 className="text-light">Table Placeholder</h2>
            <BookSide requests={bids} reverseColumns={ true}/>
            <BookSide requests={asks}/>
        </div>
    );
};

export default OrderBook;

