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
    <html lang="en"
    >
      <body 
          className={inter.className}
          style={{ 
            backgroundImage: "url('https://wallpapertag.com/wallpaper/full/2/3/a/191147-vertical-black-gradient-background-1920x1080-photos.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
      >{children}</body>
    </html>
  );
}
