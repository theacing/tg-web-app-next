'use client'

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";
import { Inter } from 'next/font/google';
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TON connect</title>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <TonConnectUIProvider manifestUrl="https://cyan-fantastic-meadowlark-80.mypinata.cloud/ipfs/QmNWpHUjVfu4zw8XYqNsF8oVGqQcQdBH74G1BHBTr8FzLf">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
