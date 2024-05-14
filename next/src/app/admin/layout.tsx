'use client';

import "@/assets/scss/style.scss";
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
	return (
		<html lang="en" data-bs-theme="dark">
			<body>
				<ThemeProvider>
					<ContextProvider>
						<div className="d-flex w-100 h-100">
							<Aside />
							<div className="d-flex flex-column w-100 h-100">
								<Header />
								{children}
							</div>
						</div>
					</ContextProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
