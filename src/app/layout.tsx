import type { Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Geist, Geist_Mono } from "next/font/google";
import { CONFIG } from "@/constants/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.site),
  title: {
    default: CONFIG.title,
    template: "%s | geuni",
  },
  description: CONFIG.description,
  alternates: {
    canonical: "/",
  },
  verification: {
    google: CONFIG.verification.google,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="main">{children}</main>
        <GoogleAnalytics gaId={CONFIG.gtag} />
      </body>
    </html>
  );
}
