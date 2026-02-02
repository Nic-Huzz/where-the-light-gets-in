import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Where the Light Gets In",
  description: "Your companion for personal transformation. Discover your authentic self through guided exercises and create your personal Crowey Snax.",
  keywords: ["personal development", "Ben Crowe", "mindset", "performance", "wellbeing"],
  authors: [{ name: "Ben Crowe" }],
  openGraph: {
    title: "Where the Light Gets In",
    description: "Your companion for personal transformation",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#5FBDD6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-[#4EACE8]`}>
      <body className="antialiased min-h-screen bg-[#4EACE8]">
        {children}
      </body>
    </html>
  );
}
