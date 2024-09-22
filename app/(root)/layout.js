import { Inter } from "next/font/google";
import "../globals.css";
import Provider from "@components/Provider";
import TopBar from "@components/TopBar";
import BottomBar from "@components/BottomBar";
import ChatBot from '@components/ChatBot';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Chat App",
  description: "A Next.js 14 Chat App ",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-full-dark`}>
        <Provider>
          
          <TopBar />
          {children}
          <ChatBot/>
          <BottomBar />
        </Provider>
      </body>
    </html>
  );
}
