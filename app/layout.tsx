import type { Metadata } from "next";
import { Bricolage_Grotesque as FontSans } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Icon Picker",
  description: "Icon Picker",
};

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
