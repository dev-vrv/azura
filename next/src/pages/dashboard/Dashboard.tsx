import React from 'react';
import Aside from './widgets/Aside';
import Page from './widgets/Page';
import Header from './widgets/Header';
import './Dashboard.scss';


export default function Dashboard() {
    return (
        <div className='dashboard'>
            <Aside />
            <div className="content">
                <Header />
                <Page />
            </div>
        </div>
    )
}