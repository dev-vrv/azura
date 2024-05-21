"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { Context } from "@/context/context";

import Icon from "@/components/icons/Icon";
import Link from "next/link";

interface Apps {
	[key: string]: any;
}

async function FetchApps(): Promise<Apps> {
	const res = await fetch("http://127.0.0.1:8000/admin/api-root/");
	const data = await res.json();
	return data;
}

export default function AsideNav() {
	const pathname = usePathname();
	const [apps, setApps] = useState<Apps>({});
	const { setContext } = useContext(Context);

	useEffect(() => {
		FetchApps().then((data) => {
			setApps(data);
			setContext((prev) => ({ ...prev, apps: data }));
		});
	}, [setContext]);

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

	const List = () => {
		if (Object.keys(apps).length > 0) {
			return (
				<ul className="aside__menu d-flex flex-column gap-3">
					<Li app={""} icon={'monitor'} />
					{Object.keys(apps).map((app, i) => (
						<Li key={i} app={app} icon={app} />
					))}
				</ul>
			);
		}
	};

	return (
		<nav className="d-flex flex-column justify-content-center h-100">
			<List />
		</nav>
	);
}
