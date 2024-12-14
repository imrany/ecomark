import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "@/components/GlobalContext";

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
  title: "Villebiz",
  description: "Get goods and services at affordable prices.",
  keywords:["villebiz","Villebiz","Market","Ecommerce", "Products", "Seller","Buyer","Sell","Buy"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>  
        <meta name="apple-mobile-web-app-title" content="villebiz" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased sm:p-4 p-2`}
      >
        <GlobalProvider>
          <main>{children}</main>
          <Toaster />
        </GlobalProvider>
      </body>
    </html>
  );
}
