import Section from '@/components/section/Section';

export default function AdminPageUsers() {
    return (
		<main className="main container-fluid">
			<div className="row h-100">
				<div className="col-9 h-100">
					<Section className="h-100">
						<h2>Users</h2>
					</Section>
				</div>
				<div className="col-3 h-100">
					<Section className="h-100">
						<h2>Users Filter</h2>
					</Section>
				</div>
			</div>
		</main>
	);
}