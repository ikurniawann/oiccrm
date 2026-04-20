import type { Metadata } from "next";
import { Marcellus, Manrope } from "next/font/google";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Odilia Infinity Wellness - CRM",
  description: "Membership CRM for Spa, Wellness & Gym",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${manrope.variable}`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
