import { Inter } from "next/font/google";
import "./globals.css";
import { News, Sidebar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tawasal",
  description: "Egyption social media ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={inter.className}>
        <div className=" flex justify-between max-w-[1200px] mx-auto p-3">
          <main> 
            {children}
          </main>

          <div className="">
           <News />
          </div>
        
          
          <div className="hidden sm:inline  border-r h-screen">
            <Sidebar />  
          </div>
        </div>
      </body>
    </html>
  );
}
