import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-client-provider";
import Navbar from "@/components/navbar/navbar";
import Clerk from "@/components/providers/clerk-provider";

const maven = PT_Serif({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Clerk>
      <html lang="en">
        <body
          className={`${maven.className}  flex flex-col w-full h-full bg-gradient-to-b from-black from-70% to-red-950 to-100% text-white`}
        >
          <QueryProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
          </QueryProvider>
        </body>
      </html>
    </Clerk>
  );
}
