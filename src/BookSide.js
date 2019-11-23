import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Button';

const BookSide = ({asks}) => {
    console.log(asks);
    return (
        <Table striped bordered variant="dark">
            <thead>
            <tr>
                <th>Amount</th>
                <th>Total</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {asks.map((ask, i, arr) => {
                let total = i > 0 ? +(arr[i-1][1]) + +(ask[1]) : +ask[1];

               return (<tr>
                    <td>{ask[1]}</td>
                    <td>{total.toFixed(1)}</td>
                    <td>{ask[0]}</td>
                </tr>)
            }) }
            </tbody>
        </Table>
    );
};

export default BookSide;
