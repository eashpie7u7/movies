import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Patrick_Hand } from "next/font/google";

const patrick = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
});
export const metadata: Metadata = {
  title: "Movies App",
  description: "Movies App for React course",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}>
          <Header></Header>
        {children}
      </body>
    </html>
  );
}
