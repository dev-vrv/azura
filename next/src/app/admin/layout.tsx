"use client";

import "@/assets/scss/style.scss";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/admin/header/Header";
import Aside from "@/components/admin/aside/Aside";
import ThemeProvider from "@/context/theme";
import ContextProvider, { Context } from "@/context/context";
import { IContext } from "@/context/context";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [loading, setLoading] = useState(false);
	const [api, setApi] = useState<IContext>({} as IContext);
	const [error, setError] = useState(false);

	const FetchAdmin = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(`http://127.0.0.1:8000/admin/api-root/`);
			const data = await res.json();
			setApi(data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		FetchAdmin();
	}, [FetchAdmin]);

	const LoadingView = () => {
		return (
			<div className="d-flex justify-content-center align-items-center w-100 h-100">
				<div className="d-flex align-items-center gap-2">
					<Spinner animation="grow" variant="primary" />
				</div>
			</div>
		);
	};

	const ErrorView = () => {
		return (
			<Row className="h-100 d-flex align-items-center justify-content-center">
				<Col sm={4}>
					<h4 className="text-center">505 | Server error</h4>
				</Col>
			</Row>
		);
	};

	const ContentView = () => {
		return (
			<Row className="h-100">
				<Col xs={1} className="h-100">
					<Aside api={api} />
				</Col>
				<Col xs={11} className="h-100">
					<Header />
					{/* {children} */}
				</Col>
			</Row>
		);
	};

	return (
		<ThemeProvider>
			<ContextProvider>
				<Container fluid className="h-100">
					{loading && <LoadingView />}
					{error && <ErrorView />}
					{!loading && !error && api && <ContentView />}
				</Container>
			</ContextProvider>
		</ThemeProvider>
	);
}
