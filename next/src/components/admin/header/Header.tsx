import { Container, Row, Col, Button } from "react-bootstrap";
import Icon from "@/components/icons/Icon";
import ThemeButton from "@/components/admin/header/ThemeButton";

export default function Header() {
	return (
		<header className="header w-100 p-3">
			<Container fluid className="d-flex justify-content-between align-items-center">
				<h3 className="h3">Azura</h3>
				<ul className="d-flex justify-content-end gap-2">
					<li>
						<Button variant="icon">
							<Icon name="bell" size="2" />
						</Button>
					</li>
					<li>
						<ThemeButton />
					</li>
					<li>
						<Button variant="icon">
							<Icon name="settings" size="2" />
						</Button>
					</li>
					<li>
						<Button variant="icon">
							<Icon name="logout" size="2" />
						</Button>
					</li>
				</ul>
			</Container>
		</header>
	);
}
