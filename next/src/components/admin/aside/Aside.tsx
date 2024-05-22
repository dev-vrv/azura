"use client";

import Icon from "@/components/icons/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { Context } from "@/context/context";
import './Aside.scss';

function AsideNav({appsKeys}: {appsKeys: string[]}) {
	const pathname = usePathname();

	const Li = ({ app, icon }: { app: string, icon: string }) => {
		const app_url = `/admin/${app}`;
		let active = false;
        if (app === "") {
            active = pathname === "/admin";
        }
        else {
            active = pathname.includes(app);
        }
		return (
			<li className="aside__item">
				<Link href={app_url} className={`aside__link ${active ? "active" : ""}`}>
					<Icon name={icon} size={2} />
				</Link>
			</li>
		);
	};
	return (
		<nav className="d-flex flex-column justify-content-center h-100">
			<ul className="aside__menu d-flex flex-column gap-3">
				<Li app={""} icon={'monitor'} />
				{appsKeys.map((app, i) => (
					<Li key={i} app={app} icon={app} />
				))}
			</ul>
		</nav>
	);
}

export default function Aside({apps}: {apps: { [key: string]: any }}) {

	const { context, setContext } = useContext(Context);

	useEffect(() => {
		setContext((prev) => ({ ...prev, apps }));
	}, [setContext, apps]);

    return (
		<aside className="aside d-flex flex-column align-items-center justify-content-between h-100 py-3">
			<h5 className="d-flex">
				<Icon name="logo" size={1}/>
			</h5>
			<AsideNav appsKeys={Object.keys(apps)} />
			<div className="aside__footer"></div>
		</aside>
	);
}

