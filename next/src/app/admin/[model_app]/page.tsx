import { Row, Col, Container } from "react-bootstrap";
import AppTable from "@/components/admin/table/Table";

export default function PageAdminApp() {
	return (
		<Container fluid className="page-container h-100 p-3">
			<section className="section">
				<AppTable />
			</section>
		</Container>
	);
}
