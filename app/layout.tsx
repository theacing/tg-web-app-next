'use client'

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TON connect</title>
      </head>
      <body>
        <TonConnectUIProvider manifestUrl="https://cyan-fantastic-meadowlark-80.mypinata.cloud/ipfs/QmNWpHUjVfu4zw8XYqNsF8oVGqQcQdBH74G1BHBTr8FzLf">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
