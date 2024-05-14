"use client";

import Icon from "@/components/icons/Icon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation'

interface FetchData {
    [key: string]: {
        [key: string]: any
    }
}

async function FetchApps(): Promise<FetchData> {
    const api = await fetch("http://127.0.0.1:8000/admin/api-root/").then(res => res.json());
    return api;
}

export default function AsideNav() {
    
    const [apps, setApps] = useState<FetchData>({});

    const pathname = usePathname()
    
    console.log(pathname);
    useEffect(() => {
        FetchApps().then(data => setApps(data));
    }, []);

    const AsideLink = ({icon, url}: {icon: string, url: string}) => {
        return (
            <Link href={url} className={`aside__link ${url == pathname? 'active' : ''}`}>
                <Icon name={icon} size="2" />
            </Link>
        )
    }

    return (
        <nav className="d-flex flex-column justify-content-center h-100">
            <ul className="aside__menu d-flex flex-column gap-2">
                <li className="aside__item">
                    <AsideLink icon="monitor" url="/admin" />
                </li>
                {Object.keys(apps).map((app, index) => {
                    const url = `/admin/${app}`;
                    return (
                        <li className="aside__item" key={index}>
                            <AsideLink icon={app} url={url} />
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}