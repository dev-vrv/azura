import { GetServerSideProps } from "next";
import { Metadata } from "next";
import { Row, Col, Container } from "react-bootstrap";


export default function PageAdmin() {
	return (
		<Container fluid className="h-100 p-0">
			<Row className="h-100 pe-3 pb-3">
				<Col xs={10}>
					<section className="section">content</section>
				</Col>
				<Col xs={2}>
					<section className="section">Filter</section>
				</Col>
			</Row>
		</Container>
	);
}
