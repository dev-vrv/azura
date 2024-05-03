import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/scss/style.scss';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
};

export default function AdminAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body>
				<main className="main d-flex flex-column justify-content-center">
					{children}
				</main>
			</body>
		</html>
  );
}
