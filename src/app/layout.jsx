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
        <div className=" flex justify-between max-w-[1000px] mx-auto p-2">
          <News />
          <main>
            {children}
          </main>
          <Sidebar />
        </div>
      </body>
    </html>
  );
}
