import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecentlyWatched from "@/components/RecentlyWatched";
import Watchlist from "@/components/Watchlist";
import Navbar from "@/components/Navbar";
import UserActivity from "./dashboard/UserActivity";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRYPTOKNIGHT",
  description: "Your own Crypto Dashboard",
  icons: {
    icon: "/icons/light-logo.svg",
  },
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
            <UserActivity />
          </div>
        </div>
      </body>
    </html>
  );
}
