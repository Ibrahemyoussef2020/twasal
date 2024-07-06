import React, { lazy, Suspense } from 'react';

import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider , News , Sidebar} from '../components';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tawasal",
  description: "Egyption social media ",
};


//const LazyNews = lazy(() => import('../components/News'));


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add any additional <head> elements here */}
      </head>
      <body>
        <AuthProvider>
          <div className="flex justify-between max-w-[1200px] mx-auto px-3 py-2">
            <div className="hidden sm:inline border-l pl-2 h-screen">
              <Sidebar /> {/* Server component */}
            </div>
            <main className="flex-grow">
              {children}
            </main>
            <div className="flex h-screen lg:flex flex-col border-r pr-1">
              <News /> 
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
