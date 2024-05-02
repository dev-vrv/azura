import Link from "next/link";

interface LinkProps {
	icon: React.ReactNode;
	label: string;
	href: string;
};

interface AsideProps {
	links: LinkProps[];
    header?: {
        icon?: React.ReactNode;
        title?: string;
        subtitle?: string;
    }
    footer?: React.ReactNode;
}

export default function Aside(props: AsideProps) {
	return (
		<aside className="aside">
			<div className="aside--header">
                {props.header?.icon && props.header.icon}
                {props.header?.title && <h2 className="h2">{props.header.title}</h2>}
                {props.header?.subtitle && <p>{props.header.subtitle}</p>}
            </div>
			<div className="aside--body">
				<nav>
					<ul>
						{props.links.map((link: LinkProps, index: number) => (
							<li key={index}>
								<Link href={link.href}>
									<a>
										{link.icon}
										{link.label}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="aside--footer">{props.footer}</div>
		</aside>
	);
}
