// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import KrakenClient from 'kraken-api';
const key          = ''; // API Key
const secret       = ''; // API Private Key
const kraken       = new KrakenClient(key, secret);

const OrderBook = () => {
    const [asks, setAsks] = useState([]);

    async function requestOrderBook() {
        let pair = 'XETHZUSD';
        const { result } = await kraken.api('Depth', { pair : pair });
        // const { asks, bids } = result[pair];
        const { asks } = result[pair];
        setAsks(asks || []);
        console.log( asks);
    }

    useEffect(() => {
        requestOrderBook();
    }, []);

    return (
        <div className="bg-dark">
            <h2 className="text-light">Table Placeholder</h2>
        </div>
    );
};

export default OrderBook;
