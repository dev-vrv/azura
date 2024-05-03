'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ActiveLinkProps {
    href: string;
    activeClassName: string;
    children: React.ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href, activeClassName }) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter();
    const isActive = isClient ? router.asPath === href : false;

    return (
        <Link href={href}>
            <a className={isActive ? activeClassName : ''}>
                {children}
            </a>
        </Link>
    );
};

export default ActiveLink;
