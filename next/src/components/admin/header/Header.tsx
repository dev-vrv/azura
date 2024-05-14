import { Container, Row, Col, Button } from "react-bootstrap";
import Icon from "@/components/icons/Icon";
import ThemeButton from "@/components/admin/header/ThemeButton";

export default function Header() {
	return (
		<header className="header w-100 p-3">
			<Container fluid>
				<Row>
					<Col xs={2}>
						<h3 className="h3">Azura</h3>
					</Col>
					<Col xs={{span: 6, offset: 4}}>
						<ul className="d-flex justify-content-end gap-3">
							<li>
								<Button variant="icon">
									<Icon name="bell" size="3" />
								</Button>
							</li>
							<li>
								<ThemeButton />
							</li>
							<li>
								<Button variant="icon">
									<Icon name="settings" size="3" />
								</Button>
							</li>
							<li>
								<Button variant="icon">
									<Icon name="logout" size="3" />
								</Button>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</header>
	);
}
