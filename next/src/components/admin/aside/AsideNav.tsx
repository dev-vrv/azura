"use client";

import Icon from "@/components/icons/Icon";
import Link from "next/link";
import { useState, useEffect, useContext, useCallback } from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import { Context } from "@/context/context";

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

    const { context, setContext } = useContext(Context);

    const contextCallback = useCallback(() => {
        FetchApps().then(data => setApps(data));
        setContext({ ...apps });
    }, [apps, setContext]);
    // ERROR REQUESTS
    useEffect(() => {
        contextCallback()
    }, [contextCallback]);

    const AsideLink = ({icon, url}: {icon: string, url: string}) => {
        return (
            <Link href={url} className={`aside__link ${url == pathname? 'active' : ''}`}>
                <Icon name={icon} size="2" />
            </Link>
        )
    }

    return (
        <nav className="d-flex flex-column justify-content-center h-100">
            <ul className="aside__menu d-flex flex-column gap-3">
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