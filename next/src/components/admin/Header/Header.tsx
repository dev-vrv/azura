import Icon from "@/components/Icons/Icons";
import "./Header.scss";

export default function Header({ className }: { className?: string }) {
	return (
		<header className={`header ${className && className}`}>
			<h3 className="h3">
				Next Admin
			</h3>
			<ul className="d-flex gap-3">
				<li>
					<button type="button" className="btn btn-header">
						<Icon {...{ name: "alert", size: "lg" }} />
					</button>
				</li>
				<li>
					<button type="button" className="btn btn-header">
						<Icon {...{ name: "bell", size: "lg" }} />
					</button>
				</li>
				<li>
					<button type="button" className="btn btn-header">
						<Icon {...{ name: "dark", size: "lg" }} />
					</button>
				</li>
				<li>
					<button type="button" className="btn btn-header">
						<Icon {...{ name: "settings", size: "lg" }} />
					</button>
				</li>
				<li>
					<button type="button" className="btn btn-header">
						<Icon {...{ name: "logout", size: "lg" }} />
					</button>
				</li>
			</ul>
		</header>
	);
}
