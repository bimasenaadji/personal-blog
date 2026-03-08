import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog CMS - Console",
  description: "Professional blog content management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950`}
      >
        <NextTopLoader
          color=" #2F4F4F"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} // Matikan spinner bundar di pojok kanan atas biar lebih clean
          easing="ease"
          speed={200}
        />
        <Toaster position="top-center" reverseOrder={false} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
