import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hectos Capital | Home",
  description: "Transform your operations with cutting-edge data analytics and AI solutions.",
  icons: {
    icon: '/Logos/X bleu.svg',
    apple: '/Logos/X bleu.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
