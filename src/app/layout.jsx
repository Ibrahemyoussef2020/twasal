import React, { lazy, Suspense } from 'react';

import "./globals.css";

import { AuthProvider , News , Sidebar} from '../components';
import CommentModal from '@/components/comments/CommentModal';



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
          <CommentModal />
          <div className=" relative z-10 flex justify-between max-w-[1200px] mx-auto min-h-screen h-full">
            <div className='hidden flex-1 sm:block min-w-[100px] md:min-w-[210px] min-h-[100%]'>
              <div className="fixed border-b h-screen max-w-[205px] bg-gray-300">
                <Sidebar /> 
              </div>
            </div>
            <main className="flex-grow relative z-10">
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
