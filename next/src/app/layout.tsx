import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/scss/style.scss';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Azura",
  description: "Azura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
