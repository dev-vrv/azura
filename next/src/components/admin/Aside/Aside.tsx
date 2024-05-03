import './Aside.scss';
import Link from "next/link";
import Icon from "@/components/Icons/Icons";
import { PropsIcon } from "@/components/Icons/Icons";
import { usePathname } from 'next/navigation'

interface LinkProps {
	href: string;
	label?: string;
	icon?: PropsIcon;
};
interface AsideProps {
	links: LinkProps[];
}

export default function Aside(props: AsideProps) {
	const pathname = usePathname()
	return (
		<aside className="aside">
			<div className="aside--header" data-aos="zoom-in">
				<Icon {...{ name: "logo", size: "xxl", color: "primary" }} />
            </div>
			<div className="aside--body">
				<nav>
					<ul className="d-flex flex-column align-content-center justify-content-center gap-4">
						{props.links.map((link: LinkProps, index: number) => (
							<li key={index} data-aos="zoom-in" data-aos-delay={`${300 + (index * 100)}`}>
								<Link href={link.href} className={`btn btn-aside ${pathname === link.href? 'active' : ''}`}>
									{link.icon && <Icon {...link.icon} />}
									{link.label && link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="aside--footer">
				<button className="btn" data-aos="zoom-in">
					<Icon {...{ name: "info", size: "lg" }} />
				</button>
			</div>
		</aside>
	);
}
