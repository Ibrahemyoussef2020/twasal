import React, { lazy, Suspense } from 'react';

import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider , News , Sidebar} from '../components';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tawasal",
  description: "Egyption social media ",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <AuthProvider>
          <div className="flex justify-between max-w-[1200px] mx-auto px-3 py-2">
            <div className=' min-w-[100px] lg:min-w-[215px] min-h-[100%]'>
              <div className="fixed border-l border-b pl-2 h-screen">
                <Sidebar /> 
              </div>
            </div>
            <main className="flex-grow">
              {children}
            </main>
            <div className="hidden h-screen lg:flex flex-col border-r border-b  pr-1">
              <News />  
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
