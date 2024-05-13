import Icon from "@/components/icons/Icon";
import Link from "next/link";

interface PropsAside {
    Apps: {[key: string]: any};
}

export default function Aside({}: PropsAside) {
    return (
		<aside className="aside d-flex flex-column align-items-center gap-3 py-3 h-100">
			<h5 className="d-flex gap-1">
				<Icon name="at"/>
				<span>Azura</span>
			</h5>
			<nav className="d-flex flex-column h-100">
				<ul className="aside__menu">
					<li className="aside__item">
						<Link href="/admin" className="aside__link">
							<i className="aside__icon"></i>
							<span className="aside__text">Monitor</span>
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
}
