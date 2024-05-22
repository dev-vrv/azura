import { Spinner } from "react-bootstrap";


export default function PageHome() {
	return (
		<main className="main">
			<section className="section">
				<div className="h-100 w-100 d-flex justify-content-center align-items-center gap-2">
				<Spinner animation="grow" role="status">
				</Spinner>
				<h6>Loading...</h6>
				</div>
			</section>
		</main>
	);
}
