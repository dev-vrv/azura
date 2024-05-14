'use client';

import { Row, Col, Container } from "react-bootstrap";
import AppTable from "@/components/admin/table/Table";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation'

function getAppName(pathname: string): string {
	return pathname.split("/")[2];
}

export default function PageAdmin() {

	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [app, setApp] = useState<string>("");

	useEffect(() => {
		setApp(getAppName(pathname));
	}, [pathname]);

	console.log(pathname, searchParams);
	return (
		<Container fluid className="h-100 p-0">
			<Row className="h-100 pe-3 pb-3">
				<Col xs={10}>
					<section className="section">
						<AppTable 
							endPoint="app" 
							title={app} 
							selectable={true} 
							fields={["name", "description", "created_at", "updated_at"]}
						/>
					</section>
				</Col>
				<Col xs={2}>
					<section className="section">Filter</section>
				</Col>
			</Row>
		</Container>
	);
}
