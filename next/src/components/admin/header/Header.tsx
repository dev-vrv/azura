import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

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
								<Button variant="primary">Alerts</Button>
							</li>
							<li>
								<Button variant="primary">Theme</Button>
							</li>
							<li>
								<Button variant="primary">Settings</Button>
							</li>
							<li>
								<Button variant="primary">Log Out</Button>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</header>
	);
}
