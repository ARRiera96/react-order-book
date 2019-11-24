import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const BookSide = ({requests, reverseColumns}) => {
    let tableHeaders = ['Amount', 'Total', 'Price'];
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
                let total = i > 0 ? (+arr[i-1][1]) + currentVolume : currentVolume;
                let tableData = [currentVolume, total.toFixed(1), ask[0]];
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
            }) }
            </tbody>
        </Table>
    );
};

export default BookSide;
