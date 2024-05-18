import { Row, Col, Container } from "react-bootstrap";
import AppTable from "@/components/admin/table/Table";

export default function PageAdminApp() {
	return (
		<Container fluid className="h-100 p-0">
			<Row className="h-100 pe-3 pb-3">
				<Col xs={12} className="d-flex justify-content-center align-items-center">
					<section className="section">
						Action
					</section>
				</Col>
			</Row>
		</Container>
	);
}
