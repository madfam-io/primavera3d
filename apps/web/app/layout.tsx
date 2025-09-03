import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Primavera3D - Advanced 3D Modeling & Digital Fabrication",
  description: "Transform your ideas into reality with cutting-edge 3D modeling, parametric design, and digital fabrication services",
  keywords: "3D modeling, parametric design, digital fabrication, CAD, CAM, 3D printing, CNC machining",
  authors: [{ name: "Primavera3D" }],
  openGraph: {
    title: "Primavera3D",
    description: "Advanced 3D Modeling & Digital Fabrication Services",
    url: "https://primavera3d.com",
    siteName: "Primavera3D",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Primavera3D",
    description: "Advanced 3D Modeling & Digital Fabrication Services",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans bg-blueprint-dark text-white min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}