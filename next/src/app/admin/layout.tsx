import "@/assets/scss/style.scss";

import Header from "@/components/admin/header/Header";
import Aside from "@/components/admin/aside/Aside";
import ThemeProvider from "@/context/theme";
import ContextProvider from "@/context/context";


async function FetchApi() {
	const response = await fetch("http://127.0.0.1:8000/api/api-root/");
	try {
		const data = await response.json();
		console.log(data);
	}
	catch (error) {
		
	}
}

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const style = {
		'color-scheme': 'dark',
	  } as React.CSSProperties & { [key: string]: string };

	FetchApi();

	return (
		<html lang="en" data-bs-theme="dark"  style={style}>
			<body>
				<ThemeProvider>
					<ContextProvider>
						<div className="d-flex w-100 h-100">
							<Aside />
							<div className="d-flex flex-column w-100 vh-100">
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
