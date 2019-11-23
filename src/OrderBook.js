// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import KrakenClient from 'kraken-api';
import BookSide from "./BookSide";
const key          = ''; // API Key
const secret       = ''; // API Private Key
const kraken       = new KrakenClient(key, secret);

const OrderBook = () => {
    const [asks, setAsks] = useState([]);

    async function requestOrderBook() {
        let pair = 'XETHZUSD';
        const { result } = await kraken.api('Depth', { pair : pair , count: 25});
        // const { asks, bids } = result[pair];
        const { asks } = result[pair];
        asks.sort((a,b) => {
            return b[0] - a[0];
        });
        setAsks(asks || []);
        console.log( asks);
    }

    useEffect(() => {
        requestOrderBook();
    }, []);

    return (
        <div className="bg-dark">
            <h2 className="text-light">Table Placeholder</h2>
            <BookSide asks={asks}/>
        </div>
    );
};

export default OrderBook;

