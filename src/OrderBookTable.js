import React from "react";
import Table from 'react-bootstrap/Table';

const OrderBookTable = ({requests, reverseColumns}) => {
    let tableHeaders = ['Amount', 'Total', 'Price'];
    let prevTotalVolume = 0;
    if(reverseColumns){
        tableHeaders.reverse();
    }
    return (
        <Table striped bordered variant="dark" size="sm">
            <thead>
            <tr>
                {
                    tableHeaders.map(header => (<th>{header}</th>))
                }
            </tr>
            </thead>
            <tbody>
            {requests.map((ask, i, arr) => {
                let currentVolume = +ask[1];
                let total = i > 0 ? prevTotalVolume + currentVolume : currentVolume;
                let tableData = [currentVolume, total.toFixed(3), ask[0]];
                prevTotalVolume += currentVolume;
                if(reverseColumns){
                    tableData.reverse();
                }

               return (<tr>
                   {
                       tableData.map((data)=> (
                         <td>{data}</td>
                       ))
                   }
                </tr>)
            }, prevTotalVolume) }
            </tbody>
        </Table>
    );
};

export default OrderBookTable;
