"use client";

import { useState, useEffect, useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Context } from "@/context/context";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import AppTable from "@/components/admin/table/Table";

export default function PageAdmin() {
	const { context } = useContext(Context);
	const pathname = usePathname();

	useEffect(() => {
		if (Object.keys(context).length > 0) {
			console.log(context);
		}
	}, [context]);

	const View = () => {
		if (Object.keys(context).length === 0) {
			return (
				<Col xs={12} className="h-100 d-flex justify-content-center align-items-center">
					<Spinner animation="border" variant="primary" />
				</Col>
			);
		} else {
			const appFound = Object.keys(context.apps).find((app) => pathname.includes(app));
			if (appFound) {
				return (
					<>
						<Col xs={12} className="d-flex justify-content-center align-items-center">
							<section className="section">
								<AppTable fields={context.apps[appFound]['fields_display']} title={appFound} endPoint="" />
							</section>
						</Col>
					</>
				);
			}
		}
	};

	return (
		<Container fluid className="h-100 p-0">
			<Row className="h-100 pe-3 pb-3">
				<View />
			</Row>
		</Container>
	);
}
