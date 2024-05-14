"use client";

import Icon from "@/components/icons/Icon";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IBundle } from "@/components/icons/Icon";

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
    
    useEffect(() => {
        FetchApps().then(data => setApps(data));
    }, []);

    return (
        <nav className="d-flex flex-column h-100">
            <ul className="aside__menu">
                <li className="aside__item">
                    <Link href="/admin" className="aside__link">
                        <Icon name={'monitor'} size="2" />
                    </Link>
                </li>
                {Object.keys(apps).map((app, index) => {
                    const url = `/admin/${app}`;
                    return (
                        <li className="aside__item" key={index}>
                            <Link href={url} className="aside__link">
                                <Icon name={app} size="2" />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}