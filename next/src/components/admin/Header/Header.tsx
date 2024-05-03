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
					<button type="button" className="btn btn-header" data-aos="zoom-in" data-aos-delay="500">
						<Icon {...{ name: "alert", size: "lg" }} />
					</button>
				</li>
				<li>
					<button type="button" className="btn btn-header" data-aos="zoom-in" data-aos-delay="400">
						<Icon {...{ name: "bell", size: "lg" }} />
					</button>
				</li>
				<li>
					<button type="button" className="btn btn-header" data-aos="zoom-in" data-aos-delay="300">
						<Icon {...{ name: "dark", size: "lg" }} />
					</button>
				</li>
				<li>
					<button type="button" className="btn btn-header" data-aos="zoom-in" data-aos-delay="200">
						<Icon {...{ name: "settings", size: "lg" }} />
					</button>
				</li>
				<li>
					<button type="button" className="btn btn-header" data-aos="zoom-in" data-aos-delay="100">
						<Icon {...{ name: "logout", size: "lg" }} />
					</button>
				</li>
			</ul>
		</header>
	);
}
