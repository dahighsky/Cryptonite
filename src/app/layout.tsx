import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecentlyWatched from "@/components/RecentlyWatched";
import Watchlist from "@/components/Watchlist";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body>
        <div className="w-full">
          <Navbar />
          <div className="lg:flex items-start md:gap-10 min-h-screen px-2 sm:px-6 md:px-16">
            <div className="w-full lg:w-3/5 xl:w-2/3 overflow-auto py-4">
              <main>{children}</main>
            </div>
            <div className="w-full lg:w-2/5 xl:w-1/3 min-w-80 bg-gray-100 py-4 md:sticky relative top-20 overflow-auto z-10">
              <div className="mb-6">
                <RecentlyWatched />
              </div>
              <div>
                <Watchlist />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
