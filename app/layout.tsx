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
        <TonConnectUIProvider manifestUrl="">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
