import type { Metadata } from "next";
import localFont from "next/font/local";
import {ClerkProvider} from '@clerk/nextjs'
import "./globals.css";
import RootProviders from "@/components/providers/RootProviders";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "AlexanderC3 finance webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="en" className="dark" style={{
        colorScheme: "dark",
      }}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Toaster richColors position="bottom-right"/>
          <RootProviders>{children}</RootProviders>
        </body>
      </html>
    </ClerkProvider>
  )
}
