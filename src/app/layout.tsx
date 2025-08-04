import type { Metadata } from "next";

import Providers from "../lib/query-provider";
import "./globals.css";

import { initEarth } from '../../base/000.earth'
import { initTime } from '../../base/001.time'
import { initSpace } from '../../base/002.space'
import { initSower } from '../../base/010.sower'

export const metadata: Metadata = {
  title: "Next App Mantine Tailwind Template",
  description: "Next App Mantine Tailwind Template",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  var init = async ()=>{
    global.EARTH = await initEarth(1)
    global.TIME = await initTime(1)
    global.SPACE = await initSpace(1)
    global.SOWER = await initSower(1)
  }

  
  init()
 
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
