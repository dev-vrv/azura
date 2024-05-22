"use client";

import "@/assets/scss/style.scss";
import { useState, useEffect, useContext, useCallback } from "react";
import { Spinner } from "react-bootstrap";;
import { Context } from "@/context/context";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/admin/header/Header";
import Aside from "@/components/admin/aside/Aside";
import ThemeProvider from "@/context/theme";
import ContextProvider from "@/context/context";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [loading, setLoading] = useState(false);
	const [apps, setApps] = useState({});
	const [error, setError] = useState(false);
	const { context, setContext } = useContext(Context);

	const FetchAdmin = useCallback(async () => {
		setLoading(true);
		const response = await fetch("http://127.0.0.1:8000/admin/api-root/")
			.then((response) => response.json())
			.then((data) => {
				setApps(data);
				setContext((prev) => ({
					...prev,
					apps: data,
				}));
			})
			.catch((error) => {
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [setContext]);

	useEffect(() => {
		FetchAdmin();
	}, [FetchAdmin]);

	useEffect(() => {
		console.log(context);
	}, [context]);


	return (
		<ThemeProvider>
			<ContextProvider>
				<Container fluid className="h-100">
					{loading && (
						<div className="d-flex justify-content-center align-items-center w-100 h-100">
							<div className="d-flex align-items-center gap-2">
								<Spinner animation="grow" variant="primary" />
								<h5>Loading...</h5>
							</div>
						</div>
					)}
					{Object.keys(apps).length > 0 && (
						<Row className="h-100">
							<Col xs={1}>
								<Aside appsKeys={Object.keys(apps)} />
							</Col>
							<Col xs={11}>
								<Header />
								{children}
							</Col>
						</Row>
					)}
					{error && (
						<Row className="h-100 d-flex align-items-center justify-content-center">
							<Col sm={4}>
								<h4 className="text-center">505 | Server error</h4>
							</Col>
						</Row>
					)}
				</Container>
			</ContextProvider>
		</ThemeProvider>
	);
}

