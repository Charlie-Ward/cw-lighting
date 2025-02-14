//layout.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CW Lighting",
  description: "CW Lighting Portfolio Showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-black dark:bg-gray-900">
          <Analytics />
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
