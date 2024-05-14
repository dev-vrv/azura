import "@/assets/scss/style.scss";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/admin/header/Header";
import Aside from "@/components/admin/aside/Aside";
import ThemeProvider from "@/context/theme";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-bs-theme="dark">
			<body>
				<ThemeProvider>
					<Container fluid className="h-100">
						<Row className="h-100">
							<Col xs={1} className="h-100 p-0">
								<Aside />
							</Col>
							<Col xs={11} className="h-100 p-0 d-flex flex-column justify-content-between">
								<Header />
								{children}
							</Col>
						</Row>
					</Container>
				</ThemeProvider>
			</body>
		</html>
	);
}
