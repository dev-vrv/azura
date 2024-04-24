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
import useSocket from '@/hooks/socket';


type PropsComponents = {
    [key: string]: React.FC;
}


export default function Dashboard() {
    const [activeSection, setActiveSection] = useState('monitor');
    const components: PropsComponents = {
        monitor: Monitor,
        stats: Stats,
        users: Users,
        mail: Mail,
        celery: Celery,
        chat: Chat,
    };

    const CurrentComponent = components[activeSection];

    const socket = useSocket('http://127.0.0.1:8000');
    React.useEffect(() => {
        if (socket == null) return;

        socket.on('message', (message) => {
            console.log('Получено сообщение от сервера:', message);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);
    React.useEffect(() => {
        AOS.init();
    }, []);


    return (
        <div className='dashboard'
            style={{
                backgroundImage: `url(https://w.forfun.com/fetch/87/8716d1a0243fff0827bd0d66a0a8c066.jpeg)`,
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
