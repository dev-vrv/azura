import "@/assets/scss/style.scss";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/admin/header/Header";
import Aside from "@/components/admin/aside/Aside";

export default function AdminLayout({
	children,
	
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-bs-theme="dark">
			<body>
				<Container fluid>
					<Row>
						<Col xs={1}>
							<Aside />
						</Col>
						<Col xs={11}>
							<Header />
							{children}
						</Col>
					</Row>
				</Container>
			</body>
		</html>
	);
}
