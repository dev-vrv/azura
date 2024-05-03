import Section from '@/components/section/Section';

export default function PageAdmin() {
    return (
		<main className="main container-fluid">
			<div className="row h-100">
				<div className="col-9 h-100">
					<Section className="h-100">
						<h2>Monitor</h2>
					</Section>
				</div>
				<div className="col-3 h-100 d-flex flex-column gap-4">
					<Section className="h-fit">
						<h2>Admin Page</h2>
					</Section>
					<Section className="h-100">
						<h2>Admin Page</h2>
					</Section>
				</div>
			</div>
		</main>
	);
}