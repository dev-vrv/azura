"use client";

import React, { useEffect } from 'react';
import Spinner from '@/components/spinner/Spinner';
import './Table.scss';


interface ITableRow {
    [key: string]: any;
}

interface ITableProps {
    labels: React.ReactNode[];
    data?: ITableRow[];
}



function TableHeader({labels}: {labels: React.ReactNode[]}) {
    return (
        <tr>
            {labels.map((label, index) => (
                <th key={index}>{label}</th>
            ))}
        </tr>
    );

}

function TableRows({data}: {data: ITableRow[]}) {
    return (
        <>
            {data.map((row, index) => (
                <tr key={index}>
                    {Object.values(row).map((value, index) => (
                        <td key={index}>{value}</td>
                    ))}
                </tr>
            ))}
        </>
    );

}



function Table({labels, data}: ITableProps) {
    return (
        <table className='table'>
            <thead>
                <TableHeader labels={labels} />
            </thead>
            <tbody>

            </tbody>
        </table>
    )
};

export default Table;