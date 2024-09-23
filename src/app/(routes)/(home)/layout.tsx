import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/query-client-provider";
import Navbar from "@/components/navbar/navbar";
import Clerk from "@/components/providers/clerk-provider";
import Footer from "@/components/footer/footer";

const maven = PT_Serif({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL("https://myanimenews.com"),
  keywords: ["Anime News", "Anime", "Manga", "Anime Reviews"],
  title: {
    default: "MyAnimeNews",
    template: "%s | MyAnimeNews",
  },
  openGraph: {
    description:
      "MyAnimeNews is a platform for anime and manga news and reviews.",
    images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Clerk>
      <html lang="en">
        <body className={`${maven.className}`}>
          <QueryProvider>
            <div className="flex flex-col w-full min-h-screen  bg-gradient-to-b from-black from-50% to-red-950 to-100% text-white">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </body>
      </html>
    </Clerk>
  );
}
