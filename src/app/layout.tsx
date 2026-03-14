import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AZenthera AI | Enterprise AI & Data Solutions",
    template: "%s | AZenthera AI",
  },
  description:
    "AZenthera AI builds production-grade AI systems — from intelligent agents and computer vision to scalable data pipelines and executive dashboards. Remote-first team, world-class engineering.",
  keywords: [
    "AI development",
    "AI agents",
    "computer vision",
    "machine learning",
    "data engineering",
    "data analytics",
    "generative AI",
    "IoT development",
    "edge AI",
  ],
  openGraph: {
    title: "AZenthera AI | Enterprise AI & Data Solutions",
    description:
      "AZenthera AI builds production-grade AI systems — from intelligent agents and computer vision to scalable data pipelines and executive dashboards.",
    type: "website",
    locale: "en_US",
    siteName: "AZenthera AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AZenthera AI | Enterprise AI & Data Solutions",
    description:
      "AZenthera AI builds production-grade AI systems — from intelligent agents and computer vision to scalable data pipelines and executive dashboards.",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.className=t}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
