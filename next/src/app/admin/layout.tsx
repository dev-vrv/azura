import "@/assets/scss/style.scss";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/admin/header/Header";
import Aside from "@/components/admin/aside/Aside";


type Data = {
	[key: string]: any;
};
  
type IndexProps = {
	data: Data;
};

const AdminApps = async () => {
	const response = await fetch("http://127.0.0.1:8000/admin/api-root/");
	const data = await response.json();
	console.log(data);
}

export default function AdminLayout({
	children,
	
}: Readonly<{
	children: React.ReactNode;
}>) {
	const Apps = AdminApps();
	return (
		<html lang="en" data-bs-theme="dark">
			<body>
				<Container fluid>
					<Row>
						<Col xs={1}>
							<Aside Apps={Apps} />
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
