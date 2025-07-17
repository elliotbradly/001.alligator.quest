import type { Metadata } from "next";

import Providers from "../lib/query-provider";
import "./globals.css";


export const metadata: Metadata = {
  title: "Next App Mantine Tailwind Template",
  description: "Next App Mantine Tailwind Template",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
          </header>
          {children}
        </Providers>
      </body>
    </html>

  );
}
