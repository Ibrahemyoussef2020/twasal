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
          <div className="flex justify-between max-w-[1200px] mx-auto">
            <div className='hidden sm:block min-w-[100px] md:min-w-[215px] min-h-[100%]'>
              <div className="fixed border-l border-b h-screen">
                <Sidebar /> 
              </div>
            </div>
            <main className="flex-grow lg:px-2">
              {children}
            </main>
            <div className="hidden h-screen lg:flex flex-col">
              <News />  
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
