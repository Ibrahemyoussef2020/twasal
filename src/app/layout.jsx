import React, { lazy, Suspense } from 'react';

import "./globals.css";

import { AuthProvider , News , Sidebar} from '../components';
import CommentModal from '@/components/comments/CommentModal';



export const metadata = {
  title: "Tawasal",
  description: "Egyption social media ",
};

export const dynamic = 'force-dynamice';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <AuthProvider>
          <CommentModal />
          <div className=" relative z-10 flex justify-between max-w-[1200px] mx-auto min-h-screen h-full">
            <Sidebar /> 
             
            <main className="flex-grow relative z-10 flex-1">
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
