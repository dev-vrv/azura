"use client";

import './page.scss';
import 'aos/dist/aos.css';
import AOS from 'aos';  
import React, { useState } from 'react';
import Monitor from './content/monitor/Monitor';
import Stats from './content/stats/Stats';
import Users from './content/users/Users';
import Mail from './content/mail/Mail';
import Celery from './content/celery/Celery';
import Chat from './content/chat/Chat';
import Aside from './aside/Aside';
import Header from './header/Header';


type PropsComponents = {
    [key: string]: React.FC;
}


export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('users');
    const components: PropsComponents = {
        monitor: Monitor,
        stats: Stats,
        users: Users,
        mail: Mail,
        celery: Celery,
        chat: Chat,
    };

    const CurrentComponent = components[activeSection];


    React.useEffect(() => {
        AOS.init();
    }, []);


    return (
        <div className='dashboard'
            style={{
                backgroundImage: `url(https://www.hfbsinfo.com/infohub/wp-content/uploads/2018/09/background.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Header />
            <Aside activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className='main'>
                {CurrentComponent ? <CurrentComponent /> : null}
            </main>
        </div>
    );
}
