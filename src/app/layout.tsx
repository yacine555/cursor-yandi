import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yandi - AI API Management",
  description: "Manage and monitor your AI API keys and usage across multiple providers. Track costs, set budgets, and optimize your AI infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-20">
              <Toaster position="top-center" />
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
