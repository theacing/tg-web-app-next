'use client'

import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Charton dev build</title>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body>
        <Header>
          {children}
        </Header>
      </body>
    </html>
  );
}
